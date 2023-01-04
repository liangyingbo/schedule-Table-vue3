<template>
  <div class="my-form">
    <h1>{{ _weekDay }} {{ _beginTime }}</h1>
    <div class="selector-box">
      <my-selector
        :data="course"
        text-key="name"
        :default-Value="_course"
        @update="updateCourse"
      ></my-selector>
      <my-selector
        :data="teacher"
        text-key="name"
        :default-Value="_teacher"
        @update="updateTeacher"
      ></my-selector>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { weekdayToChiness, timeStampToTime } from "./scripts/utils";
import MySelector from "../MySelector/index.vue";
import "./styles/my-form.scss";
const props = defineProps({
  beginTime: Number,
  weekDay: Number,
  course: Array,
  teacher: Array,
  schedult: Object,
});

const emit = defineEmits(['FormData'])
const _weekDay = computed(() => weekdayToChiness(props.weekDay));
const _beginTime = computed(() => timeStampToTime(props.beginTime));
const _course = computed(() => props.schedult?.course ?? props.course[0].name);
const _teacher = computed(
  () => props.schedult?.teacher ?? props.teacher[0].name
);
const state = {
    course:_course,
    teacher:_teacher
}
const updateCourse = (course) => {
    console.log(course)
     state.course = course.name
     formData()
};

const updateTeacher = (teacher) => {
    state.teacher = teacher.name
    formData()

};

function formData(){
    emit('FormData',{
        weekday:props.weekDay,
        begin_time:props.beginTime,
        teacher:state.teacher,
        course:state.course
    })

}
</script>
<style lang="scss" scoped></style>
