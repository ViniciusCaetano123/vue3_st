<template>
  <div>
    <div class="videos">
          <div>
            <img src="@/static/videoImg.svg" alt="">
            <p>Tutorial Substituição Tributária</p>
          </div>
          <div>
            <img src="@/static/videoImg.svg" alt="">
            <p>Tutorial Substituição Tributária</p>
          </div>
          <div>
            <img src="@/static/videoImg.svg" alt="">
            <p>Tutorial Substituição Tributária</p>
          </div>
          <div>
            <img src="@/static/videoImg.svg" alt="">
            <p>Tutorial Substituição Tributária</p>
          </div>
          <div>
            <img src="@/static/videoImg.svg" alt="">
            <p>Tutorial Substituição Tributária</p>
          </div>
          <div>
            <img src="@/static/videoImg.svg" alt="">
            <p>Tutorial Substituição Tributária</p>
          </div>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.videos{
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(250px, 1fr));
  gap: 10px;
  background: #C7E7C7;
  border-radius: 5px;  
  padding:10px;
  justify-content: space-between;
}
.videos div{
  background: #F8F8F8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  cursor: pointer;
}
.videos div p{
  color:var(--cinza);
  font-size: var(--font12);
  font-weight: 700;
  text-align: center;
  margin: 15px 10px;
  text-align: center;
}
.videos div img{
  border-radius: 5px 5px 0px 0px;
  width: 100%;
}
</style>