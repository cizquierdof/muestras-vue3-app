<template>
    <div>
        <ul>
            <li class="" v-for="url in store.siteWebPages">{{url.webPageUrl}}</li>
        </ul>
    </div>
</template>

<script>
import { useSiteStore } from "../stores/site";
export default {
    setup () {
        const store = useSiteStore();
        
        console.log('lista de sitios', store.siteWebPages);

        return {
            store,
        
        }
    }
}
</script>

<style scoped>

</style>