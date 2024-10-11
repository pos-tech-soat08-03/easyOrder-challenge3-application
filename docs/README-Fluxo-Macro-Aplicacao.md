
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
