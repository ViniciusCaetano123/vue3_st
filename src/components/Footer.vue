<template>
  <footer>
    <p>Copyright LEFISC - Legislação Fiscal - Todos os Direitos Reservados</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
  footer {
    width: 100%;
    height: 64px;
    background: #f1f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    bottom: 0;
    border-top: 1px solid #007900;
  }
  footer p {
    font-size: 16px;
    font-weight: 500 !important;
  }
</style>