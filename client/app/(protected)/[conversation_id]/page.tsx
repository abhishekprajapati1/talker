import ConversationHeader from '@/components/conversation/ConversationHeader';
import MessageInput from '@/components/conversation/MessageInput';
import Messages from '@/components/conversation/messages';
import { Stack } from '@mui/material'
import React, { FC } from 'react'

interface ConversationPageProps {
    params: {
        conversation_id: string;
    }
}

const ConversationPage: FC<ConversationPageProps> = ({ params: { conversation_id } }) => {
    return (
        <Stack direction="column" className="h-full w-full">
            <ConversationHeader conversation_id={conversation_id} />
            <Messages conversation_id={conversation_id} />
            <MessageInput conversation_id={conversation_id} />
        </Stack>
    )
}

export default ConversationPage