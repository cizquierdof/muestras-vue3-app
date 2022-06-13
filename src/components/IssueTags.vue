<script setup lang="ts">
const props = defineProps<{
  theTag: String
}>()


</script>
<template>
<p>una tag : {{ props.theTag }} </p>

</template>