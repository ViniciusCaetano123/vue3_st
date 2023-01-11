<template>
    <div>
        <div class="linha">
            
            <p style="font-weight: 600;margin-right:10px;"  class="b" >Lista de Mercadorias do Estado {{estadoNome }}</p>
            <div class="a" style="width: 100%;height: 1px;background: #007900;"> </div>
        </div>
        
        <div class="listaCategoria">
            <div v-for="(n,i) in $store.state.simulador.categorias" :key="i" style="display: flex;margin-top:10px;cursor: pointer;" @click="irParaCategoria(n)" > 
                <p >{{ n.categoria }}</p> <span style="margin:0 10px;">-</span> <a class="link" >{{ n.lista }}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            estadoNome:''
        }
    },
    methods:{
        async irParaCategoria(n){
            let formListaMercadoria = JSON.parse(localStorage.getItem('formListaMercadoria'))
                localStorage.setItem('formListaMercadoria',JSON.stringify({
                    "uf":`${formListaMercadoria.uf}`,
                    "categoria":`${n.id}`
                }))
                this.$router.push({name:'st-mercadorias-estado-categoria',params:{'estado':formListaMercadoria.uf,'categoria':n.categoria}})
        }
    },  
    async mounted(){
        let formListaMercadoriaEstado = JSON.parse(localStorage.getItem('formListaMercadoria'))
        let result = this.$store.state.simulador.estados.find(e=> e.id == formListaMercadoriaEstado.uf)
        if(result){
            this.estadoNome  = result.estado
        }
        await this.$store.dispatch('simulador/getCategoriaUf',formListaMercadoriaEstado.uf) 
    }

}
</script>

<style>
.listaCategoria{
    background-color: #DBFFDB;
    padding: 25px;
    border-radius: 5px;
    font-size: 14px;
}
.link{
    font-weight: 600;
}
.a{
  grid-area: h;
}
.b{
  grid-area: d;
  display: flex;
    align-items: center;
}
.linha{
    display: grid;
  grid-template:
    'd h';
    grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: 10px;
}
.listaCategoria .link:hover{
    text-decoration: underline;
}
</style>