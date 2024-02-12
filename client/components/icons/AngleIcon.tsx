import { SvgIconProps } from '@/libs/types'
import React, { FC } from 'react'

const AngleIcon: FC<SvgIconProps> = (props) => {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em" width="1em"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
        </svg>
    )
}

export default AngleIcon