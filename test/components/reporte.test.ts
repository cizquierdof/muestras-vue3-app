import { describe, expect, it , vi} from 'vitest'
import {  mount} from '@vue/test-utils'
import {createVuetify} from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import loginComponent from '/src/components/reporte.vue'
vi.mock('vue-i18n',
  ()=> ({ 
    useI18n : ()=> ({  
      t : (key : String) => {return key}
    })
    
  }),
)


describe('reporte test', () => {
    const vuetify = createVuetify({components, directives})

    it.only('renders properly', async() => {
        const wrapper = mount(loginComponent, {
            global: {
                plugins: [vuetify],
            },
        })
      expect (true).toBeFalsy
        
        // const normalForm = wrapper.get("#normalform")
        // await normalForm.trigger("submit")
        
        
        
        // // await wrapper.find('form').trigger('submit')
        // expect(wrapper.emitted('submit')).toStrictEqual({        
        //   subscribe: true,
        //   interval: 'monthly'
        // })
    })
})



  