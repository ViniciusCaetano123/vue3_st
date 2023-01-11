import { createApp } from 'vue'
import App from './App.vue'
import router  from './routes/index.js'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state : () => ({
        tipoMercadorias:[],
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
        produtos:[],
        estadoSignatarios:[],
        carrinhoSimulador:0,
        calculos:{
          "dados":{},
          "mercadorias":[],
          "totalProdutos":0,
          "baseDebitoProprio":0,
          "icmsProprio":0,
          "baseSubstituicaoTributaria":0,
          "valorSubstituicaoTributaria":0,
          "ipi":0,
          "frete":0,
          "despesasAcessorias":0,
          "total":0
        },
        txtResultErro:'',
        listaMercadoria:{},
        listaNcm:[],
        categorias:[]
      }),
       mutations :{
        setCategoriaUf(state,valor){
          state.categorias = valor
        },
        setListaNcm(state,valor){
          state.listaNcm = valor
        },
        setListaMercadoria(state,valor){
          state.listaMercadoria = valor
        },
        setTipoMercadoria(state,valor){
          state.tipoMercadorias = valor
        },
        setEstadosSignatarios(state,valor){
          state.estadoSignatarios = valor.estadosSignatarios
        },
        setEstado(state,valor) {
            state.estados = valor
        },
        setProduto(state,valor) {
            state.produtos = valor
        },
        setCarrinhoSimulador(state,valor) {
          state.carrinhoSimulador = valor
        },
        setCalculo(state,valor) {
          state.calculos.dados = valor.dados
          state.calculos.mercadorias = valor.mercadorias
          state.calculos.totalProdutos = valor.totalProdutos
          state.calculos.baseDebitoProprio = valor.baseDebitoProprio
          state.calculos.icmsProprio = valor.icmsProprio
          state.calculos.baseSubstituicaoTributaria = valor.baseSubstituicaoTributaria
          state.calculos.valorSubstituicaoTributaria = valor.valorSubstituicaoTributaria
          state.calculos.ipi = valor.ipi
          state.calculos.frete = valor.frete
          state.calculos.despesasAcessorias = valor.despesasAcessorias
          state.calculos.total = valor.total
        },
        setTxtResultado(state,valor) {
          state.txtResultErro = valor
        },    
      },
      actions : {   
        async getListaNcm(context){
          const lista=   await this.$axios.$get(`simulador/produto/1?categoria=1`);
          context.commit('setListaNcm',lista)
          this.$router.push({name:'st-consultancm-ncm-dados'})
        },
        async getCategoriaUf(context,uf){
          const lista=   await this.$axios.$get(`simulador/categoria/${uf}`);
          if(lista.length == 0){
            context.commit('setCategoriaUf',[])
          }else{
            context.commit('setCategoriaUf',lista)
          }
          
        },
        async getListaMercadoria(context,form){
          const lista=   await this.$axios.$get(`simulador/produto/${form.uf}/${form.categoria}`);
          context.commit('setListaMercadoria',lista[0])
          this.$router.push({name:'st-mercadorias-estado-categoria',params:{'estado':form.uf,'categoria':form.categoria}})
        },
        async getEstadosSignatarios(context,form){
          const estadoSignatarios =   await this.$axios.$get(`simulador/estado-signatario?uf=${form.uf}&categoria=${form.categoria}`);
          this.$router.push({name:'st-estadosSignatarios-categoria'})
          context.commit('setEstadosSignatarios',estadoSignatarios)
         
        },
        async getEstados(context) {
          const estados =   await this.$axios.$get('simulador/estados' );
          context.commit('setEstado',estados)
        },
        async getCalculoFinalizado(context,obj){
          const calculos =   await this.$axios.$post('simulador/carrinho',obj);
          context.commit('setCalculo',calculos)   
          this.$router.push({name:'st-simuladorCalculos-ncm-resultados',params:{'ncm':obj.dados.posicao}})
        },
        async getProdutos(context,form) {
          context.commit('setTxtResultado','')   
          if(context.state.produtos.length ==0 || form.isProduto){
            const formData= new FormData();
            formData.set("Operacao", form.operacao);
            formData.set("Origem", form.origem);
            formData.set("Destino", form.destino == ''? 0 : form.destino);
            formData.set("InformacoesComplementares", form.informacoesComplementares);
            formData.set("Posicao", form.posicao);
            formData.set("ImpostoBase",form.impostoBase);
              await this.$axios.$post('simulador/dados-iniciais',formData)
              .then(e=> {
                const produtos = e;
                context.commit('setProduto',produtos)   
                this.$router.push({name:'st-simuladorCalculos-ncm-encontrados'})
              })       
              .catch(e=>{
                context.commit('setTxtResultado',e.response.data.message)         
              })
          }
        }
      }
    
      
})
createApp(App).use(router).use(store).mount('#app')
