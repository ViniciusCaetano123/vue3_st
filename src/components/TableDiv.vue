<template>
    <div >     
      <div class="header-resultado">
          <div class="nfe">
             NCM	
          </div>
          <div class="dest" style="padding: 15px 10px;">
              CEST
          </div>
          <div class="produto">
              Descrição	
          </div>
          <div class="ncm"  :style="{'max-width': '100px'}">
              MVA 
          </div> 
          <div class="selecionar" v-if="!exibitBtn">

          </div>         
      </div>  
      <div class="ronaldo">    
       <div v-for="(n,i) in dados" :key="i" style="margin-bottom:5px;">
          <div class="body-resultado" >
              <div class="nfe" > 
                <p v-for="(m,k) in n.ncm" :key="k" style="margin: 5px 0px;">{{m}}</p>           
              </div>
              <div  class="dest" v-html="n.cest">            
              </div>
              <div  class="produto" v-html="n.descricao" ></div>
              <div class="ncm" :style="{'max-width': '100px'}">
                <div style="width:68px">
                    <div v-for="(m,k) in n.mva" :key="k" :style="{'width': !exibitBtn ? '68px' : 'auto','justify-content': !exibitBtn ? 'space-between' : 'space-between'}" class="divInfo" >                                        <p>{{m.mva}}</p>
                        <div class="imgInfo" v-if="m.especificacao!= null">
                        <img src="../assets/info.svg" alt="" style="width: 20px;margin-left:10px" />
                        <el-popover   placement="top-start" trigger="hover">
                            <div>
                                {{ m.especificacao }}
                            </div>
                        <el-button style="width: 19px; height: 19px;border-radius: 25px;font-size: 11px;position: absolute;right: 0;background: #007900;color: #fff;display: flex;align-items: center;justify-content: center;">i</el-button></el-popover>
                        </div>
                    </div>
                </div>
                
              </div>
              <div  class="selecionar" v-if="!exibitBtn">
                <button @click="$emit('btnSimuladorSelecionar',n)">Selecionar</button>
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
  .selecionar button{
    color: #FFF;
    padding: 8px 16px;
    font-weight: 700;
    background-color: #007900;
    border: 1px solid #005700;
    border-radius: 5px;
    cursor: pointer;
  }
  .divInfo{
    width: 71px;
    margin: 5px 0px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;    
}
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
      font-size: 14px;
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
  .nfe{        
      
      width: 100%;  
      max-width: 210px;
      padding: 10px 10px;
      border-right:1px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .dest{
      max-width: 150px;
      width: 100%;
       padding: 10px 10px;
       border-right:1px solid #fff;
       display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      overflow: auto;
  }
  .ncm{
      max-width: 75px;
      width: 100%;
       padding: 0px 5px;
       display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      min-width: 75px;
  }
  .produto{      
      width: 100%;
       padding: 10px 5px;
       border-right:1px solid #fff;
       display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-width: 111px;
      overflow: auto;
  } 
  </style>