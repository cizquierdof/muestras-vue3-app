<script setup lang="ts">
</script>
<template>
  <header>
    <nav>
      <ul flex-inline>
        <li btn m-3>
          <router-link :to="`/vuetify/index`" replace> Vuetify Components </router-link>
        </li>
        <li btn m-3>
          <router-link :to="`/pinia`" replace> pinia test </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>