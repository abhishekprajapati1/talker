import { Box, Typography } from '@mui/material'
import React from 'react'
import ConversationTile from './ConversationTile';

const ConversationList = () => {

    let conversations = [
        { name: "Abhishek Prajapati", email: "abhishek@gmail.com" },
        { name: "John Doe", email: "doe.john@gmail.com" },
    ];


    if (conversations.length <= 0) {
        return (
            <Box display="flex" flexGrow={1} alignItems="center" justifyContent="center">
                <Typography>No conversations</Typography>
            </Box>
        )
    }

    return (
        <Box flexGrow={1} display="flex" flexDirection="column">
            {
                conversations.map(conversation => (
                    <ConversationTile data={conversation} key={conversation.email} />
                ))
            }
        </Box>
    )
}

export default ConversationList