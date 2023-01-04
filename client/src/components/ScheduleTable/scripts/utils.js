export function formatSchedultData(data) {
    return data.reduce((prev, cur) => {
        const beginTime = cur.begin_time
        const weekday = cur.weekday
        prev[`${beginTime}_${weekday}`] = cur;
        return prev
    }, {})
}

export function weekdayToChiness(number) {
    switch (number) {
        case 1 :
            return '周一'
            break;

        case 2 :
            return '周二'
            break;
        case 3 :
            return '周三'
            break;
        case 1 :
            return '周一'
            break;
        case 4 :
            return '周四'
            break;
        case 5 :
            return '周五'
            break;
        case 6 :
            return '周六'
            break;
        case 7 :
            return '周日'
            break;

    }
}

export function timeStampToTime (timeStamp){
    const date = new Date(timeStamp * 1000)
    const hour = addZero(date.getHours())
    const min = addZero(date.getMinutes())
    function addZero(num) {
        return num < 10 ? ("0" + num) : num
    }
    return `${hour}:${min}`
}

export function hasSchedultData(data){
     
    const title = data ? '编辑':'新增'
    return `${title}课程计划`

}