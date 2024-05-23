/**
 * @openapi
 * /api/pessoas/{pessoaId}/registros/{registroId}:
 *   put:
 *     summary: Atualizar registro de evento
 *     description: Atualiza o registro de evento especificado
 *     tags:
 *       - Registros
 *     operationId: updateRegistro
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path 
 *         name: pessoaId
 *         required: true
 *         description: Identificador único da pessoa
 *         schema:
 *           type: string
 *       - in: path
 *         name: registroId
 *         required: true
 *         description: Identificador único do registro
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
 *         description: Sucesso - registro atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registro' 
 *       '401':
 *         description: Não autorizado - o usuário não está autenticado
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/ErrorResponse' 
 *       '404':
 *         description: Registro não encontrado
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
    // TODO: Implementar PUT /api/pessoas/{pessoaId}/registros/{registroId}
    throw new Error('Not implemented yet');
}

/**
 * @openapi
 * /api/pessoas/{pessoaId}/registros/{registroId}:
 *   delete:
 *     summary: Excluir registro de evento
 *     description: Exclui o registro de evento especificado
 *     tags:
 *       - Registros
 *     operationId: deleteRegistro
 *     security:
 *       - BearerAuth: []
  *     parameters:
 *       - in: path 
 *         name: pessoaId
 *         required: true
 *         description: Identificador único da pessoa
 *         schema:
 *           type: string
 *       - in: path
 *         name: registroId
 *         required: true
 *         description: Identificador único do registro
 *         schema:
 *           type: string
*     responses:
 *       '204':
 *         description: Sucesso - registro excluído
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
    // TODO: Implementar DELETE /api/pessoas/{pessoaId}/registros/{registroId}
    throw new Error('Not implemented yet');
}


