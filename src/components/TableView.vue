<template>
  <div class="card pt-3">

    <table class="table table-dark table-sm table-striped">
      <thead>
        <tr class="">
          <th class="col">#</th>
          <th class="col">url</th>
          <th class="col"><button class="btn btn-primary btn-sm" @click="store.orden()" title="Ordena la muestra por tipo de página">Tipo</button> </th>
          <th class="col">Shortname</th>
          <th class="col">Migas</th>
          <th class="col-1">acción</th>
        </tr>
      </thead>
      <tbody>
        <tr class="" v-for="(page,index) in store.siteWebPages">
          <td class="col">{{index}}</td>
          <td class="col">{{page.webPageUrl}}</td>
          <td class="col">{{page.webPageType}}</td>
          <td class="col">{{page.shortName}}</td>
          <td class="col">{{page.breadcrumb}}</td>
          <td class="col-1">
            <button class="btn btn-danger" @click="store.deleteItem(index)">
              <span class="fa fa-trash fa-xs" aria-label="Borra línea"></span>
            </button>
            <button class="btn btn-warning" @click="store.editItem(index)">
              <span class="fa fa-edit fa-xs" aria-label="Edita línea"></span>
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
