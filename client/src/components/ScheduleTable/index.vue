<template>
  <table border="1" cellpadding="0">
    <week-title></week-title>
    <tr v-for="item of duration" :key="item.id">
      <duration-title :time="item.time"></duration-title>
      <td v-for="n in 7" :key="n" @click="schdedultTDclick(item.begin_time, n)">
        <schedult-card
          v-if="schedult[item.begin_time + '_' + n]"
          :data="schedult[item.begin_time + '_' + n]"
          @remove-card="removeCard"
        >
        </schedult-card>
      </td>
    </tr>
  </table>
</template>

<script setup>
import "./styles/index.scss";
import weekTitle from "./weekTitle.vue";
import durationTitle from "./DurationTitle";
import schedultCard from "./SchedultCard";
import MyMessageBox from "../MyMessageBox";
import MyForm from "./MyForm.vue";
import { useInitialData, useFormData } from "./scripts/hooks";
import {
  getSchedultInitalData,
  upateSchult,
  removeSchult,
} from "./scripts/server";
import { hasSchedultData } from "./scripts/utils";

import { ref, reactive, onMounted, toRefs, h, toRaw } from "vue";

const [data, setInitialData, setSchultData] = useInitialData();
const [setFormData] = useFormData();

const schdedultTDclick = (begin_time, weekDay) => {
  const schedultData = data.schedult[`${begin_time}_${weekDay}`];
  MyMessageBox({
    title: hasSchedultData(schedultData),
    cancelBtnText: "取消",
    confirmBtnText: "提交",
    insert: h(MyForm, {
      schedult: schedultData,
      beginTime: begin_time,
      weekDay,
      course: data.course,
      teacher: data.teacher,
      onFormData: setFormData,
    }),
    confirmClick: async () => {
      if (Object.keys(data.formData).length === 0) {
        setFormData({
          weekday: weekDay,
          begin_time,
          course: data.course[0].name,
          teacher: data.teacher[0].name,
        });
      }
      const res = await upateSchult(toRaw(data.formData));
      // console.log(res)
      setFormData({});
      setSchultData(res);
    },
  });
};

const removeCard = async (data) => {
  const res = await removeSchult(data.id);
  res.result = data
  setSchultData(res);
};

onMounted(async () => {
  //    const [] = await useInitialData(state)
  setInitialData(await getSchedultInitalData());
});

const { duration, teacher, course, schedult } = toRefs(data);
// console.log(schedult)
</script>
<style lang="scss" scoped></style>
