<template>
    <div class="buscar_ncm">     
      <NcmEncontradas :dados="[]" :exibirMva="true" :loading="loading" :msgErro="''" @selecione="Selecione($event)"></NcmEncontradas>
  </div>
</template>

<script>
import NcmEncontradas from '@/components/NcmEncontradas'
export default {
    components:{ NcmEncontradas},
    data(){
        return{           
          loading:true,            
        }
    },
    methods:{
      Selecione(){
        console.log(this.$route.name)
      },  
    },  
    head() {
      return {
        title: "LEFISC | ST | Consulta NCM"
      };
    },
    async mounted(){
      this.loading = false
      //await this.$store.dispatch('simulador/getListaNcm') 
      let consultaNcm = JSON.parse(localStorage.getItem('consultaNcm'))
      console.log(consultaNcm)

      
      this.loading = true
    }
}
</script>

<style scoped>
.buscar_ncm{
    display: flex;
    align-items: center;
}


</style>