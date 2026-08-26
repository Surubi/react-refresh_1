import { AppConstant } from "../AppConstant";

export const HttpClient = () => {
    const baseUrl = AppConstant.API_BASE_URL;

    const buildUrl = (url: string) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
    };

    return {
        get: async (url: string) => {
            const response = await fetch(buildUrl(url));

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
        },
        post: async (url: string, data: any) => {
            const response = await fetch(buildUrl(url), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
        }
    };
};