import dayjs from 'dayjs'

const getDate = (date) => {
  if(new Date(date).toDateString() === new Date().toDateString()){
    // return `今天 ${new Date().toLocaleString('chinese', { hour12: false }).replace(/\//g,'-').split(' ')[1].substr(0,5)}`
    return `今天 ${dayjs(date).format("MM-DD HH:mm")}`
  }else{
    return dayjs(date).format("MM-DD HH:mm")
  }
}

const getDayTime = (date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm")
}

export {
  getDate,
  getDayTime
}