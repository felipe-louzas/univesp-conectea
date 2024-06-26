import { authenticateRequest } from "@/modules/utils/authenticateRequest";

/**
 * @openapi
 * /api/pessoas/{pessoaId}:
 *   get:
 *     summary: Obtém cadastro de pessoa específica
 *     description: Retorna o cadastro de uma pessoa específica vinculada ao usuário autenticado
 *     tags:
 *       - Pessoas
 *     operationId: getPessoa
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - in: path
 *        name: pessoaId
 *        required: true
 *        description: Identificador único da pessoa
 *        schema:
 *          type: string
 *     responses:
 *       '200':
 *         description: Sucesso - cadastro atualizado
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
 *       '404':
 *         description: Pessoa não encontrada
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

    // TODO: Implementar GET /api/pessoas/{pessoaId}
    throw new Error('Not implemented yet');
}

/**
 * @openapi
 * /api/pessoas/{pessoaId}:
 *   put:
 *     summary: Atualizar cadastro de pessoa
 *     description: Atualiza o cadastro de uma pessoa vinculada ao usuário autenticado
 *     tags:
 *       - Pessoas
 *     operationId: updatePessoa
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - in: path
 *        name: pessoaId
 *        required: true
 *        description: Identificador único da pessoa
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PessoaInfo'
 *     responses:
 *       '200':
 *         description: Sucesso - cadastro atualizado
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
 *       '404':
 *         description: Pessoa não encontrada
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
export async function PUT(_request: Request) {
    try {
        await authenticateRequest(_request);
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 401 });
    }

    // TODO: Implementar PUT /api/pessoas/{pessoaId}
    throw new Error('Not implemented yet');
}

/**
 * @openapi
 * /api/pessoas/{pessoaId}:
 *   delete:
 *     summary: Excluir cadastro de pessoa
 *     description: Exclui o cadastro de uma pessoa vinculada ao usuário autenticado
 *     tags:
 *       - Pessoas
 *     operationId: deletePessoa
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - in: path
 *        name: pessoaId
 *        required: true
 *        description: Identificador único da pessoa
 *        schema:
 *          type: string
 *     responses:
 *       '204':
 *         description: Sucesso - cadastro excluído
 *       '401':
 *         description: Não autorizado - o usuário não está autenticado
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/ErrorResponse' 
 *       '404':
 *         description: Pessoa não encontrada
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
export async function DELETE(_request: Request) {
    try {
        await authenticateRequest(_request);
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 401 });
    }

    // TODO: Implementar DELETE /api/pessoas/{pessoaId}
    throw new Error('Not implemented yet');
}


