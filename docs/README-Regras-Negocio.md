
## Jornada do Cliente - Macro

```mermaid
journey
    title Pedido
    section Criação Pedido
      Novo Pedido: 9 : Usuário
      Adiciona combo ao pedido: 9 : Usuário
      Fecha Pedido: 9 : Usuário
      Checkout: 9 : Usuário
    section Cozinha
      Recebe Pedido: 9 : Cozinheiro
      Inicia Preparação: 9 : Cozinheiro
      Finaliza Preparação: 9 : Cozinheiro
      Avisa Usuário: 9 : Painel
    section Entrega
      Entrega Pedido: 9 : Atendente
      Finaliza Pedido: 9 : Atendente

```

# Fluxo Macro de Interação

```mermaid
sequenceDiagram
    Cliente ->> Toten: Solicita um novo pedido
    Toten ->> API: Solicita a criação de um novo pedido
    API ->> Database: Grava um novo pedido...

```


# Regras de Negócio

RN1. Um pedido pode ser criado sem um cliente identificado (id do cliente)

RN2. Para fechar um pedido, deve existir ao menos um combo vinculado

RN3. Quando adicionar um produto ao combo, devemos verificar se o tipo do produto informado corresponde ao tipo de produto solicitando a inserção no combo

RN4. Só podemos adicionar ou remover combos ao pedido se este estiver no status EM_ABERTO

RN5. O combo deve ter ao menos um produto informado
