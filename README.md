# FC Monolito

Projeto exemplo FullCycle com arquitetura modular em Node.js + TypeScript.

## Estrutura de módulos

- `src/modules/client-adm`
  - Gerencia clientes (adicionar, buscar, etc.)
  - Domain: `client.entity.ts`
  - Usecase: `add-client`, `find-client`
  - Facade: `client-adm.facade.ts`
  - Gateway/Repository: acesso à persistência (sqlite + Sequelize)

- `src/modules/product-adm`
  - Gerencia produtos (adição, consulta de estoque)
  - Domain: `product.entity.ts`
  - Usecase: `add-product`, `check-stock`
  - Facade: `product-adm.facade.ts`
  - Gateway/Repository: modelo e repositório de produto

- `src/modules/store-catalog`
  - Catálogo de produtos (consultas e listagens)
  - Domain: `product.entity.ts`
  - Usecase: `find-all-products`, ...
  - Facade: `store-catalog.facade.ts`
  - Gateway/Repository: busca e exposição de produtos

- `src/modules/payment`
  - Processamento de pagamento e transação
  - Domain: `transaction.ts`
  - Usecase: `process-payment`
  - Facade: `payment.facade.ts`
  - Repository: `transaction.repository.ts`

- `src/modules/invoice`
  - Emissão e busca de faturas
  - Domain: `invoice.entity.ts`, `invoice-items.entity.ts`
  - Usecase: `generate-invoice`, `find-invoice`
  - Facade: `invoice.facade.ts`
  - Repository: `invoice.repository.ts`, `invoice-item.repository.ts`

- `src/modules/@shared`
  - Código comum entre módulos
  - `domain/entity` / `value-object`
  - `usecase/use-case.interface.ts`

## Como executar

1. Instale dependências:

```bash
npm install
```

2. Rodar compilação TypeScript (checagem estática):

```bash
npm run tsc
```

3. Rodar testes unitários (inclui `tsc` + jest):

```bash
npm test
```

## Observações

- O projeto utiliza SQLite via Sequelize. Verifique configuração de ambiente (ex: `.env`) caso haja integrações de banco.
- Os testes estão em `src/modules/**/repository/*.spec.ts` e `src/modules/**/facade/*.spec.ts`.
