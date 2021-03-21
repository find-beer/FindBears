import dayjs from 'dayjs'

const getDate = (date) => {
  // 当天
  if(new Date(date).toDateString() === new Date().toDateString()){
    return `今天 ${dayjs(date).format("HH:mm")}`
  // 当年
  }else if(new Date(date).getFullYear() === new Date().getFullYear()){
    return dayjs(date).format("MM-DD HH:mm")
  // 非当年
  }else{
    return dayjs(date).format("YYYY-MM-DD HH:mm")
  }
}

const getDayTime = (date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm")
}

export {
  getDate,
  getDayTime
}