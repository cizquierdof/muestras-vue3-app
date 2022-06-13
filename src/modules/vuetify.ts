
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { type UserModule } from '~/types'

// Setup 
export const install: UserModule = ({ app }) => {
  const vuetify = createVuetify()
  app.use(vuetify)
}
