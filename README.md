# Introdução

Esta documentação fornece informações sobre a aplicação back-end que cria usuários e posts. A aplicação é containerizada utilizando Docker Compose e disponibiliza uma interface Swagger para teste da API.

# Requisitos de Sistema

Docker
Docker Compose

# Configuração do Projeto

Clone o repositório do projeto: git clone git@github.com:JaquelineVictal/victal-circle.git

Navegue até o diretório do projeto: cd _victal-circle_

Crie o arquivo .env utilizando como base o arquivo .base_env:

```javascript
bash
Copy code
cp .base_env .env
```

Edite o arquivo .env conforme necessário para configurar as variáveis de ambiente da aplicação.

Iniciando o Projeto

Execute o seguinte comando para iniciar a aplicação:

```javascript
docker-compose up
```

Após a execução deste comando, a aplicação estará disponível em http://localhost:3000/api.

# Docker Hub

Imagem da Api: https://hub.docker.com/repository/docker/databasejva/victal-circle-api/general

Imagem do Banco de dados: https://hub.docker.com/repository/docker/databasejva/victal-circle-db/general
