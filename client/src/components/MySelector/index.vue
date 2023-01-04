<template>

<div class="my-selector">
    <div class="select-box" @click="setOptions">{{ selectedValue }}</div>
    <div class="option-list" v-if="visible">
        <a class="option-item" href="javascript:;" v-for="item of data" :key="item.id" @click="select(item)">{{ item.name }} </a>
    </div>
</div>

</template>

<script setup>
import './index.scss'
import {ref,reactive, computed, toRefs} from 'vue'

const props = defineProps({
    data:Array,
    textKey:String,
    defaultValue:String
})

const state = reactive({
    selectedValue : props.defaultValue ?? props.data[0][props.textKey],
    visible:false
})

const emit = defineEmits(['update'])


const setVisible = (isvisible) => {
    state.visible = isvisible
}

const setOptions = () =>{
    setVisible(!state.visible)
}

function select(item){
  state.selectedValue = item.name
  setVisible(false)

  emit('update',item)
}




const { selectedValue,visible }  = toRefs(state)
</script>
<style lang='scss' scoped>

</style>