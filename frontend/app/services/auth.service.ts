import { LoginForm, SignupForm } from "@/app/types/form.type";
import { getBackendBaseUrl } from "@/lib/config/api-url";
import { sendRequest } from "@/lib/api/wrapprer";

const API_URL = getBackendBaseUrl();

export type SignupPayload = Omit<SignupForm, "confirmPassword">;

export type AccountPayload = Pick<
  User,
  "id" | "username" | "email" | "fullName" | "avatarUrl" | "role"
>;

export type UpdateProfilePayload = {
  fullName: string;
  avatarUrl: string;
};

export const authApi = {
  login(data: LoginForm) {
    return sendRequest<IBackendRes<User>>({
      url: `${API_URL}/auth/login`,
      method: "POST",
      body: data,
      useCredentials: true,
    });
  },

  signup(data: SignupPayload) {
    return sendRequest<IBackendRes<SignupPayload>>({
      url: `${API_URL}/auth/signup`,
      method: "POST",
      body: data,
    });
  },

  getAccount() {
    return sendRequest<IBackendRes<AccountPayload>>({
      url: `${API_URL}/profile`,
      method: "GET",
      useCredentials: true,
      auth: true,
      redirectOnAuthFail: false,
    });
  },

  updateProfile(data: UpdateProfilePayload) {
    return sendRequest<IBackendRes<{ accessToken: string; user: AccountPayload }>>({
      url: `${API_URL}/profile`,
      method: "PUT",
      body: data,
      useCredentials: true,
      auth: true,
      redirectOnAuthFail: false,
    });
  },

  logout() {
    return sendRequest<IBackendRes<null>>({
      url: `${API_URL}/auth/logout`,
      method: "POST",
      useCredentials: true,
      auth: true,
      redirectOnAuthFail: false,
    });
  },
};
