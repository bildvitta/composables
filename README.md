# @bildvitta/composables

## Instalação
```md
npm i @bildvitta/composables
```

## API
Composables de utilidades para serem utilizadas diretamente nos componentes/composables/js.

### useView
Composable para utilizar nos componentes de view, estes componentes normalmente são componentes que englobam a página, por exemplo se estiver utilizando com a biblioteca `asteroid`: [QasFormView, QasListView, QasSingleView].

[Tipagem](./src/composables/view/use-view.type.ts)

**Exemplos:**
```html
<template>
  <app-list-view-component
  v-model:results="viewState.results"
  v-model:fields="viewState.fields"
  v-model:results="viewState.metadata"
  v-model:results="viewState.fetching"
  />
</template>

<script setup>
const { viewState } = useView({ mode: 'list' })
viewState.value.fetching // true | false
</script>
```

### useCanWrapper
Composable base para controle de permissões de tela. Os wrappers devem ser sempre utilizados como parte de outros composables, e não devem ser chamados diretamente nos seus componentes, composables ou JavaScript.

[Tipagem](./src/composables/can-wrapper/use-can-wrapper.type.ts)

**Exemplos:**
```js
// composables/use-can.js
import store from 'algum-caminho-pra-store'
import { useCanWrapper } from '@bildvitta/composables'

export default function useCan () {
  return useCanWrapper({ store })
}

// utilizamos o useCan da própria aplicação e não do @bildvitta/composables
import useCan from 'composables/use-can'

const { can, canAny } = useCan()

can('users.list') // true | false,
can('companies.list', 'companies') // true | false

canAny(['users.list', 'users.show']) // true | false
canAny(['companies.list', 'companies.delete'], 'companies') // true | false
```

### useAppCanWrapper
Composable base para controle de permissões baseado em empresas. Os wrappers devem ser sempre utilizados como parte de outros composables, e não devem ser chamados diretamente nos seus componentes, composables ou JavaScript.

[Tipagem](./src/composables/app-can-wrapper/use-app-can-wrapper.type.ts)

**Exemplos:**
```js
// composables/use-app-can.js
import store from 'algum-caminho-pra-store'
import { useAppCanWrapper } from '@bildvitta/composables'

export default function useAppCan () {
  return useAppCanWrapper({ store })
}

// utilizamos o useAppCan da própria aplicação e não do @bildvitta/composables
import useAppCan from 'composables/use-app-can'

const {
  can,
  canList,
  canCreate,
  canByPermission,
  canEdit,
  canDelete,
  canShow
} = useAppCan({ store })

can('users', { action: 'dashboard' })
can({ users: { action: 'dashboard' } })

canList('users')
canList(['users', 'approvals'])

canCreate('users')
canCreate(['users', 'approvals'])

canByPermission('users', { company: 'company1', action: 'dashboard' })
canByPermission({ users: { company: ['company1', 'company2'], action: 'dashboard' } })

canEdit('users', { company: ['company1', 'company2'] })
canEdit({ users: { company: 'company1' } })

canDelete('users', { company: 'company1' })
canDelete({ users: { company: ['company1', 'company2'] } })

canShow('users', { company: 'company1' })
canShow({ users: { company: ['company1', 'company2'] } })
```
