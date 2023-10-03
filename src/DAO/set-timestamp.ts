const setData = (data:any) => {
    data.forEach((element:any) => {
      element.awb = Number(element.awb)
      element.bookingTime = new Date(element.bookingTime)
    });
    return data
  };
  
  export default setData;
  