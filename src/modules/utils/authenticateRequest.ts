import { loginWithToken } from "../firebase/services/auth";

export async function authenticateRequest(request: Request): Promise<void> {
    const authHeader = request.headers.get("Authorization")

    if (!authHeader) throw new Error("No authorization provided");

    const [ type, token ] = authHeader.split(" ")
    if (type !== "Bearer") throw new Error("Invalid authorization type");
    if (!token) throw new Error("No token provided");

    await loginWithToken(token);
}