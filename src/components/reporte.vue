<script setup lang="ts">
const props = defineProps<{
  report: Object,
  indice: String
}>()

const store = useSiteStore();
const inapplicables = props.report['axe-analysis'].inapplicable
const checkbox= ref(store.siteWebPages[props.indice]['condiciones']['r6'])
watch (checkbox, ()=> {
    store.siteWebPages[props.indice]['condiciones']['r6'] = checkbox.value
})

</script>
<template>
<template v-for="inaplicable in inapplicables ">
    <h3>
        inaplicable  y su condicion r7 es :
    <div class="d-flex justify-center align-center">
        <v-checkbox
        v-model="checkbox"
        :label="`Checkbox: ${checkbox.toString()}`"
        ></v-checkbox>
    </div>
    {{ store.siteWebPages[props.indice]['condiciones']['r6'] }}
    </h3>
    <inaplicables-component :issue="inaplicable"> </inaplicables-component>
</template>
</template>
<style>
</style>