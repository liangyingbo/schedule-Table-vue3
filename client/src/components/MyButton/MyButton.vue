<template>
 
    <button :class="`my-button btn-${type}`">
      <slot></slot>
    </button>

</template>

<script setup>
import './index.scss'
import {ref,reactive} from 'vue'
const props = defineProps({
    type:String
})
</script>
<style lang='scss' scoped>

</style>