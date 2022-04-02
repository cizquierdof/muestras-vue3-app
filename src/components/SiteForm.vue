<template>
<!-----------------------------------ENCABEZADO-------------------------->
  <div class="">
    <h2 class="text-center">
    <span class="text-light badge bg-warning mt-2 mx-auto">
      {{ store.siteName }}
    </span><button class="btn btn-danger ms-2" @click="store.reset()">Reset</button>
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
  <div class="mt-2">
    <h3 class="h5 text-light text-center mb-2">Status</h3>
    <p class="h5 text-center">
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
          mt-2
          rounded-pill
        "
        v-bind:class="[store.numUrl < 25 ? 'bg-success' : 'bg-danger']"
      >
        {{ store.numUrl }}
      </span>
    </span>
    <span class="badge bg-secondary position-relative ms-2 mt-2">
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
    <!-----------------------------SAVE FUNCTIONS-------------------------------------------->
    <div class="rounded">
      <button class="btn btn-outline-warning me-2" @click="store.saveJson()">Guarda JSON</button>
      <button class="btn btn-outline-warning me-2" @click="store.saveBatch()">Guarda Batch</button>
      <button class="btn btn-outline-warning me-2" @click="">Cargar un siitio</button>
    </div>
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