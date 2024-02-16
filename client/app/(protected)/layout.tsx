import { IWrapper } from '@/libs/types'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation';
import React, { FC } from 'react'

const ProtectedLayout: FC<IWrapper> = ({ children }) => {

    const token = cookies().get("_ta")?.value;

    if (!token) redirect("/login");


    return (
        <>
            {children}
        </>
    )
}

export default ProtectedLayout