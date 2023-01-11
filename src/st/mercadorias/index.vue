<template>
  <div id="mercadoria">
    
    <div style="max-width: 350px; width: 100%;">
      <p style="font-weight: 600;margin-bottom: 10px;">Lista de Mercadorias por Categoria e UF</p>
      <!--<el-form ref="form">
      <el-form-item  >
          <el-select style="width: 100%;max-width: 320px;" placeholder="Selecione o estado" v-model="form.uf" @change="changeEstado">
            <el-option   value="0" label="Selecione o estado"> </el-option>
            <el-option v-for="(estado,i) in $store.state.simulador.estados" :label="estado.estado" :value="`${estado.id}`" :key="i"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item v-if="estadoSelected" >
        <el-select  style="width: 100%;max-width: 320px;" placeholder="Selecione a categoria" v-model="form.categoria" >
          <el-option   value="0" label="Selecione a categoria"> </el-option>
          <el-option v-for="(e,i) in $store.state.simulador.categorias" :label="e.categoria" :value="`${e.id}`" :key="i"> </el-option>
        </el-select>
      </el-form-item>
    </el-form> --> 
    <button class="btnBuscar" @click="buscar()" style="margin-top:30px;" :loading="spiner">
      <i class="el-icon-loading" v-if="spiner"></i> Buscar</button> 
    </div>
      <div style="margin-left: 55px;width:100%;">
        <p style="font-weight: 600;margin-bottom: 10px;">Lista de Mercadorias por UF</p>
    <div class="listaMercadoriaUf">
      <div  >
        <p style="font-weight: bold;margin-bottom: 10px;font-size: 16px;">Norte</p>
        <div v-for="(n,i) in regiao1" :key="i" class="estado" @click="estadoSelecionado(n)">
          {{ n.estado }}
        </div>
      </div>
      
      <div >
        <p style="font-weight: bold;margin-bottom: 10px;font-size: 16px;"> Nordeste</p>
        <div v-for="(n,i) in regiao2" :key="i" class="estado"  @click="estadoSelecionado(n)">
          {{ n.estado }}
        </div>
      </div>
      <div >
        <p style="font-weight: bold;margin-bottom: 10px;font-size: 16px;">Centro-Oeste</p>
        <div v-for="(n,i) in regiao3" :key="i" class="estado"  @click="estadoSelecionado(n)">
           {{ n.estado }}
        </div>
      </div>
      <div >
        <p style="font-weight: bold;margin-bottom: 10px;font-size: 16px;">Sudeste</p>
        <div v-for="(n,i) in regiao4" :key="i" class="estado"  @click="estadoSelecionado(n)">
           {{ n.estado }}
        </div>
      </div>
      <div >
        <p style="font-weight: bold;margin-bottom: 10px;font-size: 16px;">Sul</p>
        <div v-for="(n,i) in regiao5" :key="i" class="estado"  @click="estadoSelecionado(n)">
           {{ n.estado }}
        </div>
      </div>
      </div>
      </div>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      regioes:[],
      regiao1:[],
      regiao2:[],
      regiao3:[],
      regiao4:[],
      regiao5:[],
      estados:[],     
      estadoSelected:false,
      spiner:false,
      form:{
        categoria:'0',
        uf:'0'
      }
    }
  },
  head() {
    return {
      title: "LEFISC | ST | Mercadorias"
    };
  },
  methods:{
    async  estadoSelecionado(n){
      localStorage.setItem('formListaMercadoria',JSON.stringify({"categoria":"0",uf:n.id}))
      this.$router.push({name:'st-mercadorias-listaCategoria',params:{'listaCategoria':n.id}})
    },
    async changeEstado(){      
      this.estadoSelected = false
      try{
        await this.$store.dispatch('simulador/getCategoriaUf',this.form.uf) 
        this.form.categoria = '0'
        this.estadoSelected = true
      }catch(e){
        this.estadoSelected = true
      }
    },
    async buscar(){
      try{
        this.spiner = true
        localStorage.setItem('formListaMercadoria',JSON.stringify(this.form))
        this.$router.push({name:'st-mercadorias-estado-categoria',params:{'estado':this.form.uf,'categoria':this.form.categoria}})
        this.spiner = false
      }catch(e){
        this.spiner = false
      }
    }
  },
  async mounted(){
    for (var i = 0; i < this.$store.state.estados.length; i = i + 9) {
        this.estados.push(this.$store.state.estados.slice(i, i + 9));
    }
    await axios.get('https://www.lefisc.com.br/api/st/simulador/regioes')
    .then(e=>{
      this.regioes = e.data
      this.regiao1 = this.regioes[0].unidadesFederativas
      this.regiao2 = this.regioes[1].unidadesFederativas
      this.regiao3 = this.regioes[2].unidadesFederativas
      this.regiao4 = this.regioes[3].unidadesFederativas
      this.regiao5 = this.regioes[4].unidadesFederativas
    })
  }
}
</script>

<style>
#mercadoria{
  display: flex;
}
.listaMercadoriaUf{
  display: flex;
  background-color: #DBFFDB;
    padding: 25px;
    border-radius: 5px;
    font-size: 14px;
    justify-content: space-evenly;
}
.listaMercadoriaUf .estado{
  padding:2px;
  cursor: pointer;
  display: flex;
    align-items: center;
    gap:4px;
}
.listaMercadoriaUf .estado:hover{
  text-decoration: underline;
}

</style>