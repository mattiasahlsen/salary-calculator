import { createApp } from 'vue'
import App from './App.vue'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import './styles/main.scss'
import 'tailwindcss/dist/base.css'
import 'tailwindcss/dist/components.css'
import 'tailwindcss/dist/utilities.css'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

const app = createApp(App)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  console.log(componentName, componentConfig.default || componentConfig)
  app.component(componentName, componentConfig.default || componentConfig)
})


app.mount('#app')
