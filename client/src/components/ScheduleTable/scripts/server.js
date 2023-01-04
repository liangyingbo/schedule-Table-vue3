import { httpGet, httpPost } from "../../../libs/http";
import { formatSchedultData } from "./utils";

export async function getSchedultInitalData() {
  let { duration, teacher, course, schedult } = await httpGet(
    "http://localhost:3000/initial_data"
  );
  return { duration, teacher, course, schedult:formatSchedultData(schedult) };
}

export async function upateSchult(data){
   const res = await httpPost('http://localhost:3000/update_schedult',data)
   return Promise.resolve(res)
}

export async function removeSchult(id){
  const res = await httpPost('http://localhost:3000/remove_schedult',{id})
  return Promise.resolve(res)
}
