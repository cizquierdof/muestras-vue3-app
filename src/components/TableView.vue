<template>
  <div class="container">
<div class="row" >
    <table class="table table-dark table-striped table-sm" >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">url</th>         
          <th scope="col"><button class="btn btn-primary btn-sm" @click="store.orden()" title="Ordena la muestra por tipo de página">Tipo</button> </th>
          <th scope="col">Shortname</th>
          <th scope="col">Migas</th>
          <th scope="col">acción</th>
        </tr>
      </thead>

      <tbody>
        <tr 
        v-for="(page,index) in store.siteWebPages">
          <td>{{index}}</td>
          <td 
            class="table-text-wrap "
            id="urlCell"
            @click.ctrl="store.openUrl(page.webPageUrl)"
            title="ctrl+click para abrir">
              {{page.webPageUrl}}
            </td>
          <td class="table-text-wrap">{{page.webPageType}}</td>
          <td>{{page.shortName}}</td>
          <td class="table-text-wrap">{{page.breadcrumb}}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="store.deleteItem(index)">
              <span class="fa fa-trash fa-xs" aria-label="Borra línea"></span>
            </button>
            <button class="btn btn-warning btn-sm" @click="store.editItem(index)">
              <span class="fa fa-edit fa-xs" aria-label="Edita línea"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
  computed: {},
};
</script>
<style scoped>
table{
  min-width: 100%;
  table-layout: fixed;
}
thead th:nth-child(1){
  width:3%;
}
thead th:nth-child(2){
  width:40%;
}
thead th:nth-child(3){
  width:12%;
}
thead th:nth-child(4){
  width:15%;
}
thead th:nth-child(5){
  width:26%;
}
thead th:nth-child(6){
  width:7%;
}
.table-text{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.table-text-wrap{
  word-wrap: break-word;
}
#urlCell{
  cursor: pointer;
}
</style>
