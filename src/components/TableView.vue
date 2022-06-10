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
            <th scope="col">5.2</th>
            <th scope="col">5.3</th>
            <th scope="col">5.4</th>
            <th scope="col">R6</th>
            <th scope="col">R7</th>
            <th scope="col">Au</th>
            <th scope="col">D</th>
            <th scope="col">A</th>
            <th scope="col">acción</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(page, index) in store.siteWebPages">
            <td>{{ index }}</td>
            <td @click="store.openUrl(page.webPageUrl)" class="boton">
              <span
                title="Abre en nueva pestaña"
                class="fa-solid fa-up-right-from-square text-warning"
              ></span>
            </td>
            <td class="cell-text-overflow">
              <a
                tabindex="0"
                role="button"
                data-bs-trigger="focus"
                title="URL"
                data-bs-toggle="popover"
                data-bs-placement="top"
                :data-bs-content="page.webPageUrl"
                data-bs-custom-class="custom-popover"
                >{{ page.webPageUrl }}</a
              >
            </td>
            <td class="cell-text-overflow">{{ page.webPageType }}</td>
            <td class="cell-text-overflow">
              <a
                tabindex="0"
                role="button"
                data-bs-trigger="focus"
                title="Nombre corto"
                data-bs-toggle="popover"
                data-bs-placement="top"
                :data-bs-content="page.shortName"
                data-bs-custom-class="custom-popover"
              >
                {{ page.shortName }}
              </a>
            </td>
            <td class="cell-text-overflow">
              <a
                tabindex="0"
                role="button"
                data-bs-trigger="focus"
                title="Migas"
                data-bs-toggle="popover"
                data-bs-placement="top"
                :data-bs-content="page.breadcrumb"
                data-bs-custom-class="custom-popover"
              >
                {{ page.breadcrumb }}
              </a>
            </td>
            <td>{{ page.condiciones.r5_2 ? "x" : "" }}</td>
            <td>{{ page.condiciones.r5_3 ? "x" : "" }}</td>
            <td>{{ page.condiciones.r5_4 ? "x" : "" }}</td>
            <td>{{ page.condiciones.r6 ? "x" : "" }}</td>
            <td>{{ page.condiciones.r7 ? "x" : "" }}</td>
            <td>{{ page.condiciones.herramientas_autor ? "x" : "" }}</td>
            <td>{{ page.condiciones.documentacion ? "x" : "" }}</td>
            <td>{{ page.condiciones.servicios_apoyo ? "x" : "" }}</td>
            <td>
              <button
                class="btn btn-danger btn-sm"
                aria-label="Borra línea"
                @click="store.deleteItem(index)"
              >
                <span class="fa fa-trash fa-xs" ></span>
              </button>
              <button
                class="btn btn-warning btn-sm"
                aria-label="Edita línea"
                @click="store.editItem(index)"
              >
                <span class="fa fa-edit fa-xs" ></span>
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
  mounted() {
    // Initialize tooltips
    var popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    var tooltipList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  },
};
</script>

<style >
.custom-popover {
  --bs-popover-max-width: 300px;
  --bs-popover-border-color: var(--bs-primary);
  --bs-popover-header-bg: var(--bs-primary);
  --bs-popover-header-color: var(--bs-white);
  --bs-popover-body-padding-x: 1rem;
  --bs-popover-body-padding-y: 0.5rem;
}

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
  width: 31%;
}
thead th:nth-child(4) {
  width: 11%;
}
thead th:nth-child(5) {
  width: 15%;
}
thead th:nth-child(6) {
  width: 18%;
}
thead th:nth-child(7) {
  width: 3%;
}
thead th:nth-child(8) {
  width: 3%;
}
thead th:nth-child(9) {
  width: 3%;
}
thead th:nth-child(10) {
  width: 3%;
}
thead th:nth-child(11) {
  width: 3%;
}
thead th:nth-child(12) {
  width: 3%;
}
thead th:nth-child(13) {
  width: 2%;
}
thead th:nth-child(14) {
  width: 2%;
}
thead th:nth-child(15) {
  width: 6%;
}
.cell-text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cell-text-overflow span:hover {
  position: fixed;
  width: 25rem;
}
.cell-text {
  word-wrap: break-word;
}
.boton {
  cursor: pointer;
}
</style>
