import NoInterceptorApi from "./nointerceptorapi";

export const getToken = async (email) => {
    const response = await NoInterceptorApi.get(`passwordresettoken/${email}`)
    return response.data.IsSuccess
}

export const resetPassword = async (userid, password, passwordConfirmation, token) => {
    const response = await NoInterceptorApi.post('passwordresettoken', {
        userId: userid,
        password: password,
        passwordConfirmation: passwordConfirmation,
        passwordResetToken: token
    })
    return response.data.IsSuccess
}