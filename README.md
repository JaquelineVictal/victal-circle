# Introdução

Esta documentação fornece informações sobre a aplicação back-end que cria usuários e posts. A aplicação é containerizada utilizando Docker Compose e disponibiliza uma interface Swagger para teste da API.

# Requisitos de Sistema

Docker
Docker Compose

# Configuração do Projeto

Clone o repositório do projeto: git clone <URL_do_repositório>
Navegue até o diretório do projeto: cd <nome_do_projeto>
Crie o arquivo .env utilizando como base o arquivo .base_env:
bash
Copy code
cp .base_env .env
Edite o arquivo .env conforme necessário para configurar as variáveis de ambiente da aplicação.
Iniciando o Projeto
Execute o seguinte comando para iniciar a aplicação:

bash
Copy code
docker-compose up

Após a execução deste comando, a aplicação estará disponível em http://localhost:3000/api.
