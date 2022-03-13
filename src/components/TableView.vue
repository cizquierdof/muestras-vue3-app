<template>
  <div class="card pt-3">

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>url</th>
          <th><button class="btn btn-primary btn-sm" @click="store.orden()" title="Ordena la muestra por tipo de página">Tipo</button> </th>
          <th>Shortname</th>
          <th>Migas</th>
          <th>acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(page,index) in store.siteWebPages">
          <td>{{index}}</td>
          <td>{{page.webPageUrl}}</td>
          <td>{{page.webPageType}}</td>
          <td>{{page.shortName}}</td>
          <td>{{page.breadcrumb}}</td>
          <td>
            <button class="btn btn-danger" @click="store.deleteItem(index)">
              <span class="fa fa-trash" aria-label="Borra línea"></span>
            </button>
            <button class="btn btn-warning ms-1" @click="store.editItem(index)">
              <span class="fa fa-edit" aria-label="Edita línea"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

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
