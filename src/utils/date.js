const getDate = (date) => {
  if(new Date(date).toDateString() === new Date().toDateString()){
    return `今天 ${new Date().toLocaleString('chinese', { hour12: false }).replace(/\//g,'-').split(' ')[1].substr(0,5)}`
  }else{
    return `${new Date().toLocaleString('chinese', { hour12: false }).replace(/\//g,'-').substr(5,11)}`
  }
}

export {
  getDate
}