<template>
  <!-----------------------------------ENCABEZADO-------------------------->
  <div class="">
    <h2 class="text-center">
      <span class="text-light badge bg-warning mt-2 mx-auto">
        {{ store.siteName }}
      </span>
      <button
        class="btn rounded-pill btn-outline-danger ms-2 fw-bold"
        id="btn-reset"
        title="Limpiar todos los datos"
        @click="store.reset()"
      >
        Nuevo sitio
      </button>
    </h2>
    <form class="card form text-dark p-2">
      <label for="sitename" class="form-label fw-bold">Nombre</label>
      <input
        class="form-control-sm form-control"
        type="text"
        id="sitename"
        placeholder="Nombre del sitio"
        v-model="store.siteName"
      />
      <label for="sitedomain" class="col-form-label-sm col-form-label fw-bold"
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
    <p class="h6 text-center">
      <span
        class="badge rounded-pill me-3"
        v-bind:class="[store.hasHome ? 'bg-success' : 'bg-danger']"
      >
        HOME
      </span>
      <span
        class="badge rounded-pill me-3"
        v-bind:class="[store.hasDecAcc ? 'bg-success' : 'bg-danger']"
      >
        DEC. ACCES.
      </span>
      <span class="badge rounded-pill me-3 bg-secondary position-relative">
        URLS
        <span
          class="position-absolute top-0 start-100 translate-middle badge me-3 mt-2 rounded-pill"
          v-bind:class="[store.numUrl < 25 ? 'bg-success' : 'bg-danger']"
        >
          {{ store.numUrl }}
        </span>
      </span>
      <span class="badge rounded-pill bg-secondary position-relative ms-2 mt-2">
        Aleatorias
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill"
          v-bind:class="[
            store.numAleatory >= store.numUrl / 10 ? 'bg-success' : 'bg-danger',
          ]"
        >
          {{ store.numAleatory }}
        </span>
      </span>
    </p>
    <!-----------------------------SAVE FUNCTIONS-------------------------------------------->
    <div class="container">
      <div class="row">
        <button
          class="col btn btn-outline-warning me-1"
          @click="store.saveJson()"
        >
          Guarda JSON
        </button>
        <button
          class="col btn btn-outline-warning ms-1"
          @click="store.saveBatch()"
        >
          Guarda Batch
        </button>
        <button
          class="col btn btn-outline-warning ms-1"
          @click="store.openUrlList()"
        >
          Despliega
        </button>
      </div>
      <div
        class="row mt-2 rounded border border-warning"
        @drop.prevent
        @dragover.prevent
      >
        <div class="col-8">
          <h3 class="h6 text-light text-center mb-2">
            Recupera sitio guardado
          </h3>
        </div>
        <div class="col form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            name=""
            id="enable-load-switch"
          />
          <label class="form-check-label text-light" for="enable-load-switch">
            habilitar
          </label>
        </div>

        <div class="bg-warning">
          <input
            class="form-control-xs text-dark"
            type="file"
            id="fileInput"
            @change="loadJson($event)"
          />
        </div>
        <div class="text-light text-center p-3" @drop="dropFile">
          O arrasta un JSON válido aquí
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useSiteStore } from "../stores/site";
export default {
  setup() {
    const store = useSiteStore();

    //Carga un sitio desde un json ya creado
    function dropFile(e) {
      const cargar = confirm("¿Cargar otro sitio?");
      if (!cargar) return;
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        const url_list = JSON.parse(reader.result);
        //previene y corrige versión antigua de json
        if (!url_list[0].siteWebPages[0].condiciones) {
          url_list[0].siteWebPages.map((e) => {
            e.condiciones = {
              r5_2: false,
              r5_3: false,
              r5_4: false,
              r6: false,
              r7: false,
              herramientas_autor: false,
              documentacion: false,
              servicios_apoyo: false,
            };
            e.clase = (e.webPageType === "DOWNLOADABLE_DOC") ? "DOCUMENTO_NO_WEB" : "PAGINA_WEB";
          });
        }
        store.restorFromDisk(url_list);
      };
    }

    function loadJson(e) {
      const cargar = confirm(
        "Se cargará un sitio guardado y se borrarán los datos actuales"
      );
      if (!cargar) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        const url_list = JSON.parse(reader.result);
        //previene y corrige versión antigua de json
        if (!url_list[0].siteWebPages[0].condiciones) {
          url_list[0].siteWebPages.map((e) => {
            e.condiciones = {
              r5_2: false,
              r5_3: false,
              r5_4: false,
              r6: false,
              r7: false,
              herramientas_autor: false,
              documentacion: false,
              servicios_apoyo: false,
            };
            e.clase = (e.webPageType === "DOWNLOADABLE_DOC") ? "DOCUMENTO_NO_WEB" : "PAGINA_WEB";
          });
        }

        store.restorFromDisk(url_list);
      };
    }

    return {
      store,
      loadJson,
      dropFile,
    };
  },
};
</script>

<style scoped></style>
