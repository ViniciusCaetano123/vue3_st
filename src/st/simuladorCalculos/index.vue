<template>
  <div id="simuladorCalculo">
      <Titulo titulo="Tipo de Operação" img="tipoOp.svg" style="margin-top:20px" :exibirImg="true" />  
      <form   ref="form" >
        <select placeholder="Tipo de Operação" v-model="form.tipoOperacao" @change="changeOperacao">
          <option label="MVA - Operações Internas " value="1"></option>
          <option label="MVA - Operações Interestaduais " value="2"></option>
          <option label="MVA Regularização - Mercadoria oriunda de outra UF" value="3"></option>
        </select>    
      </form>  
      <Titulo titulo="UF de origem e UF destino" img="ufOrigemDestino.svg" style="margin-top:20px" :exibirImg="true" />  
      <form ref="form">     
        <form-item label="UF Origem:">
          <select placeholder="Selecione" v-model="form.ufOrigem" >
            <option v-for="(estado,i) in estados" :label="estado.estado" :value="estado.id" :key="i"></option>
          </select>
        </form-item>
        <form-item label="UF Destino:"  >
          <select placeholder="Selecione" v-model="form.ufDestino" :disabled="form.tipoOperacao == 1">
            <option v-for="(estado,i) in estados" :label="estado.estado" :value="estado.id" :key="i"></option>
          </select>
        </form-item>
      </form>   
      <Titulo titulo="Informações Complementares" img="infoCom.svg" style="margin-top:20px" :exibirImg="true" /> 
      <select placeholder="Selecione" v-model="form.infoComplementares" :disabled="form.tipoOperacao == 1" >
        <option label="Fornecedor Geral (Destinatário uso e consumo ou ativo imobilizado)" value="1" ></option>
        <option label="Fornecedor Geral - Venda (Destinatário comercializará as mercadorias)" value="2" ></option>
        <option label="Fornecedor Simples Nacional (Destinatário uso e consumo ou ativo imobilizado)" value="3"></option>
        <option  label="Fornecedor Simples Nacional - Venda (Destinatário comercializará as mercadorias) " value="4"></option>
        <option v-if="form.tipoOperacao == 1" :selected="form.tipoOperacao ==1" label="MVA Interna" value="5" ></option>
      </select>
      <Titulo titulo="NCM do produto" img="ncm.svg" style="margin-top:20px" :exibirImg="true" /> 
      <input placeholder="Digite os 4 primeiros dígitos da NCM que deseja consultar" v-model="form.ncm" style="max-width: 400px;" maxlength="4" minlength="4">
      <p style="font-size:12px;margin-top:5px;">Obs: Utilize apenas os 4 primeiros dígitos da NCM.</p>
      <br>
      <p style="margin-top:20px;margin-bottom:0px;font-weight: bold;">{{$store.state.txtResultErro}}</p>
      <button class="btnBuscar" :loading="spiner" @click="buscar()">
        <i class="icon-loading" v-if="spiner"></i> Buscar
      </button>
      <div class="backTrans" :style="{'display': backTrans ?  'flex' : 'none'}"><!--v-bind:class="backTrans && 'on'"-->
        <div class="painel">
          <div class="ncmSelect">
            <p><span style="font-weight:bold;">Simulador</span> </p> <i class="icon-close" style="color: rgb(255, 255, 255);font-weight: bold;font-size: 24px;" @click="troca(false)"></i>
          </div>           
          <div style="margin:20px auto;display: flex;align-items: center;justify-content: center;">
            <div style=" display: flex;align-items: flex-end;flex-direction: column;">
              <p style="font-size: 19px;font-weight: bold;padding: 10px;">Você possui uma simulação em andamento, deseja continuar de onde parou?</p>
              <div>
                <button style="margin-right: 14px;background: #158415;color: #fff;border: none;padding: 10px;width: 100px;border-radius: 5px;cursor:pointer;" @click="continuar">Sim</button>
                <button style="background: #3e616e;color: #fff;border: none;padding: 10px;width: 180px;border-radius: 5px;cursor:pointer;" @click="limparCarrinho">Não, limpar carrinho.</button>
              </div>
            </div>
          </div>          
      </div>
  </div>
  </div>
</template>

<script>
import Titulo from '@/components/Titulo.vue'
export default {
  components:{Titulo},
  data(){
    return{
      backTrans:false,
      estados:[
  {
    "id": 1,
    "estado": "Acre",
    "sigla": "AC",
    "capital": "Rio Branco",
    "codigoIBGE": 12
  },
  {
    "id": 2,
    "estado": "Alagoas",
    "sigla": "AL",
    "capital": "Maceió",
    "codigoIBGE": 27
  },
  {
    "id": 3,
    "estado": "Amapá",
    "sigla": "AP",
    "capital": "Macapá",
    "codigoIBGE": 16
  },
  {
    "id": 4,
    "estado": "Amazonas",
    "sigla": "AM",
    "capital": "Manaus",
    "codigoIBGE": 13
  },
  {
    "id": 5,
    "estado": "Bahia",
    "sigla": "BA",
    "capital": "Salvador",
    "codigoIBGE": 29
  },
  {
    "id": 6,
    "estado": "Ceará",
    "sigla": "CE",
    "capital": "Fortaleza",
    "codigoIBGE": 23
  },
  {
    "id": 7,
    "estado": "Distrito Federal",
    "sigla": "DF",
    "capital": "Brasília",
    "codigoIBGE": 53
  },
  {
    "id": 8,
    "estado": "Espírito Santo",
    "sigla": "ES",
    "capital": "Vitória",
    "codigoIBGE": 32
  },
  {
    "id": 9,
    "estado": "Goiás",
    "sigla": "GO",
    "capital": "Goiânia",
    "codigoIBGE": 52
  },
  {
    "id": 10,
    "estado": "Maranhão",
    "sigla": "MA",
    "capital": "São Luís",
    "codigoIBGE": 21
  },
  {
    "id": 11,
    "estado": "Mato Grosso",
    "sigla": "MT",
    "capital": "Cuiabá",
    "codigoIBGE": 51
  },
  {
    "id": 12,
    "estado": "Mato Grosso do Sul",
    "sigla": "MS",
    "capital": "Campo Grande",
    "codigoIBGE": 50
  },
  {
    "id": 13,
    "estado": "Minas Gerais",
    "sigla": "MG",
    "capital": "Belo Horizonte",
    "codigoIBGE": 31
  },
  {
    "id": 14,
    "estado": "Pará",
    "sigla": "PA",
    "capital": "Belém",
    "codigoIBGE": 15
  },
  {
    "id": 15,
    "estado": "Paraíba",
    "sigla": "PB",
    "capital": "João Pessoa",
    "codigoIBGE": 25
  },
  {
    "id": 16,
    "estado": "Paraná",
    "sigla": "PR",
    "capital": "Curitiba",
    "codigoIBGE": 41
  },
  {
    "id": 17,
    "estado": "Pernambuco",
    "sigla": "PE",
    "capital": "Recife",
    "codigoIBGE": 26
  },
  {
    "id": 18,
    "estado": "Piauí",
    "sigla": "PI",
    "capital": "Teresina",
    "codigoIBGE": 22
  },
  {
    "id": 19,
    "estado": "Rio de Janeiro",
    "sigla": "RJ",
    "capital": "Rio de Janeiro",
    "codigoIBGE": 33
  },
  {
    "id": 20,
    "estado": "Rio Grande do Norte",
    "sigla": "RN",
    "capital": "Natal",
    "codigoIBGE": 24
  },
  {
    "id": 21,
    "estado": "Rio Grande do Sul",
    "sigla": "RS",
    "capital": "Porto Alegre",
    "codigoIBGE": 43
  },
  {
    "id": 22,
    "estado": "Rondônia",
    "sigla": "RO",
    "capital": "Porto Velho",
    "codigoIBGE": 11
  },
  {
    "id": 23,
    "estado": "Roraima",
    "sigla": "RR",
    "capital": "Boa Vista",
    "codigoIBGE": 14
  },
  {
    "id": 24,
    "estado": "Santa Catarina",
    "sigla": "SC",
    "capital": "Florianópolis",
    "codigoIBGE": 42
  },
  {
    "id": 25,
    "estado": "São Paulo",
    "sigla": "SP",
    "capital": "São Paulo",
    "codigoIBGE": 35
  },
  {
    "id": 26,
    "estado": "Sergipe",
    "sigla": "SE",
    "capital": "Aracaju",
    "codigoIBGE": 28
  },
  {
    "id": 27,
    "estado": "Tocantins",
    "sigla": "TO",
    "capital": "Palmas",
    "codigoIBGE": 17
  },
  {
    "id": 28,
    "estado": "Nacional",
    "sigla": "NA",
    "capital": "Brasília",
    "codigoIBGE": 1058
  }
        ],
      txt:'',
      spiner:false,
      form:{
        infoComplementares:'',
        tipoOperacao:'',
        ufOrigem:'',
        ufDestino:'',
        ncm:'',
        impostoBase:false
      }
    }
  },
  head() {
    return {
      title: "LEFISC | ST | Simulador de Cálculo"
    };
  },
  methods:{
    troca(e){
      this.backTrans = e
    },
    limparCarrinho(){
      localStorage.setItem('mercadorias',JSON.stringify([]))
      localStorage.setItem('simulador',JSON.stringify([]))
      this.$store.commit('simulador/setCarrinhoSimulador',0)
      this.backTrans = false
    },
    continuar(){
            
      
      this.$router.push({name:'st-simuladorCalculos-ncm-encontrados'})
    },
    changeOperacao(){
      if(this.form.tipoOperacao == 1){
        this.form.infoComplementares = '5'
        this.form.ufDestino= ''
      }else{
        this.form.infoComplementares = ''
      }
    },
    async buscar(){
      this.spiner = true
      if(this.form.ncm == ''){
       // this.$store.commit('simulador/setTxtResultado', 'Digite a ncm')
        this.spiner = false
      }else if(this.form.tipoOperacao == ''){
       // this.$store.commit('simulador/setTxtResultado', 'Selecione a operação')
        this.spiner = false
      }
      else {
        const obj = {
            "operacao":parseInt(this.form.tipoOperacao),
            "origem": this.form.ufOrigem,
            "destino": this.form.ufDestino,
            "informacoesComplementares":parseInt(this.form.infoComplementares),
            "posicao":this.form.ncm,
            "impostoBase": this.form.impostoBase
          }
        //localStorage.setItem('simulador',JSON.stringify(obj))
        obj.isProduto = true
      //  await this.$store.dispatch('simulador/getProdutos',obj)        
        this.spiner = false       
      }      
    },
  },
  mounted(){
    let mercadorias = localStorage.getItem('mercadorias')  
    if(mercadorias != null){
      mercadorias = JSON.parse(mercadorias)
      if(mercadorias.length !=0){
        this.backTrans = true
      }
    }else{
      //this.$store.commit('simulador/setCarrinhoSimulador',0)
    }
    this.form.ncm = '4016'
    this.form.ufOrigem = 21
    this.form.ufDestino = 1
    this.form.tipoOperacao = '2'
    this.form.infoComplementares = '2'
    
  }
}
</script>

<style>
.radio__inner {
    border: 1px solid #8e8e8e !important;
}
.form--labtop .form-item__label{
  padding: 0px;
  font-weight: bold;
}
#simuladorCalculo .select {
  display: inline-block;
  position: relative;
  width: 100%;
  max-width: 400px;
}
.form-item--mini.form-item{
  margin-top:10px;
}
.uf {
  display: flex;
  position: relative;
}
.uf label {
  position: absolute;
  background: #fff;
  left: 12px;
  font-size: 14px;
}
.uf select {
  width: 400px;
  padding: 8px;
  border: 1px solid #007900;
  border-radius: 5px;
}
</style>

