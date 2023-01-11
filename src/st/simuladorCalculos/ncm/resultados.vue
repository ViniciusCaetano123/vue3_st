<template>
  <div class="outside">
    <div class="encontrados">
      <div class="encontrados-title">
        <h3>Dados da Simulação</h3>
        <div style="width: 100%;height: 1px;background: #007900;margin-left: 10px;"></div>
      </div>
      <div class="dadosSimulacao">
          <div class="blocoDados">
            <div  style="border-radius: 5px 0px 0px 0px;">Tipo de Operação </div><div>{{ simulador.destino == 1 ? 'MVA - Operações Internas':  simulador.destino == 2 ? 'MVA - Operações Interestaduais' : 'MVA Regularização - Mercadoria oriunda de outra UF' }}</div>
          </div>  
          <div class="blocoDados">
            <div>UF Origem </div><div>{{   estadoOrigem }}</div>
          </div> 
          <div class="blocoDados">
            <div>UF Destino </div><div>{{estadoDestino}}</div>
          </div> 
          <div class="blocoDados">
            <div>Informações Complementares </div><div>{{ informacoesComplementares }}</div>
          </div>     
          <div class="blocoDados" >
            <div style="border-radius: 0px 0px 0px 5px;">NCM </div><div style="border-bottom:1px solid #007900;padding:9px;padding-right: 10px;">{{ posicao }}</div>
          </div>    
        </div>
    </div>
    <div class="encontrados">
      <div class="encontrados-title">
        <h3>Resultados da Simulação</h3>
        <div style="width: 100%;height: 1px;background: #007900;margin-left: 10px;"></div>
      </div>
      <TableDivCalculoFinalVue :dados="$store.state.simulador.calculos.mercadorias" style="max-width: 1100px;"></TableDivCalculoFinalVue>
    </div>
    <div class="resultados">
      <div class="resultados-title">
        <h3>Valor Total</h3>
        <div style="width: 100%;height: 1px;background: #007900;margin-left: 10px;"></div>
      </div>
      <div class="resultados-body">
        <p><span>Valor Total dos Produtos: </span>{{$store.state.simulador.calculos.totalProdutos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
        <p><span>Base de Cálculo Débito Próprio: </span>{{$store.state.simulador.calculos.baseDebitoProprio.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
        <p><span>ICMS Próprio: </span>{{$store.state.simulador.calculos.icmsProprio.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
        <p><span>Base de Cálculo da Substituição Tributária: </span>{{$store.state.simulador.calculos.baseSubstituicaoTributaria.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
        <p><span>Valor da Substituição Tributária: </span>{{$store.state.simulador.calculos.valorSubstituicaoTributaria.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
        <br>
        <p><span>IPI: </span>{{$store.state.simulador.calculos.ipi.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
        <p><span>Frete: </span>{{$store.state.simulador.calculos.frete.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
        <p><span>Despesas Acessórias: </span>{{$store.state.simulador.calculos.despesasAcessorias.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
        <br>
        <p class="total"><span>Valor Total da Nota: </span>{{$store.state.simulador.calculos.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import TableDivCalculoFinalVue from '~/components/TableDivCalculoFinal.vue';
export default {
  components:{TableDivCalculoFinalVue},
  data(){
    return{
      simulador:{},
      estadoOrigem:'',
      estadoDestino:'',
      informacoesComplementares:'',
      posicao:''
    }
  },
  head() {
    return {
      title: "LEFISC | ST | Simulador de Cálculo"
    };
  },
  mounted(){
    this.simulador = JSON.parse(localStorage.getItem('simulador'))
    console.log(this.$store.state)
    console.log(this.$store.state.simulador.calculos.mercadorias)
    this.estadoOrigem = this.$store.state.simulador.estados.find(e=> e.id == this.simulador.origem).estado
    this.estadoDestino = this.$store.state.simulador.estados.find(e=> e.id == this.simulador.origem).estado
    this.informacoesComplementares =  this.simulador.informacoesComplementares == 1 ?'Fornecedor Geral (Destinatário uso e consumo ou ativo imobilizado)' : this.simulador.informacoesComplementares == 2 ? 'Fornecedor Geral - Venda (Destinatário comercializará as mercadorias)': this.simulador.informacoesComplementares == 3 ? 'Fornecedor Simples Nacional (Destinatário uso e consumo ou ativo imobilizado)' :'Fornecedor Simples Nacional - Venda (Destinatário comercializará as mercadorias) ';
    this.posicao = this.simulador.posicao
  }
}
</script>

<style scoped>
.dadosSimulacao{
  display: flex;
  flex-direction: column;
}
.dadosSimulacao .blocoDados{
  display: flex;
  max-width: 900px;
  align-items: center;
}
.dadosSimulacao .blocoDados div:nth-child(1){
  padding:10px;
  background: #007900;
  color:#fff;
  width: 270px;
  font-weight: 700;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.dadosSimulacao .blocoDados div:nth-child(2){
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-top:1px solid #007900;
  border-right:1px solid #007900;
  padding: 9.5px;
  box-sizing: content-box;
  width: 600px;
  font-size: 14px;
}
.outside {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.resultados-title h3,
.encontrados-title h3 {
  font-size: 20px;
  color: #007900;
}
.resultados-title hr,
.encontrados-title hr {
  border: 0;
  height: 2px;
  background-color: #007900;
  margin-bottom: 8px;
  margin-right: 10px;
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

.encontrados-table > div {
  display: grid;
  grid-template-columns: 8fr repeat(12, 1fr);
  align-items: center;
  gap: 6px;
}
.encontrados-table > div:nth-child(even) {
  background-color: #DBFFDB;
}
.encontrados-head {
  font-weight: 600;
  font-size: 12px;
  padding: 12px 12px 4px 12px;
}
.encontrados-body {
  padding: 5px;
  font-size: 12px;
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
}
.resultados-body {
  display: flex;
  flex-direction: column;
}
.resultados-body p {
  font-weight: 500;
  line-height: 28px;
}
.resultados-body span {
  font-weight: 700;
}
.resultados-body .total {
  font-size: 18px;
}
</style>