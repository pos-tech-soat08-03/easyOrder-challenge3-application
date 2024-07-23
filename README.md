# Iniciando a aplicação

### Modo "Produção"

Para somente iniciar a aplicação e rodar no servidor, podem ser executados os seguintes comandos:


1. Buildar a aplicação de acordo com o arquivo docker-compose.yml
    ```
    docker-compose up --build
    ```

2. Buildar e rodar manualmente a imagem expondo a porta 3000

    ```
    docker image build -t easyorder:1.0.0 .

    docker image ls

    docker run -p 3000:3000 easyorder:1.0.0

    ```

### Modo "Desenvolvimento"

Para desenvolver, você deve iniciar o docker com a aplicação apontando e monitorando para os arquivos locais.

Para não impactar no docker-compose de produção, renomeie o arquivo `docker-compose.override.sample` para `docker-compose.override.yml`.

Esse arquivo "override" permite que você altere qualquer configuração somente na sua máquina, sem versionar ou alterar o status de produção.

Com o novo arquivo, basta rodar:

```
docker-compose up
```

### Verificar se está funcionando

Para verificar se está funcionando, basta acessar a url [http://localhost:3000/](http://localhost:3000/)