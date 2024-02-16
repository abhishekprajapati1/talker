import { IWrapper } from '@/libs/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React, { FC } from 'react'

const AuthLayout: FC<IWrapper> = ({ children }) => {
    const token = cookies().get("_ta")?.value;
    if (token) redirect("/");
    return (
        <>
            {children}
        </>
    )
}

export default AuthLayout