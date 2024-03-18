import { IMessage } from '@/libs/types';
import React, { FC } from 'react';
import MessageBoxWrapper from './MessageWrapper';
import dayjs from 'dayjs';
import useFetch from '@/libs/hooks/useFetch';
import endpoints from '@/libs/endpoints';

interface TextMessageProps extends IMessage {
}

const TextMessage: FC<TextMessageProps> = ({ sender_id, body, status, timestamp }) => {
    const { data, isLoading } = useFetch({ endpoint: endpoints.PROFILE });
    const sameUser = sender_id === data?.id;

    console.log("see this", sameUser);

    if (isLoading) {
        return (
            <div>
                loading...
            </div>
        )
    }


    return (
        <MessageBoxWrapper time={dayjs(timestamp).format("hh:mm a")} sameUser={sameUser} status={status}>
            {body}
        </MessageBoxWrapper>
    )
}

export default TextMessage