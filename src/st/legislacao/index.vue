<template>
  <div>
    <ConteudoLM isLegislacao="true"></ConteudoLM>
  </div>
</template>

<script>
import ConteudoLM from '../../components/ConteudoLM.vue'

export default {
  components:{ConteudoLM},
  data() {
    return {
      title: "LEFISC | ST | Legislação",
    };
  },
}
</script>
