<template>
  <div class="container">
    <h2>TABLE VIEW</h2>
    <div class="row">
      <div class="accordion" id="accordion-pages">
        <div class="accordion-item" v-for="(page, index) in store.siteWebPages ">
          <h2 class="accordion-header" v-bind:id="'heading-'+index">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#collapse-'+index"
              aria-expanded="false"
              :aria-controls="'collapse-'+index"
            >
              <span class="fw-bold me-1">URL: </span> {{page.webPageUrl}}
            </button>
          </h2>
          <div
            :id="'collapse-'+index"
            class="accordion-collapse collapse"
            :aria-labelledby="'heading-'+index"
            data-bs-parent="#accordion-pages"
          >
            <div class="accordion-body">
                <ul>
                    <li>{{ page.webPageType }}</li>
                    <li>{{ page.shortName }}</li>
                    <li>{{ page.breadcrumb }}</li>
                    <li></li>
                    <li></li>
                </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useSiteStore } from "../stores/site";
export default {
  setup() {
    const store = useSiteStore();

    return {
      store,
    };
  },
  computed: {},
};
</script>
<style scoped>
</style>