<script setup lang="ts">

const siteStore = useSiteStore()

const thereport = ref(new Map<String, String>)
const recheck = async (url: string) => {  
  const APIURL = "http://localhost:8080/params?url="
  fetch(APIURL + url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${ response.status }`);
    }
    
    return response.json();
  })
  .then((response) => {
    // pues aqui asignarlo a un componente que mapea el json de axe core  creo que axe core ya lo tiene
    thereport.value.set(url , JSON.parse(response))
    console.log(thereport.value.get(url))

  });
}

// const isAReport = computed(() => {
//   return  (webPageUrl) => thereport.value.has(webPageUrl)
// })


</script>
<template>
  <div class="container">
    <h2>TABLE VIEW</h2>
    <div class="row">
      <div class="accordion" id="accordion-pages">
        <div class="accordion-item" v-for="(page, index) in siteStore.siteWebPages ">
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
            <button btn class="recheckPage" type="button" @click.prevent="recheck(page.webPageUrl)">Check</button>
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
                    <reporte v-if="thereport.has(page.webPageUrl)" :report="thereport.get(page.webPageUrl)" :indice="index"></reporte>
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