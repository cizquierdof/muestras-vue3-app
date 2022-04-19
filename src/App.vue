<script setup>
import Cabecera from "./components/Cabecera.vue";
import TableForm from "./components/TableForm.vue";
import TableView from "./components/TableView.vue";
import SiteForm from "./components/SiteForm.vue";
</script>

<template>
  <Cabecera />

  <main class="">
    <!---------------ESTATUS DE LA MUESTRA-------------->
    <div class="row m-2">
      <div class="col bg-dark card">
        <SiteForm />
      </div>
    <!---------------FORMULARIO DE PAGINAS-------------->
      <div class="col card bg-primary ms-3">
        <TableForm />
      </div>
    </div>
    <!-----------------------TABLA DE RESULTADOS--------->
    <div class="row m-2">
      <TableView />
    </div>
  </main>
</template>

<style>
</style>
