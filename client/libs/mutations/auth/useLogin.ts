import api, { RequestError, TOKEN_TO_REFRESH, refreshToken, showErrorMessage } from "@/libs/api";
import { TOKEN_VALIDITY } from "@/libs/constants";
import endpoints from "@/libs/endpoints";
import { ILoginForm } from "@/libs/forms";
import { useMutation } from "@tanstack/react-query";


const useLogin = (ret?: string) => {
    const loginMutation = useMutation({
        mutationFn: async (data: ILoginForm) => {
            const res = await api.post(endpoints.LOGIN, data);
            return res.data;
        },
        onSuccess: async (data) => {
            alert(data.message);
            const token: TOKEN_TO_REFRESH = data?.data?.access_token;

            if (token) {
                window.localStorage.setItem(TOKEN_VALIDITY.auth_token, JSON.stringify({ type: token.type, life: token.life }));
            }

            window.location.href = ret ? ret : "/";
        },
        onError: (err: RequestError) => {
            showErrorMessage({ error: err });
        }
    });
    return loginMutation;
};

export default useLogin;