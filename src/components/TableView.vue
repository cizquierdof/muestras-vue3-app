<template>
  <div class="card pt-3">

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>url</th>
          <th>Tipo</th>
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
            <button class="btn btn-danger" @click="borrar(index)">
              <span class="fa fa-trash"></span>
            </button>
            <button class="btn btn-warning ms-1">
              <span class="fa fa-edit"></span>
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
