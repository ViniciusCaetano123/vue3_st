<template>
  <div>
    <div class="filtro">
      <p>Filtrar por UF:</p>
      <!-- <el-checkbox-group v-model="checkedEstado" >
        <el-checkbox v-for="estado in estados" :label="estado.uf" :key="estado.uf">{{estado.uf}}</el-checkbox>
      </el-checkbox-group> -->
      <div class="estadosLeg">
        <input type="checkbox" name="FED" id="FED" v-model="checkedEstadoAll" @change="changeChecked(0)">
        <label for="FED">TODOS</label>
      </div>
      
      <div class="estadosLeg" v-for="estado, index in categoriaLegislacoes" :key="index">
        <input type="checkbox" v-if="estado.disabled" :name="estado.uf" :id="estado.uf" disabled>
        <input type="checkbox" v-else :name="estado.uf" :id="estado.uf" v-model="checkedEstado[estado.id]" @change="changeChecked(1)">
        <label :for="estado.uf">{{ estado.uf }}</label>
      </div>
    </div>
    <!-- <button @click="testest()"></button>legislacao.estado -->
    <div v-for="legislacaoEstados, indexIE in legislacoes.filter((legislacao, indexLeg) => checkedEstado[legislacao.categoria])" :key="indexIE">
      <Titulo :titulo="legislacaoEstados.estado" exibirImg="true" style="margin-top:30px" :img="'BR-'+$store.state.estados.find(e=> e.estado == legislacaoEstados.estado).sigla+'.svg'" /><!--estados.find(estado => estado.uf == legislacaoEstados.sigla).nome-->
      
      <div v-for="legislacao, indexI in legislacaoEstados.conteudo" :key="indexI" class="divLeg">
        <a :href="legislacao.link" target="_blank" rel="noopener noreferrer" class="textLeg"><span>{{ legislacao.titulo+' nº '+legislacao.numero+'/'+legislacao.ano }}</span>{{ ' - '+legislacao.ementa+(legislacao.ementa[legislacao.ementa.length - 1] == '.'?'':'...') }}</a>
      </div>
      <p class="todasLeg" @click="getLegislacoes(legislacaoEstados.categoria)">Ver todas as legislações</p>
    </div>
    <!-- <div v-for="legislacaoEstados, indexIE in legislacoes.filter((legislacao, indexLeg) => checkedEstado[indexLeg])" :key="indexIE">
      <Titulo :titulo="legislacaoEstados.estado" exibirImg="true" style="margin-top:30px" />
      <div v-for="legislacao, indexI in legislacaoEstados.conteudo" :key="indexI" class="divLeg">
        <a :href="legislacao.link" target="_blank" rel="noopener noreferrer" class="textLeg"><span>{{ legislacao.titulo+'/'+legislacao.ano }}</span>{{ ' - '+legislacao.ementa+(legislacao.ementa[legislacao.ementa.length - 1] == '.'?'':'...') }}</a>
      </div>
      <p class="todasLeg" @click="getLegislacoes(legislacaoEstados.categoria)">Ver todas as legislações</p>
    </div> -->
  </div>
</template>

<script>
import api from '@/services/api.js'
import Titulo from '@/components/Titulo.vue'

export default {
  components: {Titulo},
  data() {
    return {
      gambiarraFalse: false,
      checkedEstado: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
      checkedEstadoAll: true,
      estados: [
        { uf: 'AC', nome: 'Acre' },
        { uf: 'AL', nome: 'Alagoas' },
        { uf: 'AP', nome: 'Amapá' },
        { uf: 'AM', nome: 'Amazonas' },
        { uf: 'BA', nome: 'Bahia' },
        { uf: 'CE', nome: 'Ceará' },
        { uf: 'DF', nome: 'Distrito Federal' },
        { uf: 'ES', nome: 'Espírito Santo' },
        { uf: 'GO', nome: 'Goiás' },
        { uf: 'MA', nome: 'Maranhão' },
        { uf: 'MG', nome: 'Minas Gerais' },
        { uf: 'MS', nome: 'Mato Grosso do Sul' },
        { uf: 'MT', nome: 'Mato Grosso' },
        { uf: 'PA', nome: 'Pará' },
        { uf: 'PB', nome: 'Paraíba' },
        { uf: 'PR', nome: 'Paraná' },
        { uf: 'PE', nome: 'Pernambuco' },
        { uf: 'PI', nome: 'Piauí' },
        { uf: 'RJ', nome: 'Rio de Janeiro' },
        { uf: 'RN', nome: 'Rio Grande do Norte' },
        { uf: 'RS', nome: 'Rio Grande do Sul' },
        { uf: 'RO', nome: 'Rondônia' },
        { uf: 'RR', nome: 'Roraima' },
        { uf: 'SC', nome: 'Santa Catarina' },
        { uf: 'SP', nome: 'São Paulo' },
        { uf: 'SE', nome: 'Sergipe' },
        { uf: 'TO', nome: 'Tocantins' }
      ],
      legislacoes: [],
      categoriaLegislacoes: []
    };
  },
  async mounted() {
    console.log('vindo')
    this.categoriaLegislacoes = await api.getCategoriaLegislacoes()
    this.legislacoes = await api.getLegislacoes(null, 5)
    console.log(this.$store.state)


    this.categoriaLegislacoes = this.categoriaLegislacoes.map((categoriaLeg, ) => {
      const infos = this.estados.find((estado, ) => estado.nome == categoriaLeg.categoria.substring(5, categoriaLeg.categoria.length))
      const hasLegislacao = this.legislacoes.find((legislacao, ) => categoriaLeg.id == legislacao.categoria)
      
      return {
        ...categoriaLeg,
        ...infos,
        disabled: hasLegislacao == undefined ? true : false
      }
    })
    
    
  },
  methods: {
    async getLegislacoes(categoriaParam) {
      this.$router.push({name:'st-legislacao-idCategoria',params:{'idCategoria': categoriaParam}})//this.categoriaLegislacoes.find(categoriaLeg => categoriaLeg.nome == categoriaParam).id}})
      // this.legislacoes = await api.getLegislacoes(categoria, 100)
      // this.legislacoes = legislacoes.sort((x, y) => x.sigla == firstUF ? -1 : y.sigla == firstUF ? 1 : 0 )
    },
    changeChecked(option) {
      if (option == 0) {
        if (this.checkedEstadoAll) {
          this.checkedEstado = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
        } else {
          this.checkedEstado = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
        }
      } else {
        if (this.checkedEstado.findIndex(estado => !estado) == -1) {
          this.checkedEstadoAll = true
        } else {
          this.checkedEstadoAll = false
        }
      }
    },
    testest() {
      console.log(this.categoriaLegislacoes)
    }
  },
}
</script>

<style>
.filtro {
  background: #DBFFDB;
  border: 1px solid var(--verde);
  border-radius: 5px;
  font-size: 14px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.filtro p {
  font-weight: bold;
  color:var(--verde);
}
.filtro p:first-child {
  font-weight: bold;
  color:var(--verde);
  padding-right: 8px;
}
.estadosLeg {
  display: flex;
}
.estadosLeg input[type="checkbox"] {
  width: 12px;
}
.estadosLeg label {
  font-size: 12px;
  color: var(--verde);
  margin-left: 2px;
}
/* .filtro span{
  color:var(--verde);
  font-size: var(--font12)!important;
}
.filtro .el-checkbox{
      margin-right: 10px;
} */
.txtMat{
  text-decoration: underline;
  color:var(--cinza);
  font-weight: 600;
  font-size: var(--font12);
  /* margin-bottom: 23px; */
}
.divLeg {
  margin-bottom: 12px;
}
.textLeg {
  text-align: justify;
  font-size: 14px;
  color: black;
}  
.textLeg span {
  font-weight: 700;
  color:var(--cinza);
}
.textLeg:hover {
  text-decoration: underline;
}
.todasLeg {
  color: #007900;
}
.todasLeg:hover {
  text-decoration: underline;
  cursor: pointer;
}

</style>