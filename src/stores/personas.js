import { defineStore } from "pinia";

export const usePersonasStore = defineStore({
  id: "personas",
  state: () => ({
    personas: [
      { nombre: "Juan", edad: "25" },
      { nombre: "Maria", edad: "20" },
      { nombre: "Carlos", edad: "43" },
    ],
  }),
  getters: {},
  actions: {
    nuevaPersona(val) {
      this.personas.push(val);
    },
    borraPersona(index) {
      this.personas.splice(index, 1);
    },
    modificaPersona(i, persona) {
      this.personas[i] = persona;
    },
  },
});
