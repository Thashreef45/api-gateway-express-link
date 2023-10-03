

const convertToNumber = (data:any) => {

}

const employeePhoneNumberConvert = (data:any) => {
    return data.map((element:any)=> {
        element.phone = Number(element.phone)
        return element
    })
}

export {
    employeePhoneNumberConvert
}