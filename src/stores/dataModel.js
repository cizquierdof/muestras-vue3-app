import { defineStore } from 'pinia';  

export const useDataModelStore = defineStore(
    'personas', {
    state: () => {
        return {
            personas: [
                { nombre: 'Juan', edad: '25' },
                { nombre: 'Maria', edad: '20' },
                { nombre: 'Carlos', edad: '43' },
            ]
            ,
            getters: {
                todos: (state) => state.personas
            },
            actions: {},
        }
    }
})
