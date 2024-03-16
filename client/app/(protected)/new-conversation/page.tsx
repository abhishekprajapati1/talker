import SearchBar from '@/components/navigations/SearchBar'
import Results from '@/components/new-conversation/Results'
import { Box, Stack } from '@mui/material'
import React from 'react'

const NewConversationPage = () => {
    return (
        <Stack className="h-full">
            <SearchBar />
            <Stack paddingX={3} paddingY={1} direction="column" spacing={2} flexGrow={1}>
                <Results />
            </Stack>
        </Stack>
    )
}

export default NewConversationPage