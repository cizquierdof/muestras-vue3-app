<template>
  <div>
    <ul>
      <li 
        class="" 
        v-for="url in stSite.siteWebPages"
        @dblclick="stScrapping.getPage(url.webPageUrl)">
            {{ url.webPageUrl }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useSiteStore } from "../stores/site";
import { useScrappingStore } from "../stores/scrapping";

export default {
  setup() {
    const stSite = useSiteStore();
    const stScrapping = useScrappingStore();
    return {
      stSite,
      stScrapping,
    };
  },
};
</script>

<style scoped>
</style>