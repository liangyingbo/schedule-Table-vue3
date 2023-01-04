const express = require('express')
const bodyParser = require('body-parser')

const { writeFileSync, readFileSync } = require('fs')

const { resolve } = require('path')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST')
    next()
})

const duration = JSON.parse(readFileSync(resolve(__dirname, 'data/duration.json'), 'utf-8'))
const teacher = JSON.parse(readFileSync(resolve(__dirname, 'data/teacher.json'), 'utf-8'))
const course = JSON.parse(readFileSync(resolve(__dirname, 'data/course.json'), 'utf-8'))

app.get('/initial_data', (req, res) => {
    const schedult = JSON.parse(readFileSync(resolve(__dirname, 'data/schedult.json'), 'utf-8') ?? [])
    res.json({
        code: 0,
        msg: 'ok',
        data: {
            schedult,
            course,
            teacher,
            duration
        }
    })
})

app.post('/update_schedult',(req,res) =>{
    const {course,teacher,weekday,begin_time} = req.body
    const schedult = JSON.parse(readFileSync(resolve(__dirname, 'data/schedult.json'), 'utf-8'))
     const mark = `${begin_time}_${weekday}`
     const item = schedult.find(item => item.begin_time == begin_time && item.weekday == weekday)
     let type = ''
     let result = ''
     if(item){
        item.teacher = teacher,
        item.course = course
        type = "EDIT"
        result = item
     }else{
        type = 'ADD'
        const lastId = schedult.length + 1;
        const sch = {
            id:lastId +1,
            course,
            teacher,
            weekday,
            begin_time
        }
        schedult.push(sch)
        result = sch
     }
     writeFileSync(resolve(__dirname, 'data/schedult.json'),JSON.stringify(schedult))
    res.send({
        code: 0,
        msg: 'ok',
        data: {
            type,
            result
        }
    })
})

app.post('/remove_schedult',(req,res) =>{
   const id = req.body.id
   const schedult = JSON.parse(readFileSync(resolve(__dirname, 'data/schedult.json'), 'utf-8'))
   const newData =  schedult.filter(item => item.id != id)
   writeFileSync(resolve(__dirname, 'data/schedult.json'),JSON.stringify(newData))

   res.send({
    code: 0,
    msg: 'ok',
    data: {
        type:'REMOVE',
        id
    }
})
})

app.listen(3000, () => {
    console.log('ok')
})