<template>
  <div class="jumbotron">
    <h2>Lista de tareas</h2>
    <hr />

    <div v-if="tareas.length">
      <table class="table text-left"> 
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Fecha</th>
        </tr>
        <tr v-for="(tarea, index) in tareas" :key="index">
          <td scope="col"> <p>{{ tarea.id }}</p> </td>
          <td scope="col"> <p>{{ tarea.nombre }}</p> </td>
          <td scope="col"> <p>{{ tarea.email }}</p> </td>
          <td scope="col"> <p>{{ tarea.descripcion }}</p> </td>
          <td scope="col"> <p>{{ formatearFechaHora(tarea.createdAt) }}</p> </td>                   
        </tr>
      </table>
    </div>
    <div v-else class="alert alert-warning"> <h5>No hay tareas cargadas</h5> </div>
  </div>

</template>

<script>

  import filters from '../filters'

  export default  {
    name: 'src-components-tareas',
    props: [],
    mixins: [filters],
    mounted () {
      this.getDatosFormAxios()
    },
    data () {
      return {
        url: 'https://5f92eb01eca67c001640a201.mockapi.io/formulario',
        tareas: []
      }
    },
    methods: {
      /* Pedido de datos almacenados en MockAPI */
      async getDatosFormAxios() {
        try {
          let res = await this.axios(this.url)
          this.tareas = res.data
          console.log(res.data)
        }
        catch(error) {
          console.log('HTTP GET ERROR', error)
        }
      }
    },
    computed: {

    }
  }


</script>

<style scoped lang="css">
  .src-components-tareas {

  }
</style>
