<template>
<div class="row">
  <div class="col card pt-3">
    <form class="bg-primary text-light p-2">
      <label class="form-label" for="nombre">Nombre:</label>
      <input
        class="form-control"
        type="text"
        id="nombre"
        v-model="nombre"
      />
      <label class="form-label" for="edad">Edad:</label>
      <input
        class="form-control"
        type="text"
        id="edad"
        v-model="edad"
      />
      <div class="mt-2">
        <button type="submit" class="btn btn-outline-light bg-success" @click.prevent="nuevo">
          Nuevo
        </button>
        <button
          class="btn btn-outline-light text-dark bg-warning disabled mx-1">
          Editar
        </button>
        <button class="btn btn-outline-light bg-danger disabled">
          Borrar todo
        </button>
      </div>
    </form>
  </div>
    <div class="card col ms-2 pt-3">
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

</div>

</template>

<script>
import { ref } from '@vue/reactivity';
import { usePersonasStore } from "../stores/personas";
export default {
  setup() {
    const store = usePersonasStore();
    //const personas = ref([])
    let nombre=ref('')
    let edad=ref('')



    function nuevo() {
      //store.nuevaPersona(val)
      console.log(nombre.value);
      store.personas.push({nombre:nombre.value,edad:edad.value})
    }

    function borrar(i){
      console.log('index',i);
    }

    return {
      store,
      //personas,
      nuevo,
      nombre,
      edad,
      borrar,
    }
  },
  computed:{
  }
};
</script>
