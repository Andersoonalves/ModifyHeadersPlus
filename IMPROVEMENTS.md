# Melhorias - Modify Headers ANDIN

## Funcionalidades

| Prioridade | Melhoria | Descrição |
|------------|----------|-----------|
| **Alta** | Regex nos filtros | Suporte a expressões regulares no URL Filter |
| **Alta** | Variáveis em headers | Suporte a variáveis como `$timestamp`, `$random`, `$uuid` nos valores |
| **Alta** | Perfis/Presets | Salvar e alternar entre conjuntos de regras diferentes |
| **Média** | Condicionais | Aplicar regra apenas se header X existir ou tiver valor Y |
| **Média** | Delay/Throttle | Atrasar requisições para testes de performance |
| **Média** | Logs visuais | Painel com histórico de modificações feitas em tempo real |
| **Média** | Atalhos de teclado | Keyboard shortcuts para ativar/desativar rapidamente |
| **Baixa** | Temas | Dark mode / Light mode |
| **Baixa** | Notificações | Toast notifications para feedback de ações |
| **Baixa** | Contador de regras ativas | Badge no ícone mostrando quantas regras estão ativas |

---

## Técnico

| Prioridade | Melhoria | Descrição |
|------------|----------|-----------|
| **Alta** | Testes automatizados | Jasmine já está no projeto, expandir cobertura |
| **Alta** | Validação de URL patterns | Validar patterns antes de salvar |
| **Média** | Backup automático | Auto-export para localStorage como backup |
| **Média** | Undo/Redo | Desfazer/refazer últimas alterações |
| **Média** | Webpack/Vite | Build system para minificar e otimizar |
| **Baixa** | TypeScript | Type safety para reduzir bugs |
| **Baixa** | Web Components | Isolar componentes da UI |

---

## UX (Experiência do Usuário)

| Prioridade | Melhoria | Descrição |
|------------|----------|-----------|
| **Alta** | Confirmação antes de deletar | Modal de confirmação ao deletar regras/grupos |
| **Alta** | Duplicar regra | Botão para clonar uma regra existente |
| **Média** | Arrastar regras entre grupos via sidebar | Já funciona, mas poderia ter indicador visual melhor |
| **Média** | Colapsar/expandir seções | Permitir fechar seções de grupos |
| **Média** | Ordenar regras | Botões para ordenar por nome, status, grupo |
| **Baixa** | Tutorial/onboarding | Primeira vez mostrando como usar |
| **Baixa** | Help tooltips | Dicas ao passar o mouse nos campos |

---

## Detalhamento das Melhorias

### Regex nos filtros
Atualmente o URL Filter usa apenas substring matching. Implementar suporte a expressões regulares permitiria filtros mais complexos como:
- `^https://api\.example\.com/v[0-9]+/.*`
- `.*\.(json|xml)$`

### Variáveis em headers
Suportar variáveis dinâmicas nos valores dos headers:
- `$timestamp` - Timestamp atual em milissegundos
- `$date` - Data atual em formato ISO
- `$random` - Número aleatório
- `$uuid` - UUID v4
- `$tabId` - ID da aba atual
- `$url` - URL da requisição

### Perfis/Presets
Permitir criar e alternar entre conjuntos de regras:
- "Desenvolvimento" - regras para ambiente local
- "Staging" - regras para ambiente de staging
- "Produção" - regras para ambiente de produção
- Botões para salvar/carregar perfil

### Logs visuais
Painel lateral ou nova aba mostrando:
- Requisições interceptadas em tempo real
- Headers modificados (antes/depois)
- Filtros aplicados
- Possibilidade de limpar logs

### Atalhos de teclado
Configurar atalhos no `manifest.json`:
- `Ctrl+Shift+S` - Start/Stop
- `Ctrl+Shift+E` - Enable/Disable regra selecionada
- `Ctrl+Shift+L` - Limpar logs

### Dark Mode
Adicionar tema escuro:
- Detectar preferência do sistema (`prefers-color-scheme`)
- Toggle manual nas configurações
- Salvar preferência no storage

### Confirmação antes de deletar
Modal de confirmação ao:
- Deletar regra
- Deletar grupo
- Importar configuração (substituir existente)

### Duplicar regra
Botão em cada linha que:
- Cria uma cópia da regra
- Adiciona "(copy)" ao comentário
- Insere abaixo da regra original

### Validação de URL patterns
Antes de salvar, validar:
- Sintaxe do match pattern
- URLs do grupo
- Alertar sobre patterns inválidos

### Backup automático
- Auto-export para localStorage a cada 5 minutos
- Manter últimas 5 versões
- Botão para restaurar backup

### Undo/Redo
- Manter histórico de alterações (últimas 20)
- `Ctrl+Z` para desfazer
- `Ctrl+Y` para refazer

---

## Roadmap Sugerido

### v2.1.0
- [ ] Confirmação antes de deletar
- [ ] Duplicar regra
- [ ] Validação de URL patterns
- [ ] Contador de regras ativas no badge

### v2.2.0
- [ ] Regex nos filtros
- [ ] Variáveis em headers
- [ ] Atalhos de teclado

### v2.3.0
- [ ] Perfis/Presets
- [ ] Backup automático
- [ ] Undo/Redo

### v3.0.0
- [ ] Logs visuais
- [ ] Dark mode
- [ ] Tutorial/onboarding
- [ ] Build system (Vite/Webpack)
