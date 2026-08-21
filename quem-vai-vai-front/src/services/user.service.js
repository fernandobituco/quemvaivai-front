import Api from "./api";
import NoInterceptorApi from "./nointerceptorapi";

export const getProfile = async () => {
    const response = await Api.get('users/profile')
    return response.data
}

export const createUser = async (user) => {
    const response = await NoInterceptorApi.post('users', user)
    return response.data
}

export const updateUser = async (user) => {
    const response = await Api.put('users', user)
    return response.data
}

export const deleteUser = async (userid) => {
    const response = await Api.delete(`users/${userid}`)
    return response.data
}

export const ResetPassword = async (token, userId, newPassword) => {
    const response = await NoInterceptorApi.post('users/reset-password', {
        token,
        userId,
        newPassword
    })
    return response.data.Success
}

export const ForgotPassword = async (email) => {
    const response = await NoInterceptorApi.get(`users/forgot-password/${email}`)
    return response.data.Success
}