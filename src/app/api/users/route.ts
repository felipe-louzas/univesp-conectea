import { authenticateRequest } from "@/modules/utils/authenticateRequest";

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Lista usuários
 *     description: Retorna a lista de usuários cadastrados
 *     tags:
 *       - Usuários
 *     operationId: getUsers
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse' 
 *       '401':
 *         description: Não autorizado
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

    // TODO: Implementar GET /api/users
    throw new Error('Not implemented yet');
}
