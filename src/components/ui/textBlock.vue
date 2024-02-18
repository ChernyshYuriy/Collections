<script setup></script>
<template>
  <div class="text-block">
    <div class="text-block__header">
      <span class="title"> <slot name="header"></slot> </span>
    </div>
    <div class="text-block__body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-block {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__header {
    position: relative;
    & .title {
      display: block;
      width: 180px;
      text-align: center;
    }
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      height: 2px;
      width: calc(100vw / 2 - 100vw / 4);
      background-color: transparent;
      top: 50%;
    }
    &::before {
      left: 180px;
      background-image: linear-gradient(to left, transparent, black);
    }
    &::after {
      right: 180px;
      background-image: linear-gradient(to right, transparent, black);
    }
  }
  &__body {
  }
}
</style>
