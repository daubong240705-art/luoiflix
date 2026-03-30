
import { UserPayload } from '@/app/types/form.type';
import { getBackendBaseUrl } from '@/lib/config/api-url';
import { sendRequest } from '@/lib/api/wrapprer';



const API_URL = getBackendBaseUrl();

export const userApi = {
  async getAllAdminUsers(): Promise<User[]> {
    const res = await sendRequest<IBackendRes<IModelPaginate<User>>>({
      url: `${API_URL}/users`,
      method: "GET",
      useCredentials: true,
      auth: true,
    });

    return res.data?.result ?? [];
  },

  async createUser(data: UserPayload) {
    return sendRequest<IBackendRes<User>>({
      url: `${API_URL}/users`,
      method: "POST",
      body: data,
      useCredentials: true,
      auth: true,
    });
  },

  async updateUser(id: number, data: UserPayload) {
    return sendRequest<IBackendRes<User>>({
      url: `${API_URL}/users/${id}`,
      method: "PUT",
      body: data,
      useCredentials: true,
      auth: true,
    });
  },

  deleteUser: (id: number) =>
    sendRequest({
      url: `${API_URL}/users/${id}`,
      method: "DELETE",
      useCredentials: true,
      auth: true,
    })



};
