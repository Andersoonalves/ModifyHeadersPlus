# Como Publicar a Extensão Modify Headers Plus

## Chrome Web Store

### 1. Criar conta de desenvolvedor
- Acesse: https://chrome.google.com/webstore/devconsole
- Pague a taxa única de $5 USD

### 2. Preparar o pacote
```bash
cd /Users/anderson/Documents/projetos/SimpleModifyHeadersNGX
zip -r modify-headers-andin.zip . -x "*.git*" -x "*.idea*" -x "package/*" -x "tests/*" -x "*.md"
```

### 3. Enviar para a Chrome Web Store
- Acesse o Developer Console
- Clique em "New Item"
- Faça upload do ZIP
- Preencha: nome, descrição, screenshots (1280x800), ícone (128x128)
- Selecione categoria: "Developer Tools"
- Defina visibilidade: Public ou Unlisted
- Clique em "Publish"

### 4. Aprovação
Geralmente leva 1-3 dias úteis

---

## Firefox Add-ons (AMO)

### 1. Criar conta
- Acesse: https://addons.mozilla.org/developers/
- Conta gratuita

### 2. Preparar o pacote
```bash
cd /Users/anderson/Documents/projetos/SimpleModifyHeadersNGX

# Para Chrome/Edge (MV3)
zip -r modify-headers-andin.zip . -x "*.git*" -x "*.idea*" -x "package/*" -x "tests/*" -x "*.md"

# Para Firefox (MV2)
cp manifest.json manifest-chrome.json
cp manifestV2.json manifest.json
zip -r modify-headers-andin-firefox.zip . -x "*.git*" -x "*.idea*" -x "package/*" -x "tests/*" -x "*.md" -x "manifest-chrome.json"
cp manifest-chrome.json manifest.json
rm manifest-chrome.json
```

### 3. Enviar para AMO
- Acesse o Developer Hub
- Clique em "Submit New Add-on"
- Faça upload do ZIP
- Preencha: nome, descrição, screenshots, categorias
- Clique em "Submit Version"

### 4. Revisão
Firefox faz revisão manual, pode levar 1-4 semanas

---

## Microsoft Edge Add-ons

### 1. Criar conta
- Acesse: https://partner.microsoft.com/dashboard/microsoftedge
- Conta gratuita (pode usar conta Microsoft pessoal)

### 2. Preparar o pacote
- Use o mesmo ZIP do Chrome (MV3 é compatível)

### 3. Enviar
- Acesse o Partner Center
- Clique em "Submit new extension"
- Faça upload do ZIP
- Preencha as informações e submeta

### 4. Aprovação
Geralmente leva 3-7 dias úteis

---

## Pré-requisitos

| Item | Descrição |
|------|-----------|
| **Ícone 128x128** | Necessário para Chrome Web Store e Edge |
| **Screenshots** | Mínimo 1 (Chrome) ou 3 (Firefox), resolução 1280x800 |
| **Descrição** | Texto detalhado sobre a extensão e suas funcionalidades |
| **Política de privacidade** | Obrigatório para Chrome e Edge |
| **Suporte** | Email ou link para issues do GitHub |

---

## Diferenças entre Manifestos

| Navegador | Manifest | API de Headers |
|-----------|----------|----------------|
| Chrome | MV3 (`manifest.json`) | `declarativeNetRequest` |
| Edge | MV3 (`manifest.json`) | `declarativeNetRequest` |
| Firefox | MV2 (`manifestV2.json`) | `webRequest` + `webRequestBlocking` |

Você precisa publicar separadamente para cada navegador ou usar ferramentas como [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) para automatizar.

---

## Links Úteis

- Chrome Web Store Developer Console: https://chrome.google.com/webstore/devconsole
- Firefox Add-ons Developer Hub: https://addons.mozilla.org/developers/
- Microsoft Edge Partner Center: https://partner.microsoft.com/dashboard/microsoftedge
- web-ext (ferramenta CLI para Firefox): https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/
- Documentação Chrome Extensions: https://developer.chrome.com/docs/extensions/
- Documentação Firefox Add-ons: https://extensionworkshop.com/
