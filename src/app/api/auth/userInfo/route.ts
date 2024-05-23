import { getProfileRepository } from "@/modules/firebase";
import { loginWithToken } from "@/modules/firebase/services/auth";

/**
 * @openapi
 * /api/auth/userInfo:
 *   get:
 *     summary: Retorna informações do usuário logado
 *     description: Retorna as informações do usuário autenticado no sistema
 *     tags:
 *       - Autenticação
 *     operationId: getUserInfo
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfoResponse' 
 *       '401':
 *         description: Não autorizado - o usuário não está autenticado
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/ErrorResponse' 
 *       '500':
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/ErrorResponse' 
 *               
 */
export async function GET(_request: Request) {
    try {
        const authHeader = _request.headers.get("Authorization")
        if (!authHeader) {
            return Response.json({ error: "No authorization provided" }, { status: 401 });
        }
        const [ type, token ] = authHeader.split(" ")
        if (type !== "Bearer") {
            return Response.json({ error: "Invalid authorization type" }, { status: 401 });
        }
        if (!token) {
            return Response.json({ error: "No token provided" }, { status: 401 });
        }
        try {
            await loginWithToken(token);
        } catch (error) {
            return Response.json({ error: String(error) }, { status: 401 });
        }

        const repo = await getProfileRepository();
        const user = await repo.getProfile();
        return Response.json(user);
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 500 });
    }
}
