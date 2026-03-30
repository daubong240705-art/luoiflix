import { cookies } from "next/headers"
import { sendRequest } from "./wrapprer"

export const adminRequest = async <T>(props: IRequest) => {

    const cookieHeader =
        typeof window === "undefined"
            ? (await cookies()).toString()
            : undefined

    return sendRequest<T>({
        ...props,
        auth: true,
        useCredentials: true,
        cookieHeader
    })
}