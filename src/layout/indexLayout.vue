<script setup></script>

<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 1400px;
  margin: 20px auto 40px;
}
@media screen and (max-width: 1440px) {
  .container {
    width: 1200px;
    margin: 12px auto 12px;
  }
}
@media screen and (max-width: 1440px) {
  .container {
    width: 1180px;
  }
}
@media screen and (max-width: 1200px) {
  .container {
    width: 98vw;
  }
}
</style>
