<template>
  <header class="bg-secondary text-light p-2 row">
    <h1 class="h3 card-title text-center">Muestra para auditorías web</h1>
    <div id="nav">
      <router-link to="/" class="btn btn-primary">Home</router-link>
      <router-link to="/lanzadera" class="btn btn-primary"
        >Lanzadera</router-link
      >
      <router-link to="/about" class="btn btn-primary">About</router-link>
    </div>
  </header>
  <router-view />
</template>
<script>
import { onMounted, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import router from "../router";
import { useSiteStore } from "../stores/site";
export default {
  setup() {
    //watcher para actualizar el título de la página
    const route = useRoute();
    watch(
      () => route.meta.title,
      () => {
        document.title = route.meta.title;
      }
    );

    //Carga de datos guardados en localstorage al montar la cabecera
    onMounted(() => {
      store.restoreFromLocalStorage();
    });

    const store = useSiteStore();
    return {
      store,
    };
  },
};
</script>

