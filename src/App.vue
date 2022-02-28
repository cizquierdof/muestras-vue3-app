<script setup>
import TableView from "./components/TableView.vue";
import TableForm from "./components/TableForm.vue";

</script>

<template>
  <header class="bg-secondary text-light p-3">
    <div class="card-dark px-5">
      <h1 class="card-title text-center">Formulario manejo JSON</h1>
      <p>El objetivo es manejar un array de objetos mediante un formulario</p>
      <p>Con el formulario se puede:</p>
      <ul>
        <li>Añadir, borrar y modificar elementos del array</li>
        <li>Los datos se guardan automáticamente en LocalStorage</li>
        <li>El array se puede guardar en un archivo local</li>
        <li>Los datos se pueden recuperar del archivo local</li>
      </ul>
    </div>
  </header>

  <main class="mx-3">
    <TableForm/>
    <!-- <TableView class="col" /> -->

  </main>
</template>

<style>
</style>
