# easyOrder: Aplicação Tech Challenge POS TECH SOAT8 FIAP - Grupo 03

## ✒️ Grupo / Autores

O Grupo que implementou a solução (Grupo 03), é composto pelos seguintes integrantes (nome, email, RM, discord):
- Bruno Moreira Reis: brbrno@hotmail.com, RM358025, @bruno_m_reis
- Fernando Gurkievicz, fergkz@gmail.com, RM357072, @goorkz
- Marcio Saragiotto, marcio.saragiotto@gmail.com, RM357349, @msgiotto
- Matias Correa Franco de Faria, devmatiascff@gmail.com, RM357411, @matiasf8321
- Rafael da Silva Andrade, rafaandrade_@outlook.com, RM357010, @andrade_rafael

&nbsp;
## Projeto - Descrição e Objetivos - Fase 2

A aplicação __easyOrder__ 2.0 foi implementada como parte do _Tech Challenge_ da segunda etapa da Pós Tech de Arquitetura de Software (Turma SOAT8) da FIAP. Esse desafio simula a implantação de uma solução para uma Lanchonete de bairro expandir e alavancar seu negócio através da automação de parte dos seus processos, incluindo a _Realização do pedido e pagamento_ e o processo de _Preparação e entrega do pedido_.

O enunciado do problema original pode ser encontrado [nesse link](./docs/README-Problema-Fase-1.md).

Requisitos adicionais (enunciado) da segunda fase podem ser consultados [nesse link](./docs/README-Problema-Fase-2.md).

Os requisitos adicionais (funcionais, não funcionais e desenhos de arquitetura)  são explicados ao longo desse documento. Neste Readme não é apresentado o detalhamento da Fase 1.

## Links importantes da Fase 2 🌟
- Repositório da solução no Github: [https://github.com/pos-tech-soat08-03/easyOrder-challenge2](https://github.com/pos-tech-soat08-03/easyOrder-challenge2) 

- Link do Vídeo com a explicação sobre a Arquitetura Clean, Kubernetes,  demonstração do Funcionamento da Aplicação e integração com Mercado Pago: [https://youtu.be/um4dOSo5Iuk](https://youtu.be/um4dOSo5Iuk)

[![Challenge 2 SOAT8 Turma 3](https://img.youtube.com/vi/um4dOSo5Iuk/0.jpg)](https://www.youtube.com/watch?v=um4dOSo5Iuk?si=xu-pwPyKN1ZbhJuK)

&nbsp;

## Requisitos Funcionais adicionados na Fase 2

Todos esses requitos foram implementados e estão disponíveis como parte dos testes fim-a-fim e manual de uso das APIs.

- Checkout com identificação do pedido ✔️
- Consulta de status de pagamento ✔️
- Webhook de confirmação de pagamento ✔️
- Lista de pedidos respeitando critérios de ordenacão ✔️
- Atualização de status de pedido (considerando novo fluxo de pagamento) ✔️
- Integração com Serviço de Pagamento Mercado Pago (QRCode) ✔️
  - Como este requisito depende de etapas adicionais para o teste, está demonstrado somente [no vídeo explicativo](https://youtu.be/um4dOSo5Iuk?si=Sc2hcRRITXkQESCx&t=955) 🎥

## Requisitos de Arquitetura da Fase 2

- Arquitetura da aplicação em Clean Architecture e seguindo padrões Clean Code ✔️

- Arquitetura em kubernetes desenhada para atender aos requisitos funcionais, permitindo a escalabilidade de pods conforme demanda ✔️
  - Inclui todos so arquivos yaml na pasta [manifesto_kubernetes](./manifesto_kubernetes/)
  - Implementação está descrita na documentação mas será explicada detalhadamente no [vídeo explicativo](https://youtu.be/um4dOSo5Iuk?si=Leqge3ISml5xnyyv&t=677)  🎥

## Documentações adicionais necessárias para a Fase 2

- Desenho de arquitetura detalhada pode ser [encontrado aqui](./docs/arquitetura_kubernetes.jpg) ✔️
  - Arquivo no formato original do [draw.io](https://app.diagrams.net/#Hpos-tech-soat08-03%2FeasyOrder-challenge2%2Fmain%2Fdocs%2Farquitetura_kubernetes.drawio#%7B%22pageId%22%3A%22f106602c-feb2-e66a-4537-3a34d633f6aa%22%7D)

- Swagger / collection de APIs do Projeto ✔️
  - Documentação completa e navegável do swagger (com exemplos de requisição prontos para execução) pode ser acessada na aplicação via [http://localhost:30000/doc/](http://localhost:30000/doc/)

  - Arquivo de referência pode ser acessada também no [swagger-output.json](./src/swagger-output.json) em formato OpenAPI 2.0
  
- Guia completo de execução do projeto e ordem de execução é apresentado na sequência desse documento ✔️
  - Adicional: Explicação do [Teste fim-a-fim](#-rodando-testes-ponta-a-ponta-end-to-end---e2e-e-entendendo-o-fluxo-de-execução) com todas as etapas em sequência de execução 
  - Adicional: Detalhamento de cada [etapa de execução](./docs/README-Guia-Execucao-APIs.md)

- Vídeo demonstrativo [da arquitetura Clean](https://youtu.be/um4dOSo5Iuk?si=eg3LGKf4sARYgEbS&t=308) e da [execução das APIs do Projeto](https://youtu.be/um4dOSo5Iuk?si=xu-pwPyKN1ZbhJuK) 🎥

## Sobre a aplicação

A aplicação foi implementada utilizando a linguagem [Typescript](https://www.typescriptlang.org/pt/), seus pré-requisitos padrão (Node, Ts-Node, etc) e inclui a utilização de alguns pacotes como apoio:
- [Express](https://expressjs.com/) como framework minimalista de Web Application
- [Swagger-autogen](https://swagger-autogen.github.io/docs/) e [Swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) para documentação e acesso ao swagger dos endpoints / APIs
- [Mysql2](https://www.npmjs.com/package/mysql2) e [Sequelize](https://sequelize.org/) para implementação de persistência em Banco de Dados
- [Axios](https://www.npmjs.com/package/axios) e [Jest](https://www.npmjs.com/package/ts-jest) para Testes Ponta a Ponta

&nbsp;
## Como Rodar a Aplicação em Containers	(utilizando o Docker)

### 📋 Pré-requisitos

- Docker e Docker-compose instalados
- Git (baixar o repositório localmente)

Todas as dependências e pré-requisitos serão atendidos pela execução do docker-compose, conforme explicado abaixo.

### ⚙️ Iniciando Em Modo "Produção"

Inicializar o Git e Clonar o repositório em uma pasta local, com os comandos:

``` bash
git clone https://github.com/pos-tech-soat08-03/easyOrder-challenge2

cd easyOrder-challenge2/
```

Para iniciar o _build_ da aplicação já atendendo aos pré-requisitos e rodar no servidor, podem ser executados os seguintes comandos:

1. Buildar a aplicação de acordo com o arquivo docker-compose.yml
    
    Windows:
    ``` bash
    docker compose up --build
    ```

    Linux:
    ``` bash
    sudo docker-compose up --build
    ```

## Como Rodar a Aplicação em Kubernetes

### 📋 Pré-requisitos

- Docker
- Kubernetes
- Minikube para quem usa linux
- Ativar Kubernetes no Docker Desktop para quem usa Windows
- Metrics-server ativo 

_Antes de iniciar verifique a configuração do seu ambiente, pois será necessário usar recurso de métricas._  
_Configurando metretics-server [Windows](https://github.com/kubernetes-sigs/metrics-server) e [Linux](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)_

### ⚙️ Iniciando Em Modo "Produção"

Inicializar o Git e _Clonar_ o repositório em uma pasta local, com os comandos:

``` bash
git clone https://github.com/pos-tech-soat08-03/easyOrder-challenge2.git
```
Escalonando:
``` bash
cd easyOrder/manifesto_kubernetes
kubectl apply -f svc-easyorder-database.yaml
kubectl apply -f pvc-easyorder-database.yaml
kubectl apply -f easyorder-database-configmap.yaml
kubectl apply -f easyorder-database-deployment.yaml
kubectl apply -f svc-easyorder.yaml
kubectl apply -f easyorder-configmap.yaml
kubectl apply -f easyorder-deployment.yaml
kubectl apply -f easyorder-hpa.yaml
```
Desta forma inciará: 
- service/svc-easyorder-database
- configmap/easyorder-database-configmap
- persistentvolumeclaim/pvc-easyorder-database
- deployment.apps/easyorder-database-deployment
- service/svc-easyorder
- configmap/easyorder-configmap
- deployment.apps/easyorder-deployment
- horizontalpodautoscaler.autoscaling/easyorder-hp

### Arquitetura Kubernetes 

<img src="./docs/arquitetura_kubernetes.jpg" alt="Clean Architecture" style="width:80%;"/>

### ✅ Verificar se está funcionando

Neste ponto, o serviço deve estar ativo, para verificar se está funcionando, basta acessar a url [http://localhost:30000/](http://localhost:30000/). 

O endpoint [http://localhost:30000/health](http://localhost:30000/health) também deve indicar que o servidor está rodando corretamente, com todos os serviços ativos.

_Caso esteja acessando a aplicação de outro host, favor modificar a URL para o endereço correto do seu host._  

&nbsp;
### 💡 Acesso à Documentação do Swagger

Para acessar a documentação do Swagger, acessar a url [http://localhost:30000/doc/](http://localhost:30000/doc/) - você poderá navegar e testar todos os endpoints, com exemplos disponíveis.

<img src="./docs/image-swagger2.png" alt="easyOrder 2.0 Swagger" style="width:60%;"/>


_Caso esteja acessando a aplicação de outro host, favor modificar a URL para o endereço correto do seu host._  


&nbsp;

### 🔩 Rodando Testes Ponta a Ponta (_End-to-end - E2E_) e Entendendo o Fluxo de Execução

Um roteiro completo de Testes Ponta a Ponta está disponível para facilitar a validação do processo da aplicação. Para executar o teste ponta a ponta, através do ambiente ativo no Docker, rode em um outro terminal (mantenha a aplicação rodando no Docker e ou Kubernetes).

Docker:
``` bash
docker exec -it easyorder npx jest ./app.e2e.test.ts --verbose true
```
Kubernetes:
``` bash
kubectl get pod #"Para lista o nome do pod por exemplo: easyorder-deployment-888ffc9c5"
kubectl exec -it <nome-do-pod> -c easyorder-container -- npx jest ./app.e2e.test.ts --verbose true
```

O resultado dos testes Ponta a Ponta apresenta a sugestão de sequência de execução:

Teste Fim-a-fim: Pedido a Produção<br>

🔽 (/produto/cadastrar) Cadastra Lanches para serem utilizados nos Combos<br>
🔽 (/produto/cadastrar) Cadastra Sobremesas para serem utilizados nos Combos<br>
🔽 (/produto/cadastrar) Cadastra Bebidas para serem utilizados nos Combos<br>
🔽 (/produto/cadastrar) Cadastra Acompanhamentos para serem utilizados nos Combos<br>

🔽 (/cliente/cadastrar) Cria um Novo Cliente com CPF aleatório<br>
🔽 (/cliente/buscar/{cpf}) Busca Cliente por CPF<br>

🔽 (/pedido) Cria a etapa inicial do Pedido, cliente identificado<br>
🔽 (/pedido/{pedidoId}) Busca pedido do Cliente identificado<br>
🔽 (/combo/adicionar) Adiciona combo ao Pedido<br>
🔽 (/pedido/{pedidoId}/combo/{comboId}) Remove combo do pedido<br>
🔽 (/pedido/{pedidoId}/checkout) Fecha pedido: encaminha para Serviço de Pagamento<br>

🔽 (/pagamento/listar-transacoes/{pedidoid}) Busca transação criada e enviada para Serviço de Pagamento<br>
🔽 (/pagamento/webhook) Recebe confirmação de transação e encaminha pedido para Fila de Preparação<br>

🔽 (/preparacao/pedido/proximo) Busca próximo Pedido na fila de preparação<br>
🔽 (/preparacao/pedido/{pedidoId}/iniciar-preparacao) Inicia preparação do pedido<br>
🔽 (/preparacao/pedido/{pedidoId}/finalizar-preparacao) Finaliza preparação do Pedido<br>
🔽 (/preparacao/pedido/{pedidoId}/entregar) Entrega e Finaliza Pedido<br>

Caso prefira realizar a execução passo a passo da aplicação, criamos um [Guia de Execução Simplificado](./docs/README-Guia-Execucao-APIs.md)

&nbsp;
&nbsp;
# 🛠️ Arquitetura do Sistema

A arquitetura utilizada no sistema foi a [Arquitetura Limpa / Clean Architecture](https://www.amazon.com.br/Arquitetura-Limpa-Artes%C3%A3o-Estrutura-Software/dp/8550804606). A aplicação foi completamente refatorada para garantir que alguns princípios importantes sempre fossem respeitados:
- Regra de dependência: em que as dependências sempre apontam para dentro, ou seja, que camadas mais internas não dependam e não tenham conhecimento sobre recursos / objeto / tecnologias das camadas externas.
- Encapsulamento das entidades: regras das entidades do core não podem ser afetadas pelo seu relacionamento com outras parte da aplicação (não podem ser alteradas por necessidades de alteração em outras camadas)
- Regras de negócio isoladas: utilizando casos de uso, as regras de negócio permanecem em uma camada intermediária entre entidades e adaptadores do mundo externo. Casos de uso somente são alteradas por necessidades reais do negócio.
- Adaptadores de interfaces: converte informações de-para camadas internas e externas (gateways e presenters), e orquestram chamadas através de controllers 
- Frameworks somente podem ser utilizados na camada mais externa de infraestrutura (frameworks e drivers, nesse diagrama)

<img src="./docs/diagrama-clean-arch.png" alt="Clean Architecture" style="width:60%;"/>

Uma explicação geral sobre o Fluxo de Execução da Aplicação pode ser encontrado nessa [documentação complementar](./docs/README-Fluxo-Macro-Aplicacao.md).

Nosso objetivo aqui não é entrar em detalhes de como a arquitetura funciona, mas sim como ela foi implementada no nosso projeto.

<img src="./docs/easyorder_arquitetura.jpg" alt="EasyOrder Architeture" style="width:80%;">

## Estrutura de Pastas
    .
    ├── docs                   # Documentos adicionais
    ├── src                    # Código Fonte
        ├── Infrastructure
        ├── Application
        ├── Core
        ├── app.ts             # ponto de entrada da aplicação
        ├── app.e2e.test.ts    # conjunto de testes fim-a-fim
    ├── manifesto_kubernetes   # manifestos kubernetes (yml)                              
    ├── Dockerfile             # configuracões docker                 
    ├── docker-compose.yml     # configurações docker-compose
    ├── package.json           # dependências Node/TS
    ├── tsconfig.json          # arquivo de configuração TS
    └── README.md              # este arquivo

## Detalhamento da estrutura do Código Fonte

#### /src/easyorder/Infrastructure/*
- Este diretório contém as implementações técnicas responsáveis por interagir com o ambiente externo. Ele lida com APIs externas, bancos de dados e outros serviços, implementando as interfaces de entrada e saída da aplicação.

#### /src/easyorder/Infrastructure/Api/*
- Implementa os endpoints expostos ao mundo externo, recebendo e processando chamadas HTTP. Esses adaptadores traduzem as solicitações recebidas e acionam os Controllers para direcionamento aos casos de uso adequados

#### /src/easyorder/Infrastructure/DB/*
- Implementa os adaptadores de persistência de dados (banco de dados) da aplicação. Implementa, entre outras, as funções de inserir, buscar e remover dados do banco implementado.

#### /src/easyorder/Infrastructure/Service/*
- Implenta a comunicação com serviços externos de mensageria e, neste caso, com o Serviço de Pagamentos

#### /src/easyorder/Application/*
- Contém a lógica de aplicação, onde são definidos os controladores, gateways e presenters. Esta camada orquestra (no caso dos controllers) e traduz/adapta (no caso dos gateways e presenters) o fluxo de dados entre a camada externa (infraestrutura) e o núcleo da aplicação (core).

#### /src/easyorder/Application/Controller/*
- Contém os controllers que lidam com as requisições de entrada dos endpoints (externos) ou de outros sistemas. São responsáveis por rotear as requisições e invocar os casos de uso corretos.

#### /src/easyorder/Application/Gateway/*
- Implementa as interfaces de Gateways, que lidam com a comunicação com serviços externos, seguindo as portas definidas no Core. 

#### /src/easyorder/Application/Presenter/*
- Responsável por formatar e apresentar os dados de resposta à camada de infraestrutura. Realiza a adaptação dos dados retornados pelos casos de uso para o formato adequado à interface de saída.

#### /src/easyorder/Core/*
- O núcleo da aplicação, onde reside a lógica de negócios. Esta camada é completamente independente das camadas externas e define as entidades, interfaces, tipos e casos de uso.

#### /src/easyorder/Core/Entity/*
- Contém as entidades de domínio, que representam os objetos principais da lógica de negócios, com suas regras e propriedades.
  - Também são utilizadas estruturas de ValueObject na respectiva pasta. Estas estruturas refletem o seu equivalente nos conceitos de DDD.

#### /src/easyorder/Core/Interfaces/*
Define as interfaces (portas) que descrevem como os adaptadores externos devem interagir com o Core, garantindo a separação entre a lógica de negócios e a infraestrutura.

#### /src/easyorder/Core/Types/*
Contém tipos e definições compartilhadas, que auxiliam no transporte de dados entre as diferentes camadas da aplicação.

#### /src/easyorder/Core/Usecase/*
Contém os casos de uso, responsáveis por executar as regras de negócios da aplicação. 
- As classes nos casos de uso devem ter nomes que representem ações, sempre em forma de verbos.
- O nome da classe reflete a ação a ser realizada.


## Padrões que utilizamos no nosso Desenvolvimento

### Nomenclaturas:
- No final do nome do arquivo, sempre coloque o que é o arquivo (Service, Usecase, Interface, Endpoints, etc.)
- Variáveis devem começar com minúsculo em camelCase
- Arquivos e classes devem começar com maiúsculo em camelCase
- Constantes e variáveis de ambiente devem ser escritas em MAIÚSCULO

### Uso do git:
- Sempre em português
- Todo commit deve ser bem descritivo do que foi feito
- Fazer o menor tamanho de commit possívels
- Sempre em Branches (ramos) e depois fazer o merge
- No mínimo 1 aprovador de Pull Request
- Utilizar os seguintes prefixos, quando possível com o número da atividade no projeto:

    - `Hotfix: {NúmeroTask} - {mensagem}` Para bugs
    - `Feature: {NúmeroTask} - {mensagem}` Para implementar funcionalidades
    - `Chore: {NúmeroTask} - {mensagem}` Para alterações que não impactem o uso (débito técnico)

- O nome da branch deve ser igualmente o prefixo + id da atividade. Ex:

    - `hotfix/99999`
    - `feature/99999`
    - `chore/99999`
