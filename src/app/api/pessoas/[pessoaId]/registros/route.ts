/**
 * @openapi
 * /api/pessoas/{pessoaId}/registros:
 *   get:
 *     summary: Listar registros de eventos
 *     description: Retorna a lista de registros de eventos da pessoa especificada
 *     tags:
 *       - Registros
 *     operationId: getRegistros
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pessoaId
 *         required: true
 *         description: Identificador único da pessoa
 *         schema:
 *           type: string
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
    // TODO: Implementar GET /api/pessoas/{pessoaId}/registros
    throw new Error('Not implemented yet');
}

/**
 * @openapi
 * /api/pessoas/{pessoaId}/registros:
 *   post:
 *     summary: Adicionar novo registro de evento
 *     description: Cria um novo registro de evento para a pessoa especificada
 *     tags:
 *       - Registros
 *     operationId: getRegistro
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pessoaId
 *         required: true
 *         description: Identificador único da pessoa
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Registro'
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
export async function POST(_request: Request) {
    // TODO: Implementar POST /api/pessoas/{pessoaId}/registros
    throw new Error('Not implemented yet');
}


