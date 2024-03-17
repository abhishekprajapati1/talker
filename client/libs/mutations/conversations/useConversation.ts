import api from "@/libs/api";
import endpoints from "@/libs/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

const useConversation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: async (user_id: string) => {
            const response = await api.post(endpoints.START_CONVERSATION, { user_id });
            return response.data.data;
        },
        onSuccess: data => {
            router.replace(`/${data.conversation_id}`);
            queryClient.invalidateQueries({ queryKey: [endpoints.CONVERSATIONS] })
        },
        onError: error => {
            console.log(error);
        }
    });

    return mutation;

}

export default useConversation;