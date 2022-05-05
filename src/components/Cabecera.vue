<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark m-2 rounded">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Auditorías web</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Despliega el menú"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/" class="nav-link" aria-current="page"
              >Inicio</router-link
            >
            <router-link to="/lanzadera" class="nav-link"
              >Lanzadera</router-link
            >
            <router-link to="/about" class="nav-link">About</router-link>
            <a
              class="nav-link disabled"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              >Disabled</a
            >
          </div>
        </div>
      </div>
    </nav>
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

