
import { CategoryPayload } from '@/app/types/form.type';
import { getBackendBaseUrl } from '@/lib/config/api-url';
import { sendRequest } from '@/lib/api/wrapprer';


const API_URL = getBackendBaseUrl();

export const categoryApi = {

    async getAllAdminCategories(): Promise<Category[]> {
        const res = await sendRequest<IBackendRes<IModelPaginate<Category>>>({
            url: `${API_URL}/categories`,
            method: "GET",
            useCredentials: true,
            auth: true,
        });

        return res.data?.result ?? [];
    },

    async createCategory(data: CategoryPayload) {
        return sendRequest<IBackendRes<Category>>({
            url: `${API_URL}/categories`,
            method: "POST",
            body: data,
            useCredentials: true,
            auth: true,
        });
    },

    async updateCategory(id: number, data: CategoryPayload) {
        return sendRequest<IBackendRes<Category>>({
            url: `${API_URL}/categories/${id}`,
            method: "PUT",
            body: data,
            useCredentials: true,
            auth: true,
        });
    },

    deleteCategory: (id: number) =>
        sendRequest({
            url: `${API_URL}/categories/${id}`,
            method: "DELETE",
            useCredentials: true,
            auth: true,
        })

};
