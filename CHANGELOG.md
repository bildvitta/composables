# Changelog
Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.
O formato é baseado em Keep a Changelog, e este projeto adere ao Semantic Versioning.

## 1.0.0-beta.12 - 10-04-2024
### Corrigido
- publicado versão do dist (1.0.0-beta.11)

## 1.0.0-beta.11 - 10-04-2024
### Modificado
- `canByPermission`: modificado regra onde não adicionava permissão caso não encontrasse no `companyPermissions`, agora é sempre mergeado com `currentMainCompany`, fazendo com que se tem a permissão no currentMainCompany, ela seja enviada para todos company, mesmo que seja um company que não exista.

## 1.0.0-beta.10 - 28-01-2024
### Adicionado
`useAppCanWrapper`: adicionado opção `action` nos métodos `can` e `canByPermission` para receber `string` ou `string[]` (array de string), anteriormente só recebia string, agora pode passar uma lista de ações.

## 1.0.0-beta.9 - 05-12-2024
### Adicionado
- `useView`: adicionado nova função `reset` para resetar todos valores do view.
- `useAppCanWrapper`: adicionado novo wrapper de permissionamento.
- Adicionado teste unitário "vitest" ao projeto e adicionado testes no useAppCanWrapper.

### Modificado
- Modificado "vue" como "devDependencies".
- Adicionado "vue" como "peerDependencies".