# composables

## 1. Instalação
```md
npm i @bildvitta/composables
```

## API
Composables de utilidades para serem utilizadas diretamente nos componentes/composables/js.

### useView
Composable para utilizar nos componentes de view, estes componentes normalmente são componentes que englobam a página, por exemplo se estiver utilizando com a biblioteca `asteroid`: [QasFormView, QasListView, QasSingleView].

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

```js
// composables/use-can.js
import store from 'algum-caminho-pra-store'
import { useCanWrapper } from '@bildvitta/composables'

export default function useCan () {
  return useCanWrapper({ store })
}

// utilizamos o useCan da própria aplicação e não do @bildvitta/composables/lib/wrappers
import useCan from 'composables/use-can'

const { can, canAny } = useCan()

can('users.list') // true | false,
can('companies.list', 'companies') // true | false

canAny(['users.list', 'users.show']) // true | false
canAny(['companies.list', 'companies.delete'], 'companies') // true | false
```