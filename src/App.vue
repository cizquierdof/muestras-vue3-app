<script setup>
import Cabecera from "./components/Cabecera.vue";
import TableForm from "./components/TableForm.vue";
import TableView from "./components/TableView.vue";
import SiteForm from "./components/SiteForm.vue";
</script>

<template>
  <Cabecera />

  <main class="mx-3">
    <!---------------ESTATUS DE LA MUESTRA-------------->
    <div class="row">
      <div class="col bg-dark card ms-3 mt-3">
        <SiteForm />
      </div>
    <!---------------FORMULARIO DE PAGINAS-------------->
      <div class="col card bg-primary ms-3 mt-3">
        <TableForm />
      </div>
    </div>
    <!-----------------------TABLA DE RESULTADOS--------->
    <div class="row">
      <TableView />
    </div>
  </main>
</template>

<style>
</style>
