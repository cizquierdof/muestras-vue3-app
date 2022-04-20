<template>
  <div class="text-light">
    <h2>Datos de la página</h2>
    <form @submit.prevent class="card text-light bg-primary mb-2" autocomplete="on">
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
      <label class="form-label" for="intype">Tipo de página</label>
      <select class="form-select" id="intype" v-model="store.inType" required>
        <option disabled value="">Tipo de página</option>
        <option v-for="type in store.pageTypes" v-bind:value="type.value">
          {{ type.text }}
        </option>
      </select>
      <label class="form-label" for="inshortname">Nombre corto</label>
      <input
        class="form-control"
        id="inshortname"
        type="text"
        placeholder="Nombre corto"
        v-model="store.inShortName"
        onclick="this.select()"
        v-bind:autocomplete="store.inShortName?'off':'on'"
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
import { ref } from '@vue/reactivity';
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
