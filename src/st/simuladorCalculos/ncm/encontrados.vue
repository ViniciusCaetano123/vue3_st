<template>
  <div class="outside" @click="pegarTela($event)">
    <div class="encontrados">
      <div class="encontrados-title">
        <h3>Mercadorias Encontrados</h3>
        <div style="width: 100%;height: 1px;background: #007900;"></div>
      </div>
      <TableDiv :dados="$store.state.simulador.produtos" v-if="loading" @btnSimuladorSelecionar="selecionar($event)"></TableDiv>      
    </div>
    <div class="resultados">
      <div class="resultados-title">
        <h3>Mercadorias Selecionadas para Cálculo</h3>
        <div style="width: 100%;height: 1px;background: #007900;"></div>
      </div>
      <div v-if="produtosCalculo.length ==0">
        <p style="text-align: center;margin: 50px 0px;">Nenhum produto selecionado</p>
      </div>
      <div class="resultado" v-for="(s,i) in produtosCalculo" :key="i" >
        <p class="resultado-top">{{s.ncm}} - {{s.descricao}}</p>
        <div class="resultado-split" >
          <div>
            <p>Quantidade: <span>{{s.quantidade}}</span></p>
            <p>Valor Mercadoria: <span>{{s.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</span></p>
            <p>IPI: <span>{{s.ipi}}</span></p>
            <p>Frete: <span>{{s.frete.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</span></p>
            <p>Despesas Acessórias: <span>{{s.despesasAcessorias.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</span></p>
          </div>
          <div>
            <p>Alíquota Interna UF Destino: <span>{{s.aliquotaInterna}}</span></p>
            <p>Redução da Base de Cálculo ICMS Próprio: <span>{{s.reducaoICMS}}</span></p>
            <p>Redução da Base de Cálculo ST: <span>{{s.reducaoST}}</span></p>
            <p>CEST: <span>{{s.cest}}</span></p>
            <p>MVA: <span>{{s.mva.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</span></p>
          </div>
        </div>
      </div>
      <div style="display: flex;align-items: center;justify-content: flex-end;">
        <button class="resultados-selecionar" @click="finalizarCalculo">
          <i class="el-icon-loading" v-if="spiner"></i> 
           Finalizar Cálculo</button>
      </div>
    </div>
    <div class="backTrans" :style="{'display': backTransMva ?  'flex' : 'none'}">
      <div class="painel" style="max-width: 345px;">
        <div class="ncmSelect">
          <p><span style="font-weight:bold;">Selecione a MVA</span> </p> <i class="el-icon-close" style="color: rgb(255, 255, 255);font-weight: bold;font-size: 24px;" @click=" backTransMva = false"></i>
        </div> 
        <div style="min-height: 100px;padding: 10px;font-size: 30px;display: flex;justify-content: center;flex-direction: column;">
          <div style="">
            <el-radio-group v-model="radioMva">
              <el-radio  v-for="(m,i) in produtoSelecionado.mva" :label="m.mva" :key="i" style="margin-top:15px;"> {{ m.mva }}{{  m.especificacao != null ? ' - '+m.especificacao : ''}}</el-radio>       
            </el-radio-group>
          </div>
          <div style="display: flex;justify-content: flex-end;">
            <button class="resultados-selecionar" @click="continuarMva" style="margin-top:15px">
               Continuar
            </button>
          </div>
         
        </div>
      </div>
     
    </div>
    <div class="backTrans" :style="{'display': backTrans ?  'flex' : 'none'}"><!--v-bind:class="backTrans && 'on'"-->
        <div class="painel">
          <div class="ncmSelect">
            <p><span style="font-weight:bold;">Mercadoria Selecionada</span> | MVA interna: {{radioMva}}</p> <i class="el-icon-close" style="color: rgb(255, 255, 255);font-weight: bold;font-size: 24px;" @click="troca(false)"></i>
          </div>            
          <div class="bloco">
              <label for="">Valor da Mercadoria ( Unitário )</label>
              <br>              
              <money3  v-model="valorMercadoria" v-bind="money3 "></money3 >
          </div>
          <div class="bloco">
              <label for="">IPI</label>
              <br>
              <input type="text" v-model="ipi">
          </div>
          <div class="bloco">
              <label for="">Quantidade</label>
              <br>
              <input type="text" v-model="quantidade">
          </div>
          <div class="bloco">
              <label for="">Despesas Acessórias</label>
              <br>
              <money3  v-model="despesasAcessorias" v-bind="money3 "></money3 >
          </div>
          <div class="bloco">
              <label for="">Frete</label>
              <br>
              <money3  v-model="frete" v-bind="money3 "></money3 >
          </div>
          <div class="bloco">
              <label for="">Fundo de Combate a Probreza</label>
              <br>              
              <money3  v-model="fundoCombatePobreza" v-bind="money3 "></money3 >
          </div>
          <div class="bloco">
              <label for="">Desconto Incondicional (%)</label>
              <br>
              <input type="text" v-model="descontoIncondicional" />
          </div>
          <div class="bloco">
              <label for="">Alíquota Interna UF destino (%)</label>
              <br>
              <input type="text" v-model="aliquotaInterna" />
          </div>
          <div class="bloco">
              <label for="">Redução da Base de Cálculo ICMS Próprio (%)</label>
              <br>
              <input type="text" v-model="reducaoBaseCalculoIcms" />
          </div>
          <div class="bloco">
              <label for="">Redução da Base de Cálculo ST</label>
              <br>
              <input type="text" v-model="reducaoBaseCalculoSt" />
          </div>
          <div style="max-width: 400px;margin: 20px auto;position: relative;display: flex;align-items: center;">
            <label class="container-checkbox">
              <input type="checkbox" checked="checked" id="mercadoriaImportada">
              <span class="checkmark"></span>
            </label>
            <p style="font-weight: bold;color: #707070;font-size: 15px;"> Mercadoria Importada ( Resolução SF nº 13/2012)</p>
          </div>
          <div style="max-width: 400px;margin: 20px auto;">
            <button class="resultados-selecionar" @click="adicionarProduto">
               Selecionar
            </button>
          </div>          
        </div>
      </div>
  </div>
</template>

<script>
import {Money3Component } from 'v-money3'
import TableDiv from '@/components/TableDiv.vue'
export default {
  components: {'money3': Money3Component,TableDiv},
  data(){
    return{
      loading:true,
      radioMva:0,
      backTransMva:false,
      mvaSelecionada:{},
      spiner:false,
      money3 : {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: '',
          precision: 2,
          masked: false
      },
      valorMercadoria:'',
      ipi:0,
      quantidade:0,
      despesasAcessorias:'',
      frete:'',
      descontoIncondicional:0,
      aliquotaInterna:0,
      fundoCombatePobreza:0,
      reducaoBaseCalculoIcms:0,
      reducaoBaseCalculoSt:0,
      backTrans:false,
      produtos:[],
      produtoSelecionado:{},
      produtosCalculo:[]
    }
  },
  
  head() {
    return {
      title: "LEFISC | ST | Simulador de Cálculo | Encontrados"
    };
  },
  
  methods:{
    pegarTela(event){
    /* console.log(event,document.querySelector('.painel'))
      if(document.querySelector('.painel') != event.target.offsetParent){
        console.log('vindo')
        this.backTransMva = true
      }*/      
    },
    continuarMva(){
      this.radioMva
      if(this.radioMva != 0){
        this.backTransMva = false
        this.backTrans = true
        window.scrollTo(0,0)
      }
    },
    troca(bool){
      this.backTrans = bool
    },  
    async finalizarCalculo(){
      if(this.produtosCalculo.length !=0){
      this.spiner = true
      const objCalculoEnvio ={
        "dados":{},
        "mercadorias":[]
      }      
      const obj = JSON.parse(localStorage.getItem('simulador')) 
      objCalculoEnvio.dados= obj
      console.log(obj)
      for(let p of this.produtosCalculo){
        objCalculoEnvio.mercadorias.push({
          "produto":p.produto,
          "valorUnitario":p.valor,
          "ipi":p.ipi,
          "quantidade":p.quantidade,
          "despesasAcessorias":p.despesasAcessorias,
          "frete":p.frete,
          "descontoIncondicional":p.descontoIncondicional,
          "aliquotaInterna":p.aliquotaInterna,
          "reducaoICMS":p.reducaoBaseCalculoIcms,
          "reducaoST":p.reducaoBaseCalculoSt,
          "fundoCombatePobreza":p.fundoCombatePobreza,
          "importada":p.importada,
          "mva":parseFloat(this.radioMva)
        })
      }
      localStorage.setItem('mercadorias',JSON.stringify([]))
      //localStorage.setItem('simulador',JSON.stringify([]))
      this.$store.commit('simulador/setCarrinhoSimulador', 0)
      await this.$store.dispatch('simulador/getCalculoFinalizado',objCalculoEnvio)   
      this.spiner = false
    }else{
      this.$notify.error({
          title: 'Invalido',
          message: 'Nenhuma mercadoria selecionada',
          
        });
    }
      
    },
    adicionarProduto(){
      this.produtosCalculo.push({
        "produto":this.produtoSelecionado.id,
        "valor":this.valorMercadoria,
        "ipi":this.ipi,
        "quantidade":this.quantidade,
        "despesasAcessorias":this.despesasAcessorias,
        "frete":this.frete,
        "descontoIncondicional":this.descontoIncondicional,
        "aliquotaInterna":this.aliquotaInterna,
        "reducaoICMS":this.reducaoBaseCalculoIcms,
        "reducaoST":this.reducaoBaseCalculoSt,
        "cest":this.produtoSelecionado.cest,
        "ncm":this.produtoSelecionado.ncm,
        "descricao":this.produtoSelecionado.descricao,
        "fundoCombatePobreza":this.fundoCombatePobreza,
        "importada":document.querySelector('#mercadoriaImportada').checked,
        "mva":this.radioMva
      })
      localStorage.setItem('mercadorias',JSON.stringify(this.produtosCalculo))
      this.$store.commit('simulador/setCarrinhoSimulador', this.produtosCalculo.length)
      this.$store.commit('simulador/setCalculo', this.produtosCalculo)
      this.backTrans = false
    },
    selecionar(obj){      
      this.produtoSelecionado = obj
      
      if(this.produtoSelecionado.mva.length == 1){
        this.mvaSelecionada  = this.produtoSelecionado.mva[0]
        this.backTrans = true
        window.scrollTo(0,0)
        document.querySelector('#mercadoriaImportada').checked = false
      }else{
        document.querySelector('#mercadoriaImportada').checked = false
        window.scrollTo(0,0)
        this.backTransMva = true
      }
    }
  },
  async mounted(){
    const obj = JSON.parse(localStorage.getItem('simulador'))    
    obj.isProduto = false
    this.$store.dispatch('simulador/getProdutos',obj)    
    let mercadorias = localStorage.getItem('mercadorias')    
      if(mercadorias != null){
        mercadorias = JSON.parse(mercadorias)
        this.produtosCalculo = mercadorias
      } 
  }
}
</script>

<style scoped>
.el-radio__input.is-checked .el-radio__inner {
    border-color: #007900 !important;
    background: #007900 !important;
}
.el-radio__input.is-checked+.el-radio__label {
    color: #000;
}
.el-radio{
  display: flex;
}
.el-radio__inner{
  border: 1px solid #8a8a8a !important;
}
.container-checkbox {
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  height: 21px;
  font-size: 16px;
  font-weight: bold;
    color: #707070;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


.container-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}


.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background: #C4C4C4;
border: 1px solid #000000;
}

.container-checkbox:hover input ~ .checkmark {
  background-color: #ccc;
}


.container-checkbox input:checked ~ .checkmark {
  background-color: #007900;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}


.container-checkbox input:checked ~ .checkmark:after {
  display: block;
}


.container-checkbox .checkmark:after {
  left: 6px;
    top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.bloco{
  max-width: 400px;
  margin: 14px auto;
}
.bloco label{
  font-weight: bold;
  color: #707070;
  font-size: 15px;
}
.bloco input{
  background: #F0FFF0;
    border: 1px solid #007900;
    border-radius: 5px;
    width: 100%;
    padding: 5px;
    
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 0px;
}
.el-form--label-top .el-form-item__label{
  padding:0 !important;
}
 .el-form-item__label{
  line-height: 30px !important;
}
 .el-input__inner{
  height: 25px !important;
  line-height: 25px !important;
}
 .el-form-item__content{
  line-height: 0px !important;
}
.outside {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.encontrados-title{
  display: grid;
  grid-template:
    'd h';
    grid-template-columns: auto 1fr;
    margin-bottom: 10px;
    align-items: center;
}
.resultados-title{
  display: grid;
  grid-template:
    'd h';
    grid-template-columns: auto 1fr;
    margin-bottom: 10px;
    align-items: center;
}
.resultados-title h3,
.encontrados-title h3 {
  font-size: 20px;
  color: #007900;
  margin-right: 10px;
  
}
.resultados-title hr,
.encontrados-title hr {
  border: 0;
  height: 2px;
  background-color: #007900;
}
.encontrados-table > div {
  display: grid;
  grid-template-columns: 5fr 1fr 1fr 1fr 1fr;
  align-items: center;
  gap: 6px;
}
.encontrados-table > div:nth-child(even) {
  background-color: #DBFFDB;
}
.encontrados-head {
  font-weight: 700;
  padding: 12px 12px 4px 12px;
}
.encontrados-body {
  padding: 12px;
  font-size: 14px;
}
.encontrados-selecionar {
  width: 100%;
  color: #FFF;
  padding: 8px 0;
  font-weight: 700;
  background-color: #007900;
  border: 1px solid #005700;
  border-radius: 5px;
}
.encontrados-selecionar:hover {
  background-color: #008600;
  cursor: pointer;
}
.resultados-selecionar {
  color: #FFF;
  padding: 8px 16px;
  font-weight: 700;
  background-color: #007900;
  border: 1px solid #005700;
  border-radius: 5px;
  cursor: pointer;
}
.resultado {
  background-color: #DBFFDB;
  margin: 12px 0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.resultado-top {
  font-weight: 700;
}
.resultado-split {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.resultado-split div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.resultado-split p {
  font-weight: 400;
  font-weight: 700;
}
.resultado-split span {
  font-weight: 300;
}
</style>