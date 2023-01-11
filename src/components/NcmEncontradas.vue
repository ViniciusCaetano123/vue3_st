<template>
  <div class="ncmEncontradas" >
    <div v-if="loading" style="min-height: 250px;">
      <div v-if="msgErro" style="display:flex;aligns-itens:center;justify-content:center;">
        <p>{{msgErro}}</p>
      </div>
      <div v-else>
        <table> 
          <tr>
            <th style="text-align:center;">
              NCM
            </th>
            <th style="text-align:left;">
              CEST
            </th>
            <th style="text-align:left;">
              Descrição
            </th>
            <th style="text-align:left;" v-if="exibirMva">
              MVA
            </th>
            <th v-if="!exibirMva">
            </th>
          </tr>
          <tr v-for="(n,i) in dados" :key="i">
            <td style="text-align:center;">
              
            </td>
            <td style="text-align:left;">
              {{n.cest}}
            </td>
            <td style="text-align:left;">
              {{n.descricao}}
            </td>
            <td style="text-align:center;" v-if="exibirMva" >
              <div v-for="(m,k) in n.mva" :key="k" style="display: flex;align-items: center;    justify-content: space-between;" class="divInfo">                
                <p>{{m.mva}}</p>
                <div class="imgInfo" v-if="m.especificacao!= null">
                  <img src="../static/info.svg" alt="" style="width: 20px;margin-left:10px" />
                  <div class="inforAb" style="right: -14px;">
                  {{ m.especificacao }}
                </div>
                </div>
              </div>
            </td>
            <td v-if="!exibirMva">
              <button class="btnBuscar" style="padding: 5px 14px;" @click="$emit('selecione',n.ncm)">Selecione</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props:['exibirMva','loading','dados','msgErro']
}
</script>

<style>
.ncmEncontradas {
  min-height: 250px;
  font-size:14px
}
.ncmEncontradas table {
  border-spacing: 0px;
  width: 100%;
}
.ncmEncontradas td {
  padding:5px 5px;
  border: 1px solid #dfdfdf;
    border-width: 1px!important;
}
.ncmEncontradas th {
  padding:15px;
}
.ncmEncontradas tr:nth-child(even) {
	background-color:#DBFFDB;;
}


tr:hover{
    background: rgb(230, 230, 230) !important;
}
tr:nth-child(1){
  background-color: #fff !important;
}

</style>