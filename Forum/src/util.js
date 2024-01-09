import loginServices from './services/login'

export const categoriesTest = async () =>{ 
    const userCheck = await loginServices.check()
    return userCheck
  }