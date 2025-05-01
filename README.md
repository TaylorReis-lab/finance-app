# 💰 Finexa App - Gestão Financeira Pessoal

![Dashboard Preview](https://example.com/path-to-your-demo-image.gif)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript Version](https://img.shields.io/badge/TypeScript-4.9.5-blue)](https://www.typescriptlang.org/)

Aplicativo completo para gestão financeira pessoal com dashboard interativo, relatórios e importação de dados.

## ✨ Funcionalidades

- 📊 **Dashboard Financeiro** com visualização em tempo real
- 💳 **Gestão de Transações** (CRUD completo)
- 📥 **Importação de planilhas** (Excel/CSV)
- 📈 **Relatórios personalizáveis** com filtros avançados
- 🏷️ **Categorização automática** de gastos
- 🔄 **Sincronização entre dispositivos**

## 🚀 Tecnologias

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
</p>

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/finance-app.git
```

2. Instale as dependências:

```bash
cd finance-app
npm install
```
3. Configure o ambiente:
```bash
cp .env.example .env
```
4. Inicie o servidor:
```bash
npm start
ou
yarn start
```
🏗️ Estrutura do Projeto

```mermaid
graph TD
    A[finance-app] --> B[public]
    A --> C[src]
    A --> D[.github]
    
    B --> B1[index.html]
    B --> B2[favicon.ico]
    B --> B3[assets]
    
    D --> D1[workflows]
    D --> D2[ISSUE_TEMPLATE]
    
    C --> C1[assets]
    C --> C2[components]
    C --> C3[hooks]
    C --> C4[pages]
    C --> C5[services]
    C --> C6[styles]
    C --> C7[types]
    C --> C8[utils]
    
    C1 --> C1A[icons]
    C1 --> C1B[images]
    
    C2 --> C2A[charts]
    C2 --> C2B[forms]
    C2 --> C2C[ui]
    C2 --> C2D[shared]
    
    C2A --> C2A1[FinancialOverviewCards.tsx]
    C2A --> C2A2[MonthlySummaryChart.tsx]
    C2A --> C2A3[ChartStyles.ts]
    
    C2B --> C2B1[TransactionForm.tsx]
    C2B --> C2B2[ImportForm.tsx]
    C2B --> C2B3[FormStyles.module.css]
    
    C3 --> C3A[useTransactions.ts]
    C3 --> C3B[useChartData.ts]
    
    C4 --> C4A[Dashboard]
    C4 --> C4B[Transactions]
    C4 --> C4C[Reports]
    
    C4A --> C4A1[index.tsx]
    C4A --> C4A2[Dashboard.module.css]
    
    C5 --> C5A[api.ts]
    C5 --> C5B[transactionService.ts]
    
    C6 --> C6A[theme.ts]
    C6 --> C6B[global.css]
    
    C7 --> C7A[transaction.d.ts]
    C7 --> C7B[api.d.ts]
    
    C8 --> C8A[formatters.ts]
    C8 --> C8B[validators.ts]
```

🌐 API Integration
- Endpoints consumidos:

- GET /transactions - Lista transações

- POST /transactions - Cria nova transação

- POST /transactions/import - Importa em lote

📦 Dependências Principais
```bash
{
  "dependencies": {
    "@mui/material": "^5.14.0",
    "@mui/x-date-pickers": "^7.0.0",
    "react": "^18.2.0",
    "react-hook-form": "^7.45.0",
    "date-fns": "^2.30.0"
  }
}
```
🐛 Solução de Problemas Comuns
Erro: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```
🤝 Como Contribuir
Faça um fork do projeto

Crie uma branch para sua feature (git checkout -b feature/awesome-feature)

Faça commit das suas alterações (git commit -m 'feat: Add awesome feature')

Faça push para a branch (git push origin feature/awesome-feature)

Abra um Pull Request

📄 Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

<p align="center"> Desenvolvido com ❤️ por <a href="https://github.com/TaylorReis-lab">Taylor Reis</a> </p> ```
Dicas para personalização:
Adicione screenshots reais:

Crie uma pasta demo/ no repositório

Adicione imagens do seu app em funcionamento

Badges personalizadas:

Adicione badges de build/tests do GitHub Actions

Inclua cobertura de código

GIF de demonstração:

Grave um screencast usando ferramentas como ScreenToGif

Mostre o fluxo principal do aplicativo

Seção de roadmap (opcional):
```bash
## 🗺️ Roadmap

- [x] CRUD de transações
- [x] Dashboard básico
- [ ] Integração com bancos (Open Banking)
- [ ] Aplicativo mobile (React Native)
```