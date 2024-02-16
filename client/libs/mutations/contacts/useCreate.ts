import api, { RequestError, showErrorMessage } from '@/libs/api';
import endpoints from '@/libs/endpoints';
import { IContactForm } from '@/libs/forms';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useCreate = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const signup = useMutation({
        mutationFn: async (data: IContactForm) => {
            const res = await api.post(endpoints.CONTACTS, data);
            return res.data;
        },
        onSuccess: () => {
            router.push("/contacts");
            queryClient.invalidateQueries({ queryKey: [endpoints.CONTACTS] })
        },
        onError: (err: RequestError) => {
            showErrorMessage({ error: err });
        }
    });
    return signup;
}

export default useCreate;