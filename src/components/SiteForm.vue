<template>
  <div>
    <h2>
      Sitio actual:
      <span class="badge bg-warning">{{ store.siteName }}</span>
    </h2>
    <form class="card form text-dark p-2">
      <label for="sitename" class="form-label">Nombre</label>
      <input
        class="form-control-sm form-control"
        type="text"
        id="sitename"
        placeholder="Nombre del sitio"
        v-model="store.siteName"
      />
      <label for="sitedomain" class="col-form-label-sm col-form-label"
        >Dominio</label
      >
      <input
        class="form-control-sm form-control"
        type="text"
        id="sitedomain"
        placeholder="Dominio del sitio"
        v-model="store.siteDomain"
      />
    </form>
  </div>
  <!---------------BADGES------------------------------->
  <div class="mt-4 mb-3 h3">
    <h3 class="text-light text-center mb-3">Status</h3>
    <p class="text-center">
    <span class="badge me-3" v-bind:class="[store.hasHome ? 'bg-success' : 'bg-danger']">
      HOME
    </span>
    <span class="badge me-3" v-bind:class="[store.hasDecAcc ? 'bg-success' : 'bg-danger']">
      DEC. ACCES.
    </span>
    <span class="badge me-3 bg-secondary position-relative">
      URLS
      <span
        class="
          position-absolute
          top-0
          start-100
          translate-middle
          badge me-3
          rounded-pill
        "
        v-bind:class="[store.numUrl < 25 ? 'bg-success' : 'bg-danger']"
      >
        {{ store.numUrl }}
      </span>
    </span>
    <span class="badge bg-secondary position-relative ms-2">
      Aleatorias
      <span
        class="
          position-absolute
          top-0
          start-100
          translate-middle
          badge
          rounded-pill
        "
        v-bind:class="[store.numAleatory >= store.numUrl / 10 ? 'bg-success' : 'bg-danger']"
      >
        {{ store.numAleatory }}
      </span>
    </span>

    </p>
  </div>
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

<style lang="scss" scoped>
</style>