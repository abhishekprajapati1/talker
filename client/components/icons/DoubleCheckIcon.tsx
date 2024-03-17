import { SvgIconProps } from '@/libs/types'
import React, { FC } from 'react'

const DoubleCheckIcon: FC<SvgIconProps> = (props) => {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}><path fill="none" stroke-linecap="round" stroke-linejoin="round" strokeWidth="32" d="M464 128 240 384l-96-96m0 96-96-96m320-160L232 284"></path></svg>

    )
}

export default DoubleCheckIcon