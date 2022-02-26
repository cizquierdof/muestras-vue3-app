<template>
    <div>
        <h2>Este es el visor de la tabla</h2>
        <table>
            <thead>
                <th>Nombre</th>
                <th>Edad</th>
            </thead>
            <tbody>
                <tr v-for="(persona, index) in store.personas">
                    <td>{{persona.nombre}}</td>
                    <td>{{persona.edad}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {useDataModelStore} from '../stores/dataModel';
export default {
    setup () {
        const store=useDataModelStore()

        return {
            store,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>