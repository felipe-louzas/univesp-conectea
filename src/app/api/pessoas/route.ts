import { authenticateRequest } from "@/modules/utils/authenticateRequest";

/**
 * @openapi
 * /api/pessoas:
 *   get:
 *     summary: Listar pessoas
 *     description: Retorna a lista de pessoas vinculadas ao usuário autenticado
 *     tags:
 *       - Pessoas
 *     operationId: getUserInfo
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PessoaInfoList' 
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

    // TODO: Implementar GET /api/pessoas
    throw new Error('Not implemented yet');
}

/**
* @openapi
* /api/pessoas:
*   post:
*     summary: Cadastrar pessoa
*     description: Cadastra uma nova pessoa vinculada ao usuário autenticado
*     tags:
*       - Pessoas
*     operationId: createPessoa
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/PessoaInfo'
*     responses:
*       '200':
*         description: Sucesso
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/PessoaInfo' 
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
export async function POST(_request: Request) {
    try {
        await authenticateRequest(_request);
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 401 });
    }

    // TODO: Implementar POST /api/pessoas
    throw new Error('Not implemented yet');
}