<template>
  <div>
    <TableView2/>
  </div>
</template>

<script>
import { useSiteStore } from "../stores/site";
import { useScrappingStore } from "../stores/scrapping";
import TableView2 from "../components/TableView2.vue";

export default {
    setup() {
        const stSite = useSiteStore();
        const stScrapping = useScrappingStore();
        return {
            stSite,
            stScrapping,
        };
    },
    components: { TableView2 }
};
</script>

<style scoped>
</style>