import { createSwaggerSpec } from "next-swagger-doc";
import { Registro } from "../firebase/models/Registro";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "ConecTEA - API de integração",
        description: "API de integração de sistemas para a plataforma ConecTEA",
        version: "1.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          AuthRequest: {
            title: "AuthRequest",
            type: "object",
            properties: {
              email: {
                type: "string",
                description: "Endereço de e-mail do usuário",
              },
              password: {
                type: "string",
                description: "Senha do usuário",
              },
            },
            example: {
              email: "teste@exemplo.com.br",
              password: "senha123",
            },
          },
          AuthResponse: {
            title: "AuthResponse",
            type: "object",
            properties: {
              accessToken: {
                type: "string",
                description: "Token JWT de autenticação",
              },
            },
            example: {
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
            },
          },
          ErrorResponse: {
            title: "ErrorResponse",
            type: "object",
            properties: {
              error: {
                type: "string",
                description: "Mensagem indicando o motivo do erro ou falha na requisição",

              },
            },
            example: {
              error: "Mensagem de erro",
            },
          },
          PessoaInfo: {
            title: "PessoaInfo",
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Identificador único da pessoa",
              },
              nome: {
                type: "string",
                description: "Nome da pessoa",
              },
              dataNascimento: {
                type: "string",
                description: "Data de nascimento da pessoa",
              },
              genero: {
                type: "string",
                description: "Gênero da pessoa",
              },
              deficiencia: {
                type: "string",
                description: "Tipo de deficiência da pessoa",
              },
              responsavel: {
                type: "string",
                description: "Nome do responsável pela pessoa",
              },
              contato: {
                type: "string",
                description: "Telefone de contato da pessoa",
              },
              email: {
                type: "string",
                description: "Endereço de e-mail da pessoa",
              },
              endereco: {
                type: "string",
                description: "Endereço da pessoa",
              },
            },
            example: {
              id: "123456",
              nome: "Pessoa de Teste",
              dataNascimento: "2021-12-31",
              genero: "Masculino",
              deficiencia: "Autismo",
              responsavel: "Responsável de Teste",
              contato: "(11) 99999-9999",
              email: "teste@exemplo.com",
              endereco: "Rua de Teste, 123",
            },
          },
          PessoaInfoList: {
            title: "PessoaInfoList",
            type: "object",
            properties: {
              pessoas: {
                type: "array",
                description: "Lista de pessoas",
                items: {
                  $ref: "#/components/schemas/PessoaInfo",
                },
              },
            },
            example: {
              pessoas: [
                {
                  id: "123456",
                  nome: "Pessoa de Teste",
                  dataNascimento: "2021-12-31",
                  genero: "Masculino",
                  deficiencia: "Autismo",
                  responsavel: "Responsável de Teste",
                  contato: "(11) 99999-9999",
                  email: "teste@exemplo.com.br",
                  endereco: "Rua de Teste, 123",
                },
              ],
            },
          },
          Registro: {
            title: "Registro",
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Identificador único do registro",
              },
              data: {
                type: "string",
                description: "Data do registro",
              },
              tipo: {
                type: "string",
                description: "Tipo do registro",
              },
              descricao: {
                type: "string",
                description: "Descrição do registro",
              },
            },
            example: {
              id: "123456",
              data: "2021-12-31",
              tipo: "Evento",
              descricao: "Descrição do evento",
            },
          },
          UserInfoResponse: {
            title: "UserInfoResponse",
            type: "object",
            properties: {
              userId: {
                type: "string",
                description: "Identificador único do usuário",
              },
              email: {
                type: "string",
                description: "Endereço de e-mail do usuário",
              },
              userKind: {
                type: "string",
                description: "Tipo de usuário (Responsável, Educador, etc)",
              },
              firstName: {
                type: "string",
                description: "Nome do usuário",
              },
              lastName: {
                type: "string",
                description: "Sobrenome do usuário",
              },
              municipioId: {
                type: "string",
                description: "Identificador do município do usuário",
              },
              municipioName: {
                type: "string",
                description: "Nome do município do usuário",
              },
              ufId: {
                type: "string",
                description: "Identificador da UF do usuário",
              },
              ufName: {
                type: "string",
                description: "Nome da UF do usuário",
              },
              ufSigla: {
                type: "string",
                description: "Sigla da UF do usuário",
              },
              photoUrl: {
                type: "string",
                description: "URL da foto do usuário",
              },
              coverPhotoUrl: {
                type: "string",
                description: "URL da foto de capa do usuário",
              },
              introText: {
                type: "string",
                description: "Texto de introdução do usuário",
              },
            },
            example: {
              userId: "cmlhcExpVjZhYjlZTjZNcHp0UjF",
              email: "teste@exemplo.com.br",
              userKind: "Responsável",
              firstName: "Usuário",
              lastName: "de Teste",
              municipioId: "123456",
              municipioName: "São Paulo",
              ufId: "35",
              ufName: "São Paulo",
              ufSigla: "SP",
              photoUrl: "https://example.com/photo.jpg",
              coverPhotoUrl: "https://example.com/cover.jpg",
              introText: "Texto de introdução do usuário",
            }
          },
          UserListResponse: {
            title: "UserListResponse",
            type: "object",
            properties: {
              users: {
                type: "array",
                description: "Lista de usuários",
                items: {
                  $ref: "#/components/schemas/UserInfoResponse",
                },
              },
            },
            example: {
              users: [
                {
                  id: "123456",
                  name: "Usuário de Teste",
                  email: "teste@exemplo.com.br",
                },
              ],
            },
          },
          UserProfileResponse: {
            title: "UserProfileResponse",
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Identificador único do usuário",
              },
              name: {
                type: "string",
                description: "Nome do usuário",
              },
              email: {
                type: "string",
                description: "Endereço de e-mail do usuário",
              },
              bio: {
                type: "string",
                description: "Descrição do perfil do usuário",
              },
              avatar: {
                type: "string",
                description: "URL da imagem de avatar do usuário",
              },
            },
            example: {
              id: "123456",
              name: "Usuário de Teste",
              email: "teste@exemplo.com",
              bio: "Descrição do perfil do usuário",
              avatar: "https://example.com/avatar.jpg",
            },
          },
        },
      },
      security: [],
      tags: [
        {
          name: "Autenticação",
          description: "Endpoints relacionados à autenticação",
        },
        {
          name: "Usuários",
          description: "Endpoints relacionados à consultas de informações de usuários",
        },
        {
          name: "Pessoas",
          description: "Endpoints relacionados à gestão de cadastros de pessoas",
        },
        {
          name: "Registros",
          description: "Endpoints relacionados à gestão de registros de eventos",
        }
      ],

    },
  });
  return spec;
};