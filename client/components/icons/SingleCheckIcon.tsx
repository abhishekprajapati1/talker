import { SvgIconProps } from '@/libs/types'
import React, { FC } from 'react'

const SingleCheckIcon: FC<SvgIconProps> = (props) => {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>

    )
}

export default SingleCheckIcon