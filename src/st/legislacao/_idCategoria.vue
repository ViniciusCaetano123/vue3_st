<template>
  <section>
    <div>      
      <Titulo :titulo="legislacoes.estado" exibirImg="true" img="" />
      {{ legislacoes }}
      <div v-for="legislacao, indexI in legislacoes.conteudo" :key="indexI" class="divLeg">       
        <a :href="legislacao.link" target="_blank" rel="noopener noreferrer" class="textLeg"><span>{{ legislacao.titulo+'/'+legislacao.ano }}</span>{{ ' - '+legislacao.ementa }}</a>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/services/api.js'
import Titulo from '@/components/Titulo.vue'

export default {
  components: {Titulo},
  data() {
    return {
      legislacoes: []
    }
  },
  async mounted() {
    this.legislacoes = await api.getLegislacoes(this.$route.params.idCategoria, 1000)
  }
}
</script>

<style>

</style>
