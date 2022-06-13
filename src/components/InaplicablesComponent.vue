<script setup lang="ts">
const props = defineProps<{
  issue: Object
}>()


</script>
<template>
<p>descripcion: {{ props.issue.description }} </p>
<p>help  {{ props.issue.help }}</p>
<p>help uri  {{ props.issue.helpUrl }}</p>
<p>id  {{ props.issue.id }}</p>
<p>impact  {{ props.issue.impact }}</p>
<p>nodes  {{ props.issue.nodes }}</p>
<template v-for="atag in props.issue.tags" >
<issue-tags :theTag="atag"></issue-tags>
</template>
</template>