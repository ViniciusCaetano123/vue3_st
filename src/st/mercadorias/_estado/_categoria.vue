<template>
    <div>
        <div class="buscar_mercadorias">
            <el-form ref="form1"><!--:rules="ruleForm"-->   
                <el-form-item  >
                    <el-select style="width: 100%;max-width: 320px;" placeholder="Selecione o estado" v-model="form.uf" @change="changeEstado">
                        <el-option   value="0" label="Selecione o estado"> </el-option>
                        <el-option v-for="(estado,i) in $store.state.simulador.estados" :label="estado.estado" :value="`${estado.id}`" :key="i"></el-option>
                    </el-select>
                    </el-form-item>
                <el-form-item v-if="estadoSelected"  style="margin-left:20px;width:400px;">
                    <el-select  style="width: 100%;" placeholder="Selecione a categoria" v-model="form.categoria" >
                    <el-option   value="0" label="Selecione a categoria"> </el-option>
                    <el-option v-for="(e,i) in $store.state.simulador.categorias" :label="e.categoria" :value="`${e.id}`" :key="i"> </el-option>
                    </el-select>
                </el-form-item>
                </el-form>   
          <button class="btnBuscar" @click="buscar()" style="margin-bottom: 22px;margin-left:20px;">Buscar</button>
          </div>  
          <p > Quantidades de mercadorias: {{ $store.state.simulador.listaMercadoria.totalMercadorias }}</p>
          <p style="font-weight: 600;margin:20px 0px;">{{ $store.state.simulador.listaMercadoria.lista }}</p>
          <TableDiv :dados="$store.state.simulador.listaMercadoria.mercadorias" v-if="loading"></TableDiv>
          <div v-else style="display: flex;align-items: center;justify-content: center;min-height: 250px;">
            <i class="el-icon-loading" style="font-size:30px;"></i>
            </div>
    </div>
  </template>
  
  <script>
  import NcmEncontradas from '@/components/NcmEncontradas'
  import TableDiv from '@/components/TableDiv'
  export default {
      components:{ NcmEncontradas, TableDiv},
      data(){
          return{
            estadoSelected:true,
              form:{
                  categoria:'0',
                  uf:'0',
              },
              loading:false,            
          }
      },
      methods:{
        async changeEstado(){
            try{
                this.estadoSelected = false
                await this.$store.dispatch('simulador/getCategoriaUf',this.form.uf) 
                this.form.categoria = '0'
                this.estadoSelected = true
            }catch(e){
            }
        },
        async buscar(){
            try{
                this.loading = false                
                await this.$store.dispatch('simulador/getListaMercadoria',this.form)                 
                localStorage.setItem('formListaMercadoria',JSON.stringify(this.form))
                this.loading = true                
            }catch(e){
            }
          }
      },  
      head() {
        return {
          title: "LEFISC | ST | Mercadorias"
        };
      },
      async mounted(){    
        this.$store.commit('simulador/setListaMercadoria',[])
        let formListaMercadoria = JSON.parse(localStorage.getItem('formListaMercadoria'))
        console.log(formListaMercadoria)
        this.form.uf  = formListaMercadoria.uf
        this.form.categoria  = formListaMercadoria.categoria
        //if(this.$store.state.simulador.categorias.length == 0){
            await this.$store.dispatch('simulador/getCategoriaUf',this.form.uf) 
            await this.buscar()
            this.loading = true
        //}
      }
  }
  </script>
  
  <style scoped>
 
  .buscar_mercadorias{
      display: flex;
      align-items: center;
  }
  .buscar_mercadorias .el-form {
      display: flex;
  }
  
  
  </style>