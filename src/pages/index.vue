<script setup lang="ts">


</script>
<template>
   
    <!---------------ESTATUS DE LA MUESTRA-------------->
    <div class="row m-2">
      <div class="col bg-dark card">
        <site-form />
      </div>
    <!---------------FORMULARIO DE PAGINAS-------------->
      <div class="col card bg-primary ms-3">
        <table-form />
      </div>
    </div>
    <!-----------------------TABLA DE RESULTADOS--------->
    <div class="row m-2">
      <table-view />
    </div>
  

</template>
<style>
.bg-warning
{
  background-color: orange !important;
  color: white !important;

}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
