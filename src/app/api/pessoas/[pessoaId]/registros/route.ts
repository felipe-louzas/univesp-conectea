import { currentUser, getPessoaRepository } from "@/modules/firebase";
import { Registro } from "@/modules/firebase/models/Registro";
import { authenticateRequest } from "@/modules/utils/authenticateRequest";
import { NextRequest } from "next/server";

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
export async function GET(_request: Request, route: { params: { pessoaId: string } }) {
    try {
        await authenticateRequest(_request);
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 401 });
    }

    const { pessoaId } = route.params;
    if (!pessoaId) return Response.json({ error: 'Missing pessoaId' }, { status: 400 });

    const repo = await getPessoaRepository();
    const pessoas = await repo.getPessoas();
    const pessoa = pessoas.find(p => p.id === pessoaId);
    if (!pessoa) return Response.json({ error: 'Pessoa not found' }, { status: 404 });

    const registros = await repo.getRegistros(pessoa);
    return Response.json(registros);
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
export async function POST(_request: Request, route: { params: { pessoaId: string } }) {
    try {
        await authenticateRequest(_request);
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 401 });
    }

    const user = await currentUser();

    const { pessoaId } = route.params;
    if (!pessoaId) return Response.json({ error: 'Missing pessoaId' }, { status: 400 });

    const repo = await getPessoaRepository();

    const pessoas = await repo.getPessoas();
    const pessoa = pessoas.find(p => p.id === pessoaId);
    if (!pessoa) return Response.json({ error: 'Pessoa not found' }, { status: 404 });

    const requestBody = await _request.json();

    const data = {
        data: requestBody.data ?? Date.now(),
        ocorrencia: requestBody.ocorrencia,
        local: requestBody.local ?? null,
        descricao: requestBody.descricao ?? null,
        pessoasPresentes: requestBody.pessoasPresentes ?? null,
        informacoesContextuais: requestBody.informacoesContextuais ?? null,
        antecedentesGatilhos: requestBody.antecedentesGatilhos ?? null,
        observacoesGerais: requestBody.observacoesGerais ?? null,
    }

    if (!data.ocorrencia) return Response.json({ error: 'Missing ocorrencia' }, { status: 400 });
    data.data = new Date(data.data);

    const registro = new Registro({
        id: '',
        pessoaId: pessoa.id,
        pessoaNome: `${pessoa.nome} ${pessoa.sobreNome}`,
        registradorPor: user.uid,
        registradoPorFullName: user.fullName,
        registradoEm: new Date(),
        ...data
    })

    const recordId = await repo.saveRegistro(pessoa, registro);
    const savedRecord = await repo.getRegistro(pessoa, recordId);

    return Response.json(savedRecord);
}


