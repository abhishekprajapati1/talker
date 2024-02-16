import api, { RequestError, showErrorMessage } from '@/libs/api';
import endpoints from '@/libs/endpoints';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ISignupForm } from '../../forms';

const useSignup = () => {
    const router = useRouter();

    const signup = useMutation({
        mutationFn: async (data: ISignupForm) => {
            const res = await api.post(endpoints.SIGNUP, data);
            return res.data;
        },
        onSuccess: data => {
            alert(data.message);
            router.push("/login");

        },
        onError: (err: RequestError) => {
            showErrorMessage({ error: err });
        }
    });
    return signup;
}

export default useSignup;