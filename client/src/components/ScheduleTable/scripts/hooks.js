import { onMounted, reactive } from 'vue'

let state = reactive({ duration: [], teacher: [], schedult: [], course: [], formData: {} });

export const useInitialData = () => {
    // const data = await getSchedultInitalData();

    function setIninialData(data) {
        state.duration = data.duration;
        state.teacher = data.teacher;
        state.schedult = data.schedult,
        state.course = data.course
    }

    function setSchedultData({ type, result }) {
       const {begin_time,weekday,teacher,course} = result
       const mark = `${begin_time}_${weekday}`
       const schedult = state.schedult[mark]
       switch(type){
        case 'ADD':
            state.schedult[mark] = result
            break;
        case 'EDIT':
            schedult.course = course,
            schedult.teacher = teacher
            break;
        case "REMOVE":
          delete state.schedult[mark]
          break
       }

    }

    return [state, setIninialData, setSchedultData]
}


export function useFormData() {
    function setFormData(item) {
        state.formData = item
    }

    return [setFormData]
}

