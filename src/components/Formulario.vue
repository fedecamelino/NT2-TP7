<template>
  <div class="jumbotron">
    <h2>Nueva tarea</h2>
    <hr />

    <form novalidate autocomplete="off" @submit.prevent="enviar()">
        <!-- ------------ -->
        <!-- CAMPO NOMBRE -->
        <!-- ------------ -->
        <div class="form-group">
              <label for="nombre">Nombre</label>
              <input 
                  type="text"
                  id="nombre"
                  class="form-control"
                  v-model="$v.f.nombre.$model"
              >
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="$v.f.nombre.$error && $v.f.nombre.$dirty" class="alert alert-danger mt-1">
                  <div v-if="$v.f.nombre.required.$invalid">Este campo es requerido</div>
              </div>
        </div>
        <!-- ------------------- -->
        <!--  CAMPO DESCRIPCION  -->
        <!-- ------------------- -->
        <div class="form-group">
              <label for="edad">Descripcion</label>
              <input 
                  type="text"
                  id="descripcion"
                  class="form-control"
                  v-model="$v.f.descripcion.$model"
              >
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="$v.f.descripcion.$error && $v.f.descripcion.$dirty" class="alert alert-danger mt-1">
                  <div v-if="$v.f.descripcion.required.$invalid">Este campo es requerido</div>
                  <div v-if="$v.f.descripcion.minLength.$invalid">Este campo debe tener al menos {{$v.f.descripcion.minLength.$params.min}} caracteres</div>
                  <div v-if="$v.f.descripcion.maxLength.$invalid">Este campo debe tener como máximo {{$v.f.descripcion.maxLength.$params.max}} caracteres</div>
              </div>
        </div>
        <!-- ------------- -->
        <!--  CAMPO EMAIL  -->
        <!-- ------------- -->
        <div class="form-group">
              <label for="email">Email</label>
              <input 
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="$v.f.email.$model"
              >
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="$v.f.email.$error && $v.f.email.$dirty" class="alert alert-danger mt-1">
                  <div v-if="$v.f.email.required.$invalid">Este campo es requerido</div>
                  <div v-if="$v.f.email.email.$invalid">Debe proveer un email válido</div>
              </div>
        </div>
        <!-- ------------ -->
        <!-- BOTÓN ENVÍO  -->
        <!-- ------------ -->
        <div class="form-group">
              <input 
                  type="submit"
                  :disabled="$v.$invalid"
                  class="btn btn-success mt-4"
                  value="Agregar tarea"
              >
        </div>
    </form>
  </div>
</template>

<script>
  import { required, minLength, maxLength, email } from '@vuelidate/validators'

  export default  {
    name: 'src-components-formularioVue',
    props: [],
    mounted () {
    },
    data () {
      return {
        f: this.resetForm(),
        url : 'https://5f92eb01eca67c001640a201.mockapi.io/formulario'
      }
    },
    validations: {
      f: {
        nombre: { 
          required,
        },
        descripcion: { 
          required,
          minLength: minLength(10),
          maxLength: maxLength(50)
        },
        email: { 
          required,
          email
        }
      }
    },
    methods: {
      /* Retardo */
      delay : ms => new Promise(resolve => setTimeout(resolve, ms)),

      /* Envio de datos del formulario a MockAPI */
      async sendDatosFormAxios(datos) {
        try {
          let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
          await this.delay(500)
          console.log(res.data)
        }
        catch(error) {
          console.log('HTTP POST ERROR', error)
        }
      },
      
      /* envío del formulario */
      async enviar() {
        this.$v.$touch() //Chequea las validaciones
        if(!this.$v.$invalid) {
          let form = this.f
          console.log(form)
          await this.sendDatosFormAxios(form)
          this.f = this.resetForm()
          this.$v.$reset()
        }
      },
      
      /* valor inicial de los campos de datos del formulario */
      resetForm() {
        return {
          nombre: '',
          descripcion : '',
          email : ''
        }
      }
    }  
  }

</script>

<style scoped lang="css">
  .src-components-formulario {

  }
</style>
