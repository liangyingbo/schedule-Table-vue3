<template>
     <td class='duration-title'
     >{{ time }}</td>
</template>

<script setup >
import {ref,reactive} from 'vue'
import './styles/duration-title.scss'
const props = defineProps({
time:{
  type:String
}
})
</script>
<style lang='scss' scoped>

</style>