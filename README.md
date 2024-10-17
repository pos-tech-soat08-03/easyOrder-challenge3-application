# easyOrder: Aplicação Tech Challenge POS TECH SOAT8 FIAP - Grupo 03

## ✒️ Grupo / Autores

O Grupo que implementou a solução (Grupo 03), é composto pelos seguintes integrantes (nome, email, RM, discord):
- Bruno Moreira Reis: brbrno@hotmail.com, RM358025, @bruno_m_reis
- Fernando Gurkievicz, fergkz@gmail.com, RM357072, @goorkz
- Marcio Saragiotto, marcio.saragiotto@gmail.com, RM357349, @msgiotto
- Matias Correa Franco de Faria, devmatiascff@gmail.com, RM357411, @matiasf8321
- Rafael da Silva Andrade, rafaandrade_@outlook.com, RM357010, @andrade_rafael

&nbsp;
## Projeto - Descrição e Objetivos - Fase 3

### EM CONSTRUCAO :warning:
:construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction:

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

### ✅ Verificar se está funcionando

Neste ponto, o serviço deve estar ativo, para verificar se está funcionando, basta acessar a url [http://localhost:30000/](http://localhost:30000/). 

O endpoint [http://localhost:30000/health](http://localhost:30000/health) também deve indicar que o servidor está rodando corretamente, com todos os serviços ativos.

_Caso esteja acessando a aplicação de outro host, favor modificar a URL para o endereço correto do seu host._  

&nbsp;
### 💡 Acesso à Documentação do Swagger

Para acessar a documentação do Swagger, acessar a url [http://localhost:30000/doc/](http://localhost:30000/doc/) - você poderá navegar e testar todos os endpoints, com exemplos disponíveis.

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
