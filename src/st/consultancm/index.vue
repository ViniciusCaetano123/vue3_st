<template>
  <div>
      <Titulo titulo="Consulta por NCM" img="legislacaoH"></Titulo>
      <el-input v-on:keyup.enter="troca(true)" placeholder="Digite os 4 primeiros dígitos da NCM que deseja consultar" v-model="input" style="max-width: 400px;" maxlength="4" minlength="4"></el-input>
      <div>
      <div class="estadosMva">
        <div class="selecioneTodos">
          <p style="font-weight: bold;font-size: 16px;margin-right: 20px;">Selecione os Estados </p>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Selecione todos</el-checkbox>
        </div>
        <div style="display: flex;">
          <div>  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in this.estados[0]" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group></div>
          <div><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in this.estados[1]" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group></div>
          <div><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in this.estados[2]" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group></div>

        
          
          
        </div>
      </div>
        <button class="btnBuscar" style="margin-top:30px;" :loading="true" @click="buscar()">
          Buscar
        </button>
      </div>
      <p class="txtErro">{{txtErro}}</p>
  </div>
</template>

<script>
import Titulo from '@/components/Titulo'
import NcmEncontradas from '@/components/NcmEncontradas'
const cityOptions = ['Acre', 'Alagoas', 'Amapá', 'Amazonas','Bahia','Ceará','Distrito Federal','Espírito Santo','Goiás','Maranhão','Mato Grosso','Mato Grosso do Sul','Minas Gerais','Pará','Paraíba','Paraná','Pernambuco','Piauí','Rio de Janeiro','Rio Grande do Norte','Rio Grande do Sul','Rondônia','Roraima','Santa Catarina','São Paulo','Sergipe','Tocantins'];
export default {
  components:{Titulo, NcmEncontradas},
  data(){
    return{
      estados:[],
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      txtErro:'',
      msgErro:'',
      input:'',
      loading:false,      
    }
  },
  head() {
    return {
      title: "LEFISC | ST | Consulta NCM"
    };
  },
  methods:{   
    handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    async buscar(){          

            this.loading = false
           localStorage.setItem('consultaNcm',JSON.stringify({
            "ncm":this.input,
            "estados":this.checkedCities
           }))
           this.$router.push({name:'st-consultancm-ncm-dados'})
            // await this.$store.dispatch('simulador/getListaNcm') 
            this.loading = true
    }
  },
  mounted(){
    console.log(cityOptions)
    for (var i = 0; i < cityOptions.length; i = i + 9) {
        this.estados.push(cityOptions.slice(i, i + 9));
      }
  }
}
</script>


<style>
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #000 !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: var(--verde)  !important;
    border-color: var(--verde) !important;
}
.el-checkbox__inner{
  border: 1px solid #a5a5a5;
}
.el-checkbox{
  color:#000;
}
.selecioneTodos{
  display: flex;
  margin-bottom: 20px;
}
input[type=number] { 
  -moz-appearance: textfield;
  appearance: textfield;
  margin: 0; 
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
.ncmSelect{
  background: #007900;
  color: #fff;
  align-items: center;
  display: flex;
  padding: 30px;
  justify-content: space-between;
}
.ncmSelect p{
  font-size: 20px;
}
.ncmSelect i{
  cursor: pointer;
}
.btnBuscar{
  background: #007900;
  border-radius: 5px;
  color:#fff;
  border:none;
  font-weight: 600;
  padding: 10px 20px;
  cursor: pointer;
}
.estadosMva{
  display: flex;
    background-color: #DBFFDB;
    padding: 25px;
    border-radius: 5px;
    font-size: 14px;
    max-width: 550px;
    box-sizing: border-box;
    margin-top: 30px;
    flex-direction: column;
}
</style>