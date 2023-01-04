<template>
  <div class="schedult-card">
    <i class="icon" @click.stop="reomveCard()">&times;</i>
    <p>{{ weekDay }} {{ beginTime }}</p>
    <p>[{{ data.course }}]</p>
    <p>{{ data.teacher }}</p>
  </div>
</template>

<script setup >
import "./styles/schedult-card.scss";
import { computed, h } from "vue";
import { weekdayToChiness, timeStampToTime } from "./scripts/utils";
import MyMessageBox from "../MyMessageBox";

const props = defineProps({
  data: Object,
});

const emit = defineEmits(["removeCard"]);

function reomveCard() {
  MyMessageBox({
    title: "确定要删除吗",
    message: "",
    cancelBtnText: "取消",
    confirmBtnText: "确定",
    insert: h("p", { title: "messageBox" }, "确定要删除此课程"),
    confirmClick: () => {
      emit("removeCard", props.data);
    },
  });
}

const weekDay = computed(() => weekdayToChiness(props.data.weekday));
const beginTime = computed(() => timeStampToTime(props.data.begin_time));
</script>
<style lang="scss" scoped></style>
