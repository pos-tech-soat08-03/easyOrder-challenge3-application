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


# Arquitetura e estrutura de pastas

![](docs/exemplo-hexagonal-01.png)

#### /src/easyorder/Core
- Núcleo da aplicação, contém a application e models

#### /src/easyorder/Core/Application/Usecases
- Comandos da aplicação. Especificamente casos de uso.
- Os nomes dos arquivos devem ser verbos.
- A classe de usecase deve se chamar o nome da ação e ter apenas uma método público chamado "execute"
- O construtor dessas classes receberá os serviços a serem utilizados

#### /src/easyorder/Core/Domain/Entities
- Classes de entidades

#### /src/easyorder/Core/Domain/Input/*
- Portas/Interfaces de entrada da aplicação

#### /src/easyorder/Core/Domain/Output/*
- Portas/Interfaces de saída/armazenamento da aplicação

#### /src/easyorder/Infrastructure/*
- Arquivos de framework. Direcionam e chamam comandos

#### /src/easyorder/Infrastructure/Input/*
- Adaptadores de entrada da aplicação que chamam comandos/usecases

#### /src/easyorder/Infrastructure/Output/*
- Adaptadores com a implementação dos adaptadores de saída/armazenamento da aplicação

### Regrinhas:
- No final do nome do arquivo, sempre coloque o que é o arquivo (Service, Usecase, Interface, Endpoints, etc.)
- Variáveis devem começar com minúsculo em camel case
- Arquivos e classes devem começar com maiúsculo em camel case
- Constantes e variáveis de ambiente devem ser tudo em maiúsculo

### Uso do git:
- Sempre em português
- Todo commit deve ser bem descritivo do que foi feito
- Fazer o menor tamanho de commit possívels
- Sempre em ramos e depois fazer o merge
- No mínimo 2 aprovadores de pull request
- Utilizar os seguintes prefixos com o número da atividade no projeto:
    - `Hotfix: {NúmeroTask} - {mensagem}` Para bugs
    - `Feature: {NúmeroTask} - {mensagem}` Para implementar funcionalidades
    - `Chore: {NúmeroTask} - {mensagem}` Para alterações que não impactem o uso (débito técnico)