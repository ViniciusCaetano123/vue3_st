<template>
  <header>
    <div class="header">
      <div>
        <img @click="abrirLink('https://www.lefisc.com.br/')" src="https://www.lefisc.com.br/imagens/logoOriginal.png" alt="">
      </div>
      <div class="divider"></div>
      <div>
        <NuxtLink to="/st/">
          <h2 @click="trocaDeNome('Página Inicial')">Substituição Tributária</h2>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script>


export default {
  name: 'Header',
  methods: {
    abrirLink(link) {
      window.open(link, "_blank")
    },
    trocaDeNome(name) {
      this.$root.$refs.Layout.trocaDeNome(name)
    }
  }
}
</script>

<style scoped>
  header {
    height: 64px;
    background: #f1f1f1;

    display: flex;
    align-items: center;
    justify-content: left;
  }

  .header {
    
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;    
      
   padding:20px 92px;
  }

  h2 {
    font-weight: 500;
    font-size: 20px;
    color: black;
  }
  h2:hover {
    cursor: pointer;
  }

  .divider {
    width: 1px;
    height: 30px;
    background: #a3a3a3;
  }

  img {
    height: 26px;
  }
  img:hover {
    cursor: pointer;
  }
</style>