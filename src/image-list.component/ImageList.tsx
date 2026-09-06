export interface CapturedImage {
  id: string;
  src: string;
  hash: string;
}

interface ImageListProps {
  images: CapturedImage[];
  onDelete: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export const ImageList = ({ images, onDelete, onReorder }: ImageListProps) => {
  let draggedIndex: number | null = null;

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    draggedIndex = index;
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    event.preventDefault();
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      onReorder(draggedIndex, targetIndex);
    }
    draggedIndex = null;
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-blue-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-blue-900">Captured Images</h3>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
          {images.length}
        </span>
      </div>

      <div className="flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Captured images">
        {images.map((image, index) => (
          <div key={image.id} className="group relative shrink-0 rounded-md border border-blue-200 bg-blue-50 p-1 shadow-sm">
            <div
              draggable
              onDragStart={event => handleDragStart(event, index)}
              onDragOver={event => event.preventDefault()}
              onDrop={event => handleDrop(event, index)}
              className="cursor-grab active:cursor-grabbing"
              title="Drag to reorder on desktop"
            >
              <img
                src={image.src}
                alt={`Captured image ${index + 1}`}
                className="h-16 w-16 rounded object-cover"
              />
              <span className="absolute right-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {index + 1}
              </span>
            </div>
            <div className="mt-1 flex justify-center gap-1">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => onReorder(index, index - 1)}
                aria-label={`Move captured image ${index + 1} up`}
                title="Move up"
                className="rounded bg-blue-100 px-1.5 text-xs text-blue-700 enabled:hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span aria-hidden="true">↑</span>
              </button>
              <button
                type="button"
                disabled={index === images.length - 1}
                onClick={() => onReorder(index, index + 1)}
                aria-label={`Move captured image ${index + 1} down`}
                title="Move down"
                className="rounded bg-blue-100 px-1.5 text-xs text-blue-700 enabled:hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span aria-hidden="true">↓</span>
              </button>
              <button
                type="button"
                onClick={() => onDelete(image.id)}
                aria-label={`Delete captured image ${index + 1}`}
                title="Delete image"
                className="rounded bg-red-100 px-1.5 text-xs font-bold text-red-700 hover:bg-red-200"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500">Drag thumbnails to change their order.</p>
    </section>
  );
};
