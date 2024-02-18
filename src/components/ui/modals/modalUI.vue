<template>
  <div class="modal-backdrop" @click="emit('close')">
    <div class="modal" @click.stop="">
      <header class="modal-header">
        <div class="modal-header__title">
          <slot name="header"> This is the default title! </slot>
        </div>
        <button type="button" class="btn-close" @click="hideModal()">x</button>
      </header>

      <section class="modal-body">
        <slot name="body"> This is the default body! </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["close"]);
function hideModal() {
  emit("close");
}
</script>
<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
  &__title {
    text-align: center;
    width: 100%;
  }
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
