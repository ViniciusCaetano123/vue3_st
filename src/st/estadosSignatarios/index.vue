<template>
  <div>
    <el-form ref="form"><!--:rules="ruleForm"-->   
      <el-form-item  >
          <el-select style="width: 100%;max-width: 320px;" placeholder="Selecione o estado" v-model="form.uf" @change="changeEstado">
            <el-option   value="0" label="Selecione o estado"> </el-option>
            <el-option v-for="(estado,i) in $store.state.simulador.estados" :label="estado.estado" :value="`${estado.id}`" :key="i"></el-option>
          </el-select>
        </el-form-item>
        
      <el-form-item v-if="estadoSelected"  >
        <el-select  style="width: 100%;max-width: 320px;" placeholder="Selecione a categoria" v-model="form.categoria" >
          <el-option   value="0" label="Selecione a categoria"> </el-option>
          <el-option v-for="(e,i) in $store.state.simulador.categorias" :label="e.categoria" :value="`${e.id}`" :key="i"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>   
    <button class="btnBuscar" @click="buscar()" style="margin-top:30px;" :loading="spiner">
      <i class="el-icon-loading" v-if="spiner"></i> Buscar</button>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      regioes:[],
      estadoSelected:false,
      spiner:false,
      form: {
        categoria:'0',
        uf:'0',
      }
    }
  },
  head() {
    return {
      title: "LEFISC | ST | Estados Signatários"
    };
  },
  methods: {
    async changeEstado(){      
      this.estadoSelected = false
      try{
        await this.$store.dispatch('simulador/getCategoriaUf',this.form.uf) 
        this.form.categoria = '0'
        this.estadoSelected = true
      }catch(e){
      }
    },
    async buscar(){
      try{
        this.spiner = true
        localStorage.setItem('formEstadoSignatario',JSON.stringify(this.form))
        await this.$store.dispatch('simulador/getEstadosSignatarios',this.form) 
        
        this.spiner = false
      }catch(e){
        this.spiner = false
      }
    }
  },
  
}
</script>

<style>
.personalizar-select{
  width: 100%;max-width: 320px;
  border: 1px solid var(--verde);
    border-radius: 5px;
    padding: 10px;
  
}
</style>