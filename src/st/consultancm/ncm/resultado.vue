<template>
  <div>
    <div>
    <div>
      <div class="toptUltNcm">
        <p>
          <span style="font-weight:600;">NCM {{$route.params.ncm}}</span>
          <!-- <span v-if="form.ufOrigem != undefined && form.ufDestino != undefined">{{form.ufOrigem}} para {{form.ufDestino}}</span> -->
          <button @click="alterarNCM()" style="display: flex;align-items: center;justify-content: space-evenly;">
            <img src="https://www.lefisc.com.br/st/images/retacionar.svg" alt=""> 
            <div>Alterar NCM</div>
          </button>
        </p>
      </div>  
    </div>
    <div>
        <div class="backGround">
            <p>Descrição:</p> <p> Geradores de corrente alternada de potência não superior a 75 kva.</p>
        </div>
        
        <div class="backGround">
            <p>NCM:</p> <p> 8501</p>
        </div>
        
        <div class="backGround">
            <p>CEST:</p> <p> 01.118.00</p>
        </div>
        
        <div class="backGround">
            <p>MVA Interna:</p> <p> 61,75%</p>
        </div>
        <div class="backGround">
            <p>IPI:</p> <p> 0</p>
        </div>
        <div class="backGround">
            <p>Alíquota ICMS (UF Destino):</p> <p>Geradores de corrente alternada de potência não superior a 75 kva</p>
        </div>
    </div>
  </div>
  <div class="section-two">
    <div class="results-title">
      <div>
          <div>
              <div></div>
              <div></div>
          </div>
          <div>
              <h3>Estados Signatários</h3>
          </div>
      </div>
      <hr>
    </div>
    <div class="results-card">  
      <div>
          <p><span>Substituição Tributária: </span>NCM/8501.10.19 - RICMS/PI - Anexo V-A Item I - Autopeças: "Máquina" de vidro elétrico de porta</p>
      </div>
      <div>
          <p><span>MVA Interna: </span>40%</p>
          <p><span>MVA Ajustada 4%: </span>63.9%</p>
          <p><span>MVA Ajustada 7%: </span>58.78%</p>
          <p><span>MVA Ajustada 12%: </span>50.24%</p>
      </div>
      <div>
          <p><span>MVA Ajustada com base na alíquota interna do ICMS sem considerar os adicionais previstos na legislação</span></p>
      </div>
    </div>
    <div class="results-card">
      <div class="results-estados">
        <div v-for="(estado, index) in estados" :key="index">
          <div><p>{{ estado.uf }}</p></div>
          <div><img :src="index%2 == 0 ? 'https://www.lefisc.com.br/st/images/true.svg' : 'https://www.lefisc.com.br/st/images/false.svg'" alt=""></div>
        </div>
      </div>
      <div class="results-legenda">
        <div>
          <img src="https://www.lefisc.com.br/st/images/true.svg" alt="">
          <p>Incide Substituição Tributária</p>
        </div>
        <div>
          <img src="https://www.lefisc.com.br/st/images/false.svg" alt="">
          <p>Não incide Substituição Tributária</p>
        </div>
        <div>
          <img src="https://www.lefisc.com.br/st/images/line.svg" alt="">
          <p>UF de Origem</p>
        </div>
      </div>
    </div>
    <div class="results-card">
      <div class="results-obs">
        <p><span>Observações: </span></p>
        <p>Protocolo ICMS nº 195/09 - Amapá, Minas Gerais, Paraná, Rio de Janeiro e Rio Grande do Sul.</p>
        <p>Protocolo ICMS nº 169/12 - São Paulo.</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      estados: [
        { uf: 'AC', nome: 'Acre' },
        { uf: 'AL', nome: 'Alagoas' },
        { uf: 'AP', nome: 'Amapá' },
        { uf: 'AM', nome: 'Amazonas' },
        { uf: 'BA', nome: 'Bahia' },
        { uf: 'CE', nome: 'Ceará' },
        { uf: 'DF', nome: 'Distrito Federal' },
        { uf: 'ES', nome: 'Espirito Santo' },
        { uf: 'GO', nome: 'Goiás' },
        { uf: 'MA', nome: 'Maranhão' },
        { uf: 'MS', nome: 'Mato Grosso do Sul' },
        { uf: 'MT', nome: 'Mato Grosso' },
        { uf: 'MG', nome: 'Minas Gerais' },
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
      ]
    }
  },
  mounted(){
    this.$emit('')
  },
  methods: {
    alterarNCM() {
      this.$router.push({name: 'st-consultancm'})
    }
  },  
  head() {
    return {
        title: "LEFISC | ST | Consulta NCM"
    };
  },
}
</script>

<style>
.backGround{
    display: flex;
    padding:20px;
    margin-bottom:10px;
    font-size: 14px;
    background: #DBFFDB;
}
.backGround p:nth-child(1){
    font-weight: bold;
}
.backGround p:nth-child(2){
    margin-left: 5px;
}
.toptUltNcm{
  display: flex;
  align-items: flex-end;
  border-bottom: 2px solid #007900;
  padding-bottom: 10px;
  font-size: 18px;
  margin-bottom: 12px;  
}
.toptUltNcm p{
  margin-left: 10px;
  color: #007900;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.toptUltNcm span{
  margin-right: 15px;
}
.toptUltNcm button{
  width: 120px;
  font-size: 12px;
  border: none;
  color: #fff;
  background: #007900;
  border-radius: 5px;
  height: 24px;
  font-weight: 600;
  cursor: pointer;
}

.section-two {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.results-title h3 {
  display: flex;
  color: #007900;
  padding: 8px 12px;
}
.results-title hr {
  height: 2px;
  background: #007900;
  border: 0;
}
.results-card {
  background-color: #DBFFDB;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.results-card p span {
  font-weight: 700;
}
.results-estados {
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
}
.results-estados > div {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.results-estados > div > div {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #FFF;
  border: 1px solid #000;
  height: 32px;
}
.results-estados > div > div p {
  font-weight: 700;
}
.results-estados > div:first-child > div:first-child {
  border-radius: 5px 0px 0px 0px;
}
.results-estados > div:first-child > div:last-child {
  border-radius: 0px 0px 0px 5px;
}
.results-estados > div:last-child > div:first-child {
  border-radius: 0px 5px 0px 0px;
}
.results-estados > div:last-child > div:last-child {
  border-radius: 0px 0px 5px 0px;
}
.results-legenda {
  display: flex;
  gap: 20px;
}
.results-legenda > div {
  display: flex;
  justify-content: baseline;
  align-items: center;
  gap: 4px;
}
.results-legenda > div img {
  width: 16px;
}
.results-legenda > div p {
  font-size: 12px;
  color: #1d1d1d;
}
.results-obs {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>