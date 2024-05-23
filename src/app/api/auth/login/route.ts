import { login } from "@/modules/firebase/services/auth";
import { createCustomUserToken } from "@/modules/firebase/services/jwt";

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     description: Autentica um usuário no sistema e retorna um token JWT
 *     tags:
 *       - Autenticação
 *     operationId: login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       '200':
 *         description: Sucesso - usuário autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       '403':
 *         description: Falha na autenticação
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/ErrorResponse' 
 *               
 *       '500':
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/ErrorResponse' 
 *               
 */
export async function POST(request: Request) {
    const { email, password } = await request.json();
    if (email === '' || password === '') {
        return Response.json({ error: 'Email e senha são obrigatórios' }, { status: 403 });
    }
    
    try {
        const loginResponse = await login(email, password);
        const token = await createCustomUserToken(loginResponse.user.uid);
        return Response.json({ token });
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 403 });
    }
}
