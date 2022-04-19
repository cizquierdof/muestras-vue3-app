restoreFromLocalStorage<template>
  <header class="bg-secondary text-light p-2 row">
    <h1 class="h3 card-title text-center">Muestra para auditorías web</h1>
  </header>
</template>
<script>
import { onMounted } from '@vue/runtime-core';
import { useSiteStore } from "../stores/site";
export default {
  setup() {
    //Carga de datos guardados en localstorage al montar la cabecera
    onMounted(()=>{
      store.restoreFromLocalStorage();
    });
    const store = useSiteStore();
        return {
      store,
    };
  },
};
</script>

