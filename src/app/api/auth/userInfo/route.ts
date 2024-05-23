import { getProfileRepository } from "@/modules/firebase";
import { loginWithToken } from "@/modules/firebase/services/auth";
import { authenticateRequest } from "@/modules/utils/authenticateRequest";

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
        await authenticateRequest(_request);
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 401 });
    }

    try {
        const repo = await getProfileRepository();
        const user = await repo.getProfile();
        return Response.json(user);
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 500 });
    }
}
