<template>
  <div class="text-light">
    <h2>Datos de la página</h2>
    <form
      @submit.prevent
      class="card text-light bg-primary mb-2"
      autocomplete="on"
    >
      <label class="form-label" for="inurl">URL</label>
      <input
        class="form-control"
        id="inurl"
        type="text"
        placeholder="URL"
        v-model="store.inUrl"
        onclick="this.select()"
        required
      />
      <div class="row">
        <div class="col">
          <label class="form-label" for="intype">Tipo de página</label>
          <select
            class="form-select"
            id="intype"
            v-model="store.inType"
            required
          >
            <option disabled value="">Tipo de página</option>
            <option v-for="tipo in store.pageTypes" v-bind:value="tipo.value">
              {{ tipo.text }}
            </option>
          </select>
        </div>
        <div class="col">
          <label class="form-label" for="classtype">Clase</label>
          <input
            class="form-control"
            type="text"
            disabled
            id="classtype"
            v-model="store.Clase"
            
          />
        </div>
      </div>
      <label class="form-label" for="inshortname">Nombre corto</label>
      <input
        class="form-control"
        id="inshortname"
        type="text"
        placeholder="Nombre corto"
        v-model="store.inShortName"
        onclick="this.select()"
        v-bind:autocomplete="store.inShortName ? 'off' : 'on'"
        required
      />
      <label class="form-label" for="inbreadcrumb">Migas</label>
      <input
        class="form-control"
        id="inbreadcrumb"
        type="text"
        placeholder="Migas"
        v-model="store.inBreadcrumb"
        required
      />
      <fieldset class="container row my-2">
        <legend class="fs-5 bg-warning rounded text-dark">
          Condicionales
          <span class="fs-6 fw-light">(No seleccionado = N/A)</span>
        </legend>
        <div
          class="form-check col"
          title="Activación de características de acesibilidad documentadas"
        >
          <input
            class="form-check-input"
            type="checkbox"
            id="r5_2"
            v-model="store.r5_2"
            aria-label="Genéricos"
          />
          <label for="r5_2" class="form-check-label">5.2</label>
        </div>
        <div class="form-check col" title="Biométrica">
          <input
            class="form-check-input"
            type="checkbox"
            id="r5_3"
            v-model="store.r5_3"
            aria-label="Biomética"
          />
          <label for="r5_3" class="form-check-label">5.3</label>
        </div>
        <div class="form-check col" title="Conversiones">
          <input
            class="form-check-input"
            type="checkbox"
            id="r5_4"
            v-model="store.r5_4"
            aria-label="Preservación en conversiones"
          />
          <label for="r5_4" class="form-check-label">5.4</label>
        </div>
        <div class="form-check col" title="Voz">
          <input
            class="form-check-input"
            type="checkbox"
            id="r6"
            v-model="store.r6"
            aria-label="Transmisión de voz bidireccional"
          />
          <label for="r6" class="form-check-label">R6</label>
        </div>
        <div class="form-check col" title="Video">
          <input
            class="form-check-input"
            type="checkbox"
            id="r7"
            v-model="store.r7"
            aria-label="Reproducción de video"
          />
          <label for="r7" class="form-check-label">R7</label>
        </div>
        <div class="form-check col" title="Herramientas de autor">
          <input
            class="form-check-input"
            type="checkbox"
            id="aut"
            v-model="store.herramientas_autor"
            aria-label="Herramientas de autor"
          />
          <label for="aut" class="form-check-label" >Aut</label>
        </div>
        <div class="form-check col" title="Documentación suministrada">
          <input
            class="form-check-input"
            type="checkbox"
            id="doc"
            v-model="store.documentacion"
            aria-label="Documentación"
          />
          <label for="doc" class="form-check-label">Doc</label>
        </div>
        <div class="form-check col">
          <input
            class="form-check-input"
            type="checkbox"
            id="apo"
            v-model="store.servicios_apoyo"
            aria-label="Servicios de apoyo"
          />
          <label for="apo" class="form-check-label">Apo</label>
        </div>
      </fieldset>

      <button
        v-if="!store.editMode"
        type="submit"
        class="btn btn-outline-light mt-2"
        @click="store.addItem()"
      >
        Añadir
      </button>
      <button
        v-if="store.editMode"
        type="submit"
        class="btn btn-primary btn- mt-2"
        @click="store.saveModified()"
      >
        Modificar
      </button>
    </form>
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
  computed: {},
};
</script>

<style scoped></style>
