<template>
  <div class="container">
    <div class="row">
      <table class="table table-dark table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th>
              <span
                aria-label="Despliega"
                class="fa-solid fa-up-right-from-square text-primary boton"
                title="Despliega todo el sitio en pestañas (No funciona en Chrome)"
                @click="store.openUrlList()"
              ></span>
            </th>
            <th scope="col">url</th>
            <th scope="col">
              <button
                class="btn btn-primary btn-sm"
                @click="store.orden()"
                title="Ordena la muestra por tipo de página"
              >
                Tipo
              </button>
            </th>
            <th scope="col">Shortname</th>
            <th scope="col">Migas</th>
            <th scope="col">acción</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(page, index) in store.siteWebPages" >
            <td>{{ index }}</td>
            <td @click="store.openUrl(page.webPageUrl)" class="boton">
              <span
                title="Abre en nueva pestaña"
                class="fa-solid fa-up-right-from-square text-warning"
              ></span>
            </td>
            <td
              class="table-text-wrap"
              @click.ctrl="store.openUrl(page.webPageUrl)"
              title="ctrl+click para abrir en nueva pestaña"
            >
              {{ page.webPageUrl }}
            </td>
            <td class="table-text-wrap">{{ page.webPageType }}</td>
            <td>{{ page.shortName }}</td>
            <td class="table-text-wrap">{{ page.breadcrumb }}</td>
            <td>
              <button
                class="btn btn-danger btn-sm"
                @click="store.deleteItem(index)"
              >
                <span class="fa fa-trash fa-xs" aria-label="Borra línea"></span>
              </button>
              <button
                class="btn btn-warning btn-sm"
                @click="store.editItem(index)"
              >
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
table {
  min-width: 100%;
  table-layout: fixed;
}
thead th:nth-child(1) {
  width: 2%;
}
thead th:nth-child(2) {
  width: 2%;
}

thead th:nth-child(3) {
  width: 40%;
}
thead th:nth-child(4) {
  width: 11%;
}
thead th:nth-child(5) {
  width: 15%;
}
thead th:nth-child(6) {
  width: 24%;
}
thead th:nth-child(7) {
  width: 6%;
}
.table-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.table-text-wrap {
  word-wrap: break-word;
}
.boton {
  cursor: pointer;
}
</style>
