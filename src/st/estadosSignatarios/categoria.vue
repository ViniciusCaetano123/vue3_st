<template>
    <div>
      <div>
        <div class="estados-top">
          <div class="buscar_mercadorias">
            <el-form  ref="form">     
              <el-form-item >
                <el-select placeholder="Selecione" v-model="form.uf"  @change="changeEstado">
                  <el-option v-for="(estado,i) in $store.state.simulador.estados" :label="estado.estado" :value="`${estado.id}`" :key="i"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item v-if="estadoSelected" style="margin-left: 20px;"  >
                <el-select  style="width: 100%;max-width: 520px;" placeholder="Selecione a categoria" v-model="form.categoria" >
                  <el-option   value="0" label="Selecione a categoria"> </el-option>
                  <el-option v-for="(e,i) in $store.state.simulador.categorias" :label="e.categoria" :value="`${e.id}`" :key="i"> </el-option>
                </el-select>
            </el-form-item>
            </el-form>
            <button class="btnBuscar" @click="buscar()" style="margin-bottom: 22px;margin-left:20px;">Buscar</button>
          </div>
          <div>
            <div class="estado-legenda">
              <div class="estado-title">
                <h5>Legenda</h5>
                <hr>
              </div>
              <div>
                <img src="https://www.lefisc.com.br/st/images/true.svg" alt="">
                <p>Incide Substituição Tributária</p>
              </div>
              <div>
                <img src="https://www.lefisc.com.br/st/images/false.svg" alt="">
                <p>Não incide Substituição Tributária</p>
              </div>
              <div>
                <img src="https://www.lefisc.com.br/st/images/line.svg" alt="">
                <p>UF de Origem</p>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <div v-if="spiner">
        <div class="estados-card" v-for="(es,i) in $store.state.simulador.estadoSignatarios" :key="i">
        <div>
          <div style="display: flex;align-items: center;margin-bottom: 5px;">
            <img src="https://www.lefisc.com.br/st/images/estadoSigPesquisar.svg" alt=""> 

            <h4>{{es.cest}} - {{ es.descricao}}</h4>
          </div>
          <hr>
        </div>
        <div class="results-estados">
          <div v-for="(es, index) in es.signatarios" :key="index" style="position:relative">
            <el-popover style="width:37px"  placement="top-start" trigger="hover" v-if="es.baseLegal != null">
            <div style="text-align: right; margin: 0" v-for="(es,i) in es.baseLegal" :key="i">
              <a target="_blank"  >{{es}}</a> 
            </div>
              <el-button slot="reference">H</el-button>
              </el-popover>
            <div  class="reference"> 
              
              <p>{{ es.estado }}</p>
             <!-- <div class="base-legal">
                <p></p>
                <a :href="es.link" target="_blank">{{es.baseLegal}}</a> 
              </div>-->
            </div>
            
            <div>
              <img v-if="es.estado != form.estado && es.estado != estado.sigla" :src="es.baseLegal != null ? 'https://www.lefisc.com.br/st/images/true.svg' : 'https://www.lefisc.com.br/st/images/false.svg'" alt="">
              <img v-if="es.estado == estado.sigla" src="https://www.lefisc.com.br/st/images/line.svg" alt="">
            </div>
              
            </div>
        </div>
        <div class="estados-obs">
          <div>
            <h5>Observações</h5>
            <hr>
          </div>
          <div>
            <div v-html="es.observacoes" style="color: #646363;font-weight: 600;margin-top:10px;"></div>
          </div>
        </div>
      </div>
      </div>
      <div v-else style="display: flex;align-items: center;justify-content: center;min-height: 250px;">
      <i class="el-icon-loading" style="font-size:30px;"></i>
    </div>
     
    </div>
  </template>
  
  <script>
  export default {
    data(){
      return{
        spiner:true,
        estadoSelected:true,
        estado:'',
        form:{
          categoria:'0',
          uf:'0',
        },      
      }
    },
    methods:{
      async changeEstado(){      
        console.log(this.form.uf)
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
          this.spiner = false
          await this.$store.dispatch('simulador/getEstadosSignatarios',this.form) 
          this.estado = this.$store.state.simulador.estados.find(e=> e.id == this.form.uf )
          localStorage.setItem('formEstadoSignatario',JSON.stringify(this.form))
          this.spiner = true
        }catch(e){
          this.spiner = true
        }
      }
    },
    head() {
      return {
        title: "LEFISC | ST | Mercadorias | Categoria"
      };
    },
    mounted(){
      const form = JSON.parse(localStorage.getItem('formEstadoSignatario'))
      this.estado = this.$store.state.simulador.estados.find(e=> e.id == form.uf )
      this.form.uf = form.uf
      this.form.categoria = form.categoria
      if(this.$store.state.simulador.estadoSignatarios.length == 0){
        this.form.uf = form.uf
        this.form.categoria = form.categoria
        this.changeEstado()
        this.buscar()
      }
    }
  }
  </script>
  
  <style scoped>
 div.el-input {
  width: 100%;
    max-width: 500px;
    min-width: 320px;
 }
  .el-button{
    padding:0;
    width:100%;
    position: absolute;
    opacity: 0;
    height: 50%;
 }
  div.base-legal{
    position: absolute;
    background: #FFF;
      bottom:0px; 
      padding: 5px;
      font-size: 12px;
      right: 0;
      display: none !important;
      border-radius: 3px;
      color:#000;
      
  }
  div.base-legal a{
    color:#000;
  }
  .buscar_mercadorias{
      display: flex;
      align-items: center;
  }
  .buscar_mercadorias .el-form {
      display: flex;
  }
  .estados-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .estado-legenda {
    display: flex;
    flex-direction: column;
    background-color: #DBFFDB;
    padding: 12px;
    gap: 2px;
    border: 1px solid #007900;
    border-radius: 5px;
    margin-bottom: 16px;
  }
  .estado-legenda .estado-title {
    display: block;
    font-size: 20px;
    color: #007900;
  }
  .estado-legenda .estado-title hr {
    height: 1px;
    border: 0;
    background-color: #007900;
  }
  .estado-legenda div {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 4px;
  }
  .estado-legenda div img {
    width: 20px;
  }
  .estados-card {
    background-color: #DBFFDB;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    border-radius: 5px;
    margin-bottom: 30px;
  }
  .estados-card h4 {
    font-weight: 700;
    font-size: 18px;
    color: #007900;
    margin-bottom: 4px;
    margin-left: 10px;
  }
  .estados-card h5 {
    font-weight: 700;
    font-size: 16px;
    color: #007900;
    margin-bottom: 4px;
  }
  .estados-card hr {
    height: 2px;
    background-color: #007900;
    border: 0;
  }
  .estados-obs > div > p {
    font-weight: 500 !important;
    font-size: 16px;
    line-height: 24px;
  }
  .results-estados {
    display: flex;
    flex-direction: row;
  }
.results-estados .reference{
  background: #F0FFF0;
}
  .results-estados > div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .results-estados  .reference:hover .base-legal{
    display: flex !important;
  }
  .results-estados > div > div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #FFF;
    border: 1px solid #000;
    height: 32px;
  }
  .results-estados > div > div p {
    font-weight: 700;
    font-size: 14px;
  }
  .results-estados > div:first-child > div:first-child {
    border-radius: 5px 0px 0px 0px;
  }
  .results-estados > div:first-child > div:last-child {
    border-radius: 0px 0px 0px 5px;
  }
  .results-estados > div:last-child > div:first-child {
    border-radius: 0px 5px 0px 0px;
  }
  .results-estados > div:last-child > div:last-child {
    border-radius: 0px 0px 5px 0px;
  }
  div.results-estados > div:first-child  > div.reference{
    border-radius: 5px 0px 0px 0px;
  }
  div.results-estados > div:last-child  > div.reference{
    border-radius: 0px 5px 0px 0px;
  }
  </style>