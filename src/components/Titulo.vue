<template>  
    <div class="toptUltLe">
      <div class="b">
        <img :src="'https://www.lefisc.com.br/st/images/'+img" style="margin-right: 5px;" v-if="exibirImg" width="30px"> <p >{{titulo}}</p>
      </div>
       <div class="a" style="width: 100%;height: 1px;background: #007900;"> </div>
    </div>  
</template>

<script>
export default {
props:['img','titulo','exibirImg']
}
</script>

<style>
.toptUltLe{
  display: flex;
  align-items: flex-end;
  padding-bottom: 6px;
  font-size: 16px;
  margin-bottom: 20px;
  margin-right: 10px;
  display: grid;
  grid-template:
    'd h';
    grid-template-columns: auto 1fr;
  align-items: center;
    
}
.toptUltLe p{  
  font-weight: 600;
  display: flex;
  width: 100%;
  color: #007900;
  margin-right:10px;
 
}
.toptUltLe .a{
  grid-area: h;
}
.toptUltLe .b{
  grid-area: d;
  display: flex;
    align-items: center;
}

</style>