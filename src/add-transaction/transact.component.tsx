import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { PageHeader } from "../page-header.component/PageHeader";
import { CapturedImage, ImageList } from "../image-list.component/ImageList";

interface CustomerDetails {
    fullName: string;
    phoneNumber: string;
    livePhoto?: string;
    customerIdPhoto?: string;
    amount: string;
    bankName: string;
    transactionId: string;
    transSlipPhoto?: string;
    charges: string;
}

const bankOptions = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Kotak Mahindra Bank",
    "IndusInd Bank",
    "Yes Bank",
    "Canara Bank",
];

const maxCapturedImages = 3;
const perceptualHashSize = 16;
const similarImageDistanceLimit = 24;

const createPerceptualHash = (imageData: ImageData) => {
    const grayscalePixels: number[] = [];
    let totalBrightness = 0;

    for (let row = 0; row < perceptualHashSize; row += 1) {
        for (let column = 0; column < perceptualHashSize; column += 1) {
            const sourceX = Math.floor((column * imageData.width) / perceptualHashSize);
            const sourceY = Math.floor((row * imageData.height) / perceptualHashSize);
            const pixelIndex = (sourceY * imageData.width + sourceX) * 4;
            const brightness =
                imageData.data[pixelIndex] * 0.299 +
                imageData.data[pixelIndex + 1] * 0.587 +
                imageData.data[pixelIndex + 2] * 0.114;

            grayscalePixels.push(brightness);
            totalBrightness += brightness;
        }
    }

    const averageBrightness = totalBrightness / grayscalePixels.length;
    let hash = "";

    for (let pixelIndex = 0; pixelIndex < grayscalePixels.length; pixelIndex += 4) {
        let nibble = 0;
        for (let bitIndex = 0; bitIndex < 4; bitIndex += 1) {
            if (grayscalePixels[pixelIndex + bitIndex] >= averageBrightness) {
                nibble |= 1 << (3 - bitIndex);
            }
        }
        hash += nibble.toString(16);
    }

    return hash;
};

const hammingDistance = (firstHash: string, secondHash: string) => {
    let distance = 0;
    for (let hashIndex = 0; hashIndex < firstHash.length; hashIndex += 1) {
        const differingBits = parseInt(firstHash[hashIndex], 16) ^ parseInt(secondHash[hashIndex], 16);
        distance += differingBits.toString(2).split("1").length - 1;
    }
    return distance;
};

const TransactionForm: React.FC = () => {
    const [formData, setFormData] = useState<CustomerDetails>({
        fullName: "",
        phoneNumber: "",
        amount: "",
        bankName: "",
        transactionId: "",
        charges: "",
    });

    const [cameraOpen, setCameraOpen] = useState(false);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [currentPhotoHash, setCurrentPhotoHash] = useState<string | null>(null);
    const [bankSearch, setBankSearch] = useState("");
    const [bankListOpen, setBankListOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bankPickerRef = useRef<HTMLDivElement>(null);

    const startCamera = async () => {
        try {
            if (!navigator.mediaDevices?.getUserMedia) {
                setValidationErrors(["Camera: this browser or device does not support camera access."]);
                return;
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: "user" } },
            });
            setCameraStream(stream);
            setCameraOpen(true);
        } catch (err) {
            console.error("Error starting camera:", err);
            setValidationErrors(["Camera: please allow camera access and try again."]);
        }
    };

    useEffect(() => {
        if (cameraOpen && cameraStream && videoRef.current) {
            videoRef.current.srcObject = cameraStream;
            videoRef.current.play().catch(() => undefined);
        }
    }, [cameraOpen, cameraStream]);

    useEffect(() => {
        return () => {
            cameraStream?.getTracks().forEach(track => track.stop());
        };
    }, [cameraStream]);

    useEffect(() => {
        const closeBankList = (event: MouseEvent) => {
            if (bankPickerRef.current && !bankPickerRef.current.contains(event.target as Node)) {
                setBankListOpen(false);
            }
        };

        const closeBankListOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setBankListOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeBankList);
        document.addEventListener("keydown", closeBankListOnEscape);

        return () => {
            document.removeEventListener("pointerdown", closeBankList);
            document.removeEventListener("keydown", closeBankListOnEscape);
        };
    }, []);

    const capturePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;
            const maxImageSize = 1280;

            if (ctx && videoWidth > 0 && videoHeight > 0) {
                const scale = Math.min(1, maxImageSize / Math.max(videoWidth, videoHeight));
                canvas.width = Math.round(videoWidth * scale);
                canvas.height = Math.round(videoHeight * scale);
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
                const imageHash = createPerceptualHash(
                    ctx.getImageData(0, 0, canvas.width, canvas.height)
                );

                const isDuplicate = capturedImages.some(
                    image => hammingDistance(imageHash, image.hash) <= similarImageDistanceLimit
                );

                if (isDuplicate) {
                    setValidationErrors(["Captured Images: this image is too similar to an existing image. Please capture a different image."]);
                    return;
                }

                setFormData(previousData => ({ ...previousData, livePhoto: dataUrl }));
                setCurrentPhotoHash(imageHash);
                // Stop camera immediately after capture
                closeCamera();
            }
        }
    };

    const closeCamera = () => {
        if (cameraStream) {
            const stream = cameraStream;
            stream.getTracks().forEach(track => track.stop());
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setCameraStream(null);
        setCameraOpen(false);
    };

    const retakePhoto = () => {
        setFormData(previousData => ({ ...previousData, livePhoto: undefined }));
        setCurrentPhotoHash(null);
        startCamera();
    };

    const nextPhoto = () => {
        if (!formData.livePhoto || capturedImages.length >= maxCapturedImages) {
            return;
        }

        setCapturedImages(previousImages => [
            ...previousImages,
            { id: `${Date.now()}-${formData.fullName.split(" ").map(name => name.charAt(0)).join("_")}-${previousImages.length}`, src: formData.livePhoto!, hash: currentPhotoHash! },
        ]);
        setFormData(previousData => ({ ...previousData, livePhoto: undefined }));
        setCurrentPhotoHash(null);
        if (capturedImages.length + 1 < maxCapturedImages) {
            startCamera();
        }
    };

    const confirmPhoto = () => {
        if (!formData.livePhoto || capturedImages.length >= maxCapturedImages) {
            return;
        }

        setCapturedImages(previousImages => [
            ...previousImages,
            { id: `${Date.now()}-${formData.fullName.split(" ").map(name => name.charAt(0)).join("_")}-${previousImages.length}`, src: formData.livePhoto!, hash: currentPhotoHash! },
        ]);
        setFormData(previousData => ({ ...previousData, livePhoto: undefined }));
        setCurrentPhotoHash(null);
        closeCamera();
    };

    const deletePhoto = (id: string) => {
        setCapturedImages(previousImages => previousImages.filter(image => image.id !== id));
    };

    const reorderPhotos = (fromIndex: number, toIndex: number) => {
        setCapturedImages(previousImages => {
            const reorderedImages = [...previousImages];
            const [movedImage] = reorderedImages.splice(fromIndex, 1);
            reorderedImages.splice(toIndex, 0, movedImage);
            return reorderedImages;
        });
    };

    const filteredBanks = bankOptions.filter(bank =>
        bank.toLowerCase().includes(bankSearch.toLowerCase().trim())
    );

    const selectBank = (bank: string) => {
        setFormData(previousData => ({ ...previousData, bankName: bank }));
        setBankSearch(bank);
        setBankListOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.name === "amount") {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) {
                let charges = "0";
                if (value) {
                    const amount = parseFloat(value);
                    charges = (amount * 0.01).toFixed(2); // 1% charges
                }   
                setFormData({ ...formData, [e.target.name]: value ,'charges': charges});
            }else{
                setFormData({ ...formData, [e.target.name]: '' ,'charges': ''});
                setValidationErrors(["Amount: please enter a valid number."]);
            }
        }else{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const hasCapturedImage = capturedImages.length > 0 || Boolean(formData.livePhoto);
        const errors: string[] = [];

        if (!formData.fullName.trim()) {
            errors.push("Customer Name: please enter the customer's full name.");
        }
        if (!formData.phoneNumber.trim()) {
            errors.push("Contact Number: please enter a contact number.");
        }
        if (!hasCapturedImage) {
            errors.push("Captured Images: please capture at least one image.");
        }
        if (!formData.bankName.trim()) {
            errors.push("Bank Name: please enter the customer's bank name.");
        }
        if (!formData.transactionId.trim()) {
            errors.push("Transaction ID: please enter the transaction ID.");
        }

        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors([]);
        await axios.post("/api/customer", formData);
        alert("Customer details submitted!");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-gray-100 rounded">
            <PageHeader
                title="Customer Transaction"
                description="Enter the customer and transaction details below."
            />

            {validationErrors.length > 0 && (
                <div
                    role="alert"
                    className="fixed left-4 right-4 top-20 z-50 flex items-start justify-between gap-3 rounded-lg border-2 border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-xl sm:left-auto sm:right-6 sm:max-w-md"
                >
                    <div>
                        <strong className="mr-1 block text-red-800">Validation error</strong>
                        <ul className="list-disc space-y-1 pl-5">
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                    <button
                        type="button"
                        onClick={() => setValidationErrors([])}
                        aria-label="Close validation message"
                        className="shrink-0 rounded px-2 font-bold text-red-600 hover:bg-red-100 hover:text-red-800"
                    >
                        x
                    </button>
                </div>
            )}

            <div>
                <label htmlFor="phoneNumber" className="mb-1 block text-sm font-semibold text-gray-700">
                    Contact Number <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Contact Number eg: 6533256485"
                    className="w-full rounded border p-2"
                />
            </div>

            <div>
                <label htmlFor="fullName" className="mb-1 block text-sm font-semibold text-gray-700">
                    Customer Name <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Customer full name"
                    className="w-full rounded border p-2"
                />
            </div>

            {/* Camera Section */}
            <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">
                    Captured Images <span className="text-red-600" aria-hidden="true">*</span>
                </h3>
                {cameraOpen && (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="h-48 w-full rounded border border-gray-300 bg-black object-cover sm:h-56"
                    />
                )}

                {formData.livePhoto && !cameraOpen && (
                    <div className="space-y-2">
                        <img
                            src={formData.livePhoto}
                            alt="Captured"
                            className="h-48 w-full rounded border border-gray-300 object-contain sm:h-56"
                        />
                        <div className="flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={retakePhoto}
                                className="rounded-full border border-gray-300 bg-white/70 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Retake Photo
                            </button>
                            <button
                                type="button"
                                onClick={nextPhoto}
                                className="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:scale-105 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            >
                                Next
                            </button>
                            <button
                                type="button"
                                onClick={confirmPhoto}
                                className="rounded-full border border-blue-300 bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}

                <canvas ref={canvasRef} className="hidden" />

                <ImageList
                    images={capturedImages}
                    onDelete={deletePhoto}
                    onReorder={reorderPhotos}
                />

                {!cameraOpen && !formData.livePhoto && (
                    <button
                        type="button"
                        onClick={startCamera}
                        disabled={capturedImages.length >= maxCapturedImages}
                        title={capturedImages.length >= maxCapturedImages ? "Maximum of 3 images reached" : "Open camera"}
                        className="rounded px-3 py-2 text-white enabled:bg-green-500 enabled:hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        Open Camera
                    </button>
                )}

                {cameraOpen && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={capturePhoto}
                            className="rounded bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600"
                        >
                            Capture Photo
                        </button>
                        <button
                            type="button"
                            onClick={closeCamera}
                            className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                        >
                            Close Camera
                        </button>
                    </div>
                )}

            </div>

            <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full p-2 border rounded"
            />
            <div>
                <label htmlFor="bankSearch" className="mb-1 block text-sm font-semibold text-gray-700">
                   Customer Bank Name <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <div ref={bankPickerRef} className="relative">
                    <input
                        id="bankSearch"
                        type="search"
                        value={bankSearch}
                        onChange={event => {
                            setBankSearch(event.target.value);
                            setFormData(previousData => ({ ...previousData, bankName: "" }));
                            setBankListOpen(true);
                        }}
                        onFocus={() => setBankListOpen(true)}
                        placeholder="Search customer bank"
                        autoComplete="off"
                        className="w-full rounded border bg-white p-2"
                        role="combobox"
                        aria-expanded={bankListOpen}
                        aria-controls="bank-options"
                    />
                    {bankListOpen && (
                        <div
                            id="bank-options"
                            className="absolute left-0 right-0 z-20 mt-1 max-h-48 overflow-y-auto rounded-lg border border-blue-200 bg-white p-1 shadow-lg"
                            role="listbox"
                        >
                            {filteredBanks.length > 0 ? filteredBanks.map(bank => (
                                <button
                                    key={bank}
                                    type="button"
                                    onClick={() => selectBank(bank)}
                                    className="block w-full rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                                    role="option"
                                    aria-selected={formData.bankName === bank}
                                >
                                    {bank}
                                </button>
                            )) : (
                                <p className="px-3 py-2 text-sm text-gray-500">No banks found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div>
                <label htmlFor="transactionId" className="mb-1 block text-sm font-semibold text-gray-700">
                    Transaction ID <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <input
                    id="transactionId"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    placeholder="Transaction ID eg: 1234567890"
                    className="w-full rounded border p-2"
                />
            </div>
            <input
                name="charges"
                value={formData.charges}
                onChange={handleChange}
                placeholder="Charges"
                className="w-full p-2 border rounded"
            />

            <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded"
            >
                Submit
            </button>
        </form>
    );
};

export default TransactionForm;
