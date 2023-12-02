# TCC-API: Sistema de Agendamentos

**Versão:** 1.0.0

**Descrição:** API do sistema de agendamentos para o Trabalho de Conclusão de Curso (TCC)

## Visão Geral

Esta API é parte integrante do sistema de agendamentos desenvolvido como parte do Trabalho de Conclusão de Curso. A finalidade principal é facilitar a gestão de agendamentos, fornecendo endpoints para operações como criar, visualizar, atualizar e excluir agendamentos.

## Instalação

Certifique-se de ter [Node.js](https://nodejs.org/) instalado em sua máquina antes de prosseguir.

1. Clone o repositório:

   ```bash
   git clone https://github.com/ViniciuCarneiro/tcc-api.git
   cd tcc-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias. Você pode seguir o exemplo do arquivo `.env.example`.

## Uso

1. Inicie o servidor:

   ```bash
   npm start
   ```

   Isso iniciará a API na porta padrão 3000 (ou na porta configurada na variável de ambiente `PORT`).

2. Acesse a documentação da API em [http://localhost:3000/api-docs](http://localhost:3000/api-docs) para obter detalhes sobre os endpoints disponíveis e como usá-los.

## Dependências Principais

- [date-fns](https://date-fns.org/) - Biblioteca para manipulação de datas em JavaScript.
- [dotenv](https://www.npmjs.com/package/dotenv) - Carrega variáveis de ambiente a partir de um arquivo `.env`.
- [express](https://expressjs.com/) - Framework web para Node.js.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Implementação de JSON Web Tokens (JWT).
- [mysql2](https://www.npmjs.com/package/mysql2) - Cliente MySQL para Node.js.
- [nodemon](https://nodemon.io/) - Utilitário que reinicia automaticamente o servidor durante o desenvolvimento.

## Contribuição

Sinta-se à vontade para abrir issues ou enviar pull requests. Toda contribuição é bem-vinda!

## Licença

Este projeto é licenciado sob a Licença ISC. Consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

## Bugs e Sugestões

Encontrou um bug ou tem alguma sugestão? Por favor, [abra uma issue](https://github.com/ViniciuCarneiro/tcc-api/issues).

---

**Autor:** Vinicius Santos Carneiro  
**GitHub:** [ViniciuCarneiro](https://github.com/ViniciuCarneiro)  
**Homepage:** [https://github.com/ViniciuCarneiro/tcc-api#readme](https://github.com/ViniciuCarneiro/tcc-api#readme)
