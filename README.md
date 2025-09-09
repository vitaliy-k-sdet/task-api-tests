# Some Company RFQ Trades API Automation
Test repo for test automation assignment task

Link: https://github.com/vitaliy-k-sdet/task-api-tests

## Prerequisites
- Node.js [Latest LTS version](https://nodejs.org/en/download)
- TypeScript installed (auto-installed via npm)
- Playwright and dependencies installed (auto-installed via npm)
- rfq-key-vault.ts (secrets key:value pairs to run the project) TO-DO: CI GH Actions decodes it from base64 encoded var.SECRETS
- baseUrl read from secrets.BASE_URL


## Setup
```
```bash
npm install
```

## API Docs

Navigate to see how [API Auth is handled](https://www.google.com/)

Navigate for [Trading Strategies API endpoints](https://www.google.com/)

## Run Tests
In Bash terminal, execute script:

```
npm run test:api
```

## CI

Tests trigger automatically onPush after pushing/merging to remote of [main, 'ticket-/**']
Also you can start it manually.

## View test report

See console output of Upload Playwright report section in GH Action: 
e.g. Artifact download URL: https://github.com/vitaliy-k-sdet/task-api-tests/actions/runs/17535302888/artifacts/3948835009
<img width="1095" height="477" alt="image" src="https://github.com/user-attachments/assets/4e16d6ab-97e8-4b76-a0d0-11063e3045f7" />

