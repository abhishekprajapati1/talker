'use client';
import { AppBar, Box, IconButton, Input, Stack, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import AngleIcon from '../icons/AngleIcon'
import Socket from '@/libs/Socket';
import { useAppDispatch } from '@/store';
import { setNewConversationResults } from '@/store/slices/conversation.slice';
import { NewConversationResultType } from '@/libs/types';

interface TopBarProps {
    title?: string;
    onBack?: () => void;
}

const SearchBar: FC<TopBarProps> = ({ title, onBack }) => {
    const socket = Socket.socket;
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        if (searchText.length > 0) {
            socket.emit("search-new-user", searchText);
        }
    }, [searchText]);


    useEffect(() => {
        const messageReceivedHandler = (newMessageReceived: NewConversationResultType[]) => {
            dispatch(setNewConversationResults(newMessageReceived))
        };
        socket.on("user-search-result", messageReceivedHandler);
        return () => {
            socket.off("user-search-result", messageReceivedHandler);
        };
    });
    return (
        <AppBar position='sticky' color="transparent" sx={{ boxShadow: 0 }} className='top-0 border border-bottom'>
            <Toolbar sx={{ height: 70 }} >
                <Stack direction="row" flexGrow={1} alignItems="center">
                    <IconButton size="large" component={Link} href="/">
                        <AngleIcon className="w-[22px] h-[22px]" />
                    </IconButton>
                    <Box component="input" placeholder='Enter name or email...' className='border-none text-gray-600 outline-none' value={searchText} onChange={event => setSearchText(event.target.value)} type="text" />
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default SearchBar