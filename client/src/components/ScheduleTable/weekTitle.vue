<template>

<tr>
    <th></th>
    <th class="week-title" v-for="day of weekDay" :key="day.id">{{ day.name }}</th>
</tr>

</template>

<script setup >
import './styles/week-title.scss'
import weekDay from '../../../data/week'

</script>
<style lang='scss' scoped>

</style>