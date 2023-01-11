<template>
    <div>     
        
      <div class="header-resultado">
          <div class="produtoa" style="padding:15px 5px;">
             Produto	
          </div>
          <div class="ncma" style="max-width:63px">
              CEST
          </div>
          <div class="ncma"  style="max-width:30px">
              Qnt	
          </div>
          <div class="ncma" style="max-width:100px" >
            Valor Unitário 
          </div> 
          <div class="ncma" style="max-width:45px" >
            Alíq. Interna 
          </div>
          <div class="ncma" style="max-width:63px" >
            MVA
          </div>
          <div class="ncma"   style="max-width:50px">
            IPI
          </div>
          <div class="ncma"  style="max-width:95px">
            Despesas 
          </div>
          <div class="ncma"   style="max-width:68px">
            Frete 
          </div>
          <div class="ncma" style="max-width:90px" >
            Base ICMS Próprio 
          </div>
          <div class="ncma"  style="max-width:77px">
            ICMS Próprio 
          </div>
          <div class="ncma"  style="max-width:80px">
            Base ST
          </div>
          <div class="ncma"  style="border-right:0px;max-width:69px">
            ST
          </div>
                  
      </div>  
      <div class="ronaldo">    
       <div v-for="(n,i) in dados" :key="i" style="margin-bottom:5px;">
          <div class="body-resultado" style="    min-height: 55px;">                           
            <div class="produtoa">
             {{n.produto}}	
          </div>
          <div class="ncma" style="max-width:63px">
              {{ n.cest }}
          </div>
          <div class="ncma"  style="max-width:30px">
            {{ n.quantidade }}
          </div>
          <div class="ncma"  style="max-width:100px">
            {{ n.valorUnitario.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}
          </div> 
          <div class="ncma"  style="max-width:45px">
           {{ n.aliquotaInterna }} 
          </div>
          <div class="ncma"  style="max-width:63px">
            {{ n.mva.toFixed(2) }}
          </div>
          <div class="ncma"   style="max-width:50px">
            {{ n.ipi.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}
          </div>
          <div class="ncma"  style="max-width:95px">
            {{ n.despesasAcessorias.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }} 
          </div>
          <div class="ncma"  style="max-width:68px">
            {{ n.frete.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }} 
          </div>
          <div class="ncma"  style="max-width:90px">
           {{ n.baseICMSProprio.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}
          </div>
          <div class="ncma"  style="max-width:77px">
            {{ n.icmsProprio.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}
          </div>
          <div class="ncma"  style="max-width:80px">
            {{ n.baseST.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}
          </div>
          <div class="ncma"  style="border-right:0px;max-width:69px">
            {{ n.st.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}
          </div>
                       
          </div>          
      </div>
      </div>   
      <div class="footer-resultado">
                </div>
    </div>
  </template>
  
  <script>
  export default {    
    computed:{
        exibitBtn(){
            return this.$route.name == 'st-mercadorias-estado-categoria' 
        }
    },
      props: {         
          dados: Array,          
      },   
      data(){
          return{
            
          }
      },
      methods:{
    },
    mounted(){
        console.log()
    }
  }
  </script>
  
  <style> 

 .imgInfo .el-button{
    padding:0px;
    border:none;
 }
 
  .ronaldo{
      border: 1px solid #007900;
      padding: 5px;
      box-shadow: rgb(0 0 0 / 25%) 0px 4px 4px;
      background: #fff;   
  }
  .footer-resultado{
      padding-right: 5px;
      padding-left: 5px;
      border: 1px solid #007900;
      display: flex;
      border-top: 0;
      width: 100%;
      background: #007900;
      color: #FAF8FA;
      font-weight: bold;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border-bottom: 0;
       font-size: 14px;
  }
  .header-resultado{      
    padding: 0px 5px;
    box-sizing: border-box;
      display: flex;
      border-top: 0;
      width: 100%;
      background: #007900;
      color: #FAF8FA;
      font-weight: bold;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: 0;
  }
  .body-resultado:hover{
          background: #b8b8b8;;
  }
  .body-resultado{
      display: flex;
      width: 100%;
      background: #EEEEEE;;
      border-radius: 5px;  
      font-size: 13px;
      color:#393842;  
       border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
  }
  .selecionar{
    width: 100%;  
      max-width: 100px;
      padding: 10px 10px;
      border-left:1px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
}
 
  .ncma{
      max-width: 63px;
      width: 100%;
       padding: 0px 3px;
       display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      overflow: auto;
      font-size: 13px;
      border-right:1px solid #fff;
      text-align: center;
  }
  .produtoa{      
      width: 100%;
       padding: 5px 5px;       
       font-size: 14px;
       border-right:1px solid #fff;
       display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-width: 150px;
      max-width: 150px;
      overflow: auto;
  } 
  </style>