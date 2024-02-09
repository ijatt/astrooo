import { useTokenStore } from "~/stores/token"

export default defineNuxtRouteMiddleware(async() => {
    const { data: accessToken } = await useFetch('/api/user/access-token', {
        method: 'POST',
    })

    if (!accessToken.value) {
        userStore().clearUser()
        return await navigateTo("/auth")
    }

    const token = useTokenStore()
    token.accessToken = accessToken.value as string
})
