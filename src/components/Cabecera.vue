<template>
  <header class="bg-secondary text-light p-3 row">
    <h1 class="card-title text-center">Muestra para auditorías web</h1>
  </header>
</template>
<script>
import { useSiteStore } from "../stores/site";
export default {
  setup() {
    const store = useSiteStore();
    return {
      store,
    };
  },
};
</script>

