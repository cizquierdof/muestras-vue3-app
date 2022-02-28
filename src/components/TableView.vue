<template>
  <div class="card ms-2 pt-3">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(persona, index) in store.personas">
          <td>{{ index }}</td>
          <td>{{ persona.nombre }}</td>
          <td>{{ persona.edad }}</td>
          <td>
            <button class="btn btn-danger" @click="borrar(index)"><span class="fa fa-trash"></span></button>
            <button class="btn btn-warning ms-1"><span class="fa fa-edit"></span></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { usePersonasStore } from "../stores/personas";
export default {
  setup() {
    const store = usePersonasStore();
    
    const borrar=(i)=> store.borraPersona(i);

    return {
      store,
      borrar,
    };
  },
};
</script>
