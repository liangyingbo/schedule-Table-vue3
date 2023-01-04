<template>
  <transition name="messagebox-fade">
    <div class="message-box" v-if="visible">
    <div class="wrapper">
      <header class="box-hd">{{ title }}</header>
      <div class="box-body">
        <component :is="insert"></component>
         <div class="btn-group">
          <my-button type="default" @click="cancelClick">{{
            cancelBtnText
          }}</my-button>
          <my-button type="primary" @click="confirmClick">{{
            confirmBtnText
          }}</my-button>
        </div>
      </div>
    </div>
  </div>
  </transition>
 
</template>

<script setup>
import MyButton from "../MyButton/MyButton.vue";
import "./index.scss";
import { ref, reactive, toRefs } from "vue";

const state = reactive({
  visible: false,
  type: "CONFIRM",
});

const props = defineProps({
  title: String,
  cancelBtnText: String,
  confirmBtnText: String,
  insert:Object
});

const setVisible = (isVisible) => {
  state.visible = isVisible;
};

const cancelClick = () => {
   state.type = 'CANCEL'
   setVisible(false)
};

const confirmClick = () => {
    state.type = "CONFIRM"
    setVisible(false)
};

defineExpose({
  setVisible,
  state
});

const { visible } = toRefs(state);
</script>
<style lang="scss" scoped></style>
