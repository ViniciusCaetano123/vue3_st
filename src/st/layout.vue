<template>
    <div>
        <Header/>
        <header>
            <div class="header-local" :style="{'padding-right': txtAtual == 'Simulador de Cálculos' ? '20px': '90px'}">
                <img src="https://www.lefisc.com.br/st/images/logoSt.svg" alt="">
                <div class="barra">
                    <img :src="img" alt="" > <p> {{txtAtual}}</p>
                </div>
            </div>
            <div  class="carrinho" v-show="this.txtAtual == 'Simulador de Cálculos'" @click="irParaCarrinho">
              <div style="display: flex;justify-content: center;position: relative;" >
                <img src="https://www.lefisc.com.br/st/carrinho.png" alt=""> 
               <!-- <span >{{$store.state.simulador.carrinhoSimulador}}</span>-->
              </div>
              <p>Carrinho</p>
            </div>
        </header>
        <main>
        <div :class="{menu:true,abrirMenu:abrirMenu}">
            <i class="el-icon-s-fold hamburguer"  @click=" abrirMenu= false"></i>
            <div>
            <router-link >
            <div :class="{bloco:true,blocoClick: this.txtAtual == 'Página Inicial'}" @click="trocaDeNome('Página Inicial','https://www.lefisc.com.br/st/images/Home.svg')">
                    <img src="https://www.lefisc.com.br/st/images/Home.svg" v-if="this.txtAtual != 'Página Inicial'">
                    <img src="https://www.lefisc.com.br/st/images/HomeB.svg" v-else>
                    <span  class="txtMenu">Página Inicial</span>
            </div>
            </router-link>
            <!--<router-link to="/st/consultancm">
              <div :class="{bloco:true,blocoClick: this.txtAtual == 'Consulta por NCM'}" @click="trocaDeNome('Consulta por NCM')">
                      <img src="https://www.lefisc.com.br/st/images/consultaMVA.svg" v-if="this.txtAtual != 'Consulta por NCM'">
                      <img src="https://www.lefisc.com.br/st/images/consultaMVAB.svg" v-else>
                      <span  class="txtMenu">Consulta por NCM</span>
              </div>
              </router-link>-->
            <router-link  >
            <div :class="{bloco:true,blocoClick: this.txtAtual == 'Lista de Mercadorias'}"  @click="trocaDeNome('Lista de Mercadorias','https://www.lefisc.com.br/st/images/listaMercadoria.svg')">
                    <img src="https://www.lefisc.com.br/st/images/listaMercadoria.svg"  v-if="this.txtAtual != 'Lista de Mercadorias'">
                    <img src="https://www.lefisc.com.br/st/images/listaMercadoriaB.svg"  v-else>
                    <span  class="txtMenu">Lista de Mercadorias</span>
            </div>
            </router-link>
            <router-link >
            <div :class="{bloco:true,blocoClick: this.txtAtual == 'Estados Signatáros'}"  @click="trocaDeNome('Estados Signatáros','https://www.lefisc.com.br/st/images/estadoS.svg')">
                <img src="https://www.lefisc.com.br/st/images/estadoS.svg"  v-if="this.txtAtual != 'Estados Signatáros'">
                <img src="https://www.lefisc.com.br/st/images/estadoSB.svg"  v-else>
                <span  class="txtMenu">Estados Signatáros</span>
            </div>
            </router-link>
            <router-link>
            <div :class="{bloco:true,blocoClick: this.txtAtual == 'Simulador de Cálculos'}"  @click="trocaDeNome('Simulador de Cálculos','https://www.lefisc.com.br/st/images/simuladorCalculos.svg')">
                <img src="https://www.lefisc.com.br/st/images/simuladorCalculos.svg"   v-if="this.txtAtual != 'Simulador de Cálculos'">
                <img src="https://www.lefisc.com.br/st/images/simuladorCalculosB.svg"  v-else>
                <span  class="txtMenu">Simulador de Cálculos</span>
            </div>
            </router-link>
            <router-link  @click="trocaDeNome('Legislação da ST')">
                  <div :class="{bloco:true,blocoClick: this.txtAtual == 'Legislação da ST'}"  @click="trocaDeNome('Legislação da ST','https://www.lefisc.com.br/st/images/legislacao.svg')">
                <img src="https://www.lefisc.com.br/st/images/legislacao.svg"   v-if="this.txtAtual != 'Legislação da ST'">
                <img src="https://www.lefisc.com.br/st/images/legislacaoB.svg"  v-else>
                <span  class="txtMenu">Legislação da ST</span>
            </div>
            </router-link>
           <!-- <router-link to="/st/materias/">
            <div :class="{bloco:true,blocoClick: this.txtAtual == 'Matérias Práticas'}"  @click="trocaDeNome('Matérias Práticas')">
                <img src="https://www.lefisc.com.br/st/images/materiasPraticas.svg"  v-if="this.txtAtual != 'Matérias Práticas'">
                <img src="https://www.lefisc.com.br/st/images/materiasPraticasB.svg"  v-else>
                <span  class="txtMenu">Matérias Práticas</span>
            </div>
            </router-link>   -->    
            <div :class="{bloco:true}" @click="irParaLinkExterno('https://www.lefisc.com.br/ncm/')">
                <img src="https://www.lefisc.com.br/st/images/aliquotasICMS.svg" >
                <span  class="txtMenu">Alíquotas do ICMS</span>
            </div>
            <div :class="{bloco:true}" @click="irParaLinkExterno('https://www.lefisc.com.br/cliente/legislacao/186280/1')"> 
                <img src="https://www.lefisc.com.br/st/images/convenio.svg" >
                <span  class="txtMenu">Convênio 142/18</span>
            </div>  
            <!--<router-link to="/st/videos/" @click="trocaDeNome('Videos')">
                <div :class="{bloco:true,blocoClick: this.txtAtual == 'Videos'}"  @click="trocaDeNome('Videos')">
                <img src="https://www.lefisc.com.br/st/images/videosT.svg" v-if="this.txtAtual != 'Videos'">
                <img src="https://www.lefisc.com.br/st/images/videosTB.svg" v-else>
                <span  class="txtMenu">Videos</span>
            </div>    
            </router-link>   -->
            </div>
        </div>
        <section class="conteudo"> 
            <i class="el-icon-s-unfold hamburguer" @click="abrirMenu = true"></i>
            <Transition name="slide-fade">
                <router-view />
            </Transition>
        </section>
        </main>
        <Footer/>
    </div>
    </template>
    
    <script>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    
    export default {
        created() {
            //this.$root.$refs.Layout = this;
        },
        components: {
            Header,
            Footer
        },
        data() {
          return {
            abrirMenu:false,
            isCollapse: true,
            imgStatic:'https://www.lefisc.com.br/st/images/Home.svg',
            txtAtual:'',
            objRouter:{
              'st': function(){
                return 'Página Inicial'
              },
              'st-consultancm':function(){
                return 'Consulta MVA'
              },
              'st-consultancm-ncm-dados':function(){
                return 'Consulta MVA'
              },
              'st-consultancm-ncm-resultado':function(){
                return 'Consulta MVA'
              },
              'st-mercadorias':function(){
                return 'Lista de mercadoria'
              },
              'st-mercadorias-estado-categoria':function(){
                return 'Lista de mercadoria'
              },
              'st-mercadorias-listaCategoria':function(){
                return 'Lista de mercadoria'
              },
              'st-estadosSignatarios':function(){
                return 'Estados Signatáros'
              },
              'st-estadosSignatarios-categoria':function(){
                return 'Estados Signatáros'
              },
              'st-simuladorCalculos':function(){
                return 'Simulador de Cálculos'
              },
              'st-simuladorCalculos-ncm-encontrados':function(){
                return 'Simulador de Cálculos'
              },
              'st-simuladorCalculos-ncm-resultados':function(){
                return 'Simulador de Cálculos'
              },
              'st-materias':function(){
                return 'Simulador de Cálculos'
              },
              'st-legislacao':function(){
                return 'Legislação da ST'
              },
              'st-legislacao-idCategoria':function(){
                return 'Legislação da ST'
              },
              'st-videos':function(){
                return 'Videos'
              },
            }
          };
        },
        methods: {
          irParaLinkExterno(link){
            window.open(link,'_blank')
          },
          irParaCarrinho(){
            let mercadorias = localStorage.getItem('mercadorias')    
            if(mercadorias != null ){
              mercadorias = JSON.parse(mercadorias)
              let simulador = JSON.parse(localStorage.getItem('simulador'))
              if(mercadorias.length != 0){
                this.$router.push({name:'st-simuladorCalculos-ncm-encontrados',params:{'ncm':simulador.posicao}})
              }          
            }
          },
          trocaDeNome(nome,img){
            this.txtAtual = nome
            this.img = img
          },
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          }
        },
        mounted(){        
        //  this.txtAtual = this.objRouter[this.$route.name]()    
          let mercadorias = localStorage.getItem('mercadorias')    
          if(mercadorias != null){
            mercadorias = JSON.parse(mercadorias)
            if(mercadorias.length != 0){
            //  this.$store.commit('simulador/setCarrinhoSimulador', mercadorias.length)
            }
          }
        }
       
    }
    </script>
    
    <style>
    .carrinho{
      padding: 20px 4px;
      padding-right: 90px;
      font-weight: bold;
      position: relative;
      display: flex;
      align-items: flex-end;
    }
    .carrinho span{
        font-size: 16px !important;
        position: absolute;
        font-size: 20px;
        color: #facf0b;
        margin-left: 5px;
    }
    .el-form-item__label{
        color: var(--cinza);
       font-size: var(--font12);
    }
    .el-input__inner::-webkit-input-placeholder {
       color: var(--cinza);
       font-size: var(--font12);
       
    }
    
    .el-input__inner:-moz-placeholder {
       color: var(--cinza);
       font-size: var(--font12);
    }
    
    .el-input__inner:-ms-input-placeholder {
        color: var(--cinza);
        font-size: var(--font12);
    }
    .txtErro{
      color: var(--cinza);
        font-weight: bold;
        margin-top: 15px;
    }
    .slide-fade-enter-active {
      transition: all .3s ease-in;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
      transform: translateX(10px);
      opacity: 0;
    }
    .el-popper[x-placement^=bottom] .popper__arrow::after {
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: var(--verde);
    }
    .el-select-dropdown__list{
        padding:0px;
    }
    .el-select-dropdown__item.selected {
      color: var(--cinza);
      font-weight: 700;
    }
    .el-select-dropdown__item {
      background: #F0FFF0;
      border: 1px solid var(--verde);
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
        background-color: var(--verde);
        color: #fff !important;
    }
    .hamburguer{
        display: none;
    }
    .el-select .el-input .el-select__caret {
        color: var(--cinza);
        font-size: 22px;
        transition: transform .3s;
        transform: rotateZ(180deg);
        cursor: pointer;
        font-weight: bold;
    }
    @media screen and (max-width: 550px) {
      .menu{
        position: fixed;
        transition: 0.5s all;
        height: 100vh;
        top: 0;
        left:-300px;
        z-index: 999;
      }
      .hamburguer{
        margin: 10px 0px;
        display: block;
        font-size: 28px;
        cursor: pointer;
      }
    }
    div.abrirMenu{
        left:0px;
    }
    .el-input__inner{
    border-color: none;;
    border: 1px solid var(--verde);
    border-radius: 5px;
    }
    
    header{
        background: var(--verde);
        display: flex;
        align-items: flex-end;
    }
    header .header-local{
        padding: 20px 20px;
        padding-left: 90px;
        box-sizing: content-box;
        width: 100%;
    }
    header .header-local .barra{
        background: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 6px 6px;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    header .header-local .barra p{
        font-weight: bold;
        color: var(--verde);
    }
    section.conteudo{
        padding:20px;
        width: 100%;
    }
    *{
      font-family: Arial;
      margin:0px;
      padding: 0px;
      text-decoration: none;
      outline: none !important;  
    }
    main{
        display: flex;
       height: 100%;
        width: 100%;
        min-height: 71vh;
    }
    .menu{
        display: flex;
        align-items: flex-start;
        padding:0px 10px;background:  #DBFFDB;
        padding-bottom: 13px;
        border-right: 1px solid var(--verde);
        flex-direction: column;
    }
    .menu .txtMenu {
        font-weight: 700;
        color: var(--verde);
        font-size: 13px;
        margin-left: 10px;
        text-align: center;
    }
    .bloco:hover .txtMenu {
        text-decoration: underline;
    }
    .menu  div.bloco {
        background: #fff !important;
        border: 1px solid var(--verde);
        box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
        border-radius: 5px;
        margin-top:13px;
        background: #DBFFDB;
        padding: 10px;    
        display: flex;
        width: 185px;
        align-items: center;
        cursor: pointer;
    }
    .menu div.blocoClick{
        background: var(--verde) !important;
    }
    .menu div.blocoClick span.txtMenu{
        color:#fff !important;
    }
    :root {  
      --verde: #007900;
      --cinza: #333;
      --font12:12px;
    }
    .ncmSelect{
      background: #007900;
      color: #fff;
      align-items: center;
      display: flex;
      padding: 10px;
      justify-content: space-between;
    }
    .ncmSelect p{
      font-size: 20px;
    }
    .ncmSelect i{
      cursor: pointer;
    }
    </style>