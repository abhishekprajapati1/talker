import { SvgIconProps } from '@/libs/types'
import React, { FC } from 'react'

const Logo: FC<SvgIconProps> = (props) => {
    return (
        <svg
            viewBox="0 0 100 64.356"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g fill="currentColor">
                <path d="m37.615 0c-20.712 0-37.503 11.264-37.503 25.166 0 7.494 4.885 14.218 12.628 18.828-1.648 3.054-4.905 6.951-11.64 12.234-1.1 0.862-2.474 2.11 1.974 1.221 7.448-1.49 15.396-5.288 21.455-8.693 4.075 1.019 8.482 1.577 13.087 1.577 20.711 0 37.502-11.264 37.502-25.166s-16.792-25.167-37.503-25.167z" />
                <path d="m99.19 63.119c-5.781-4.534-6.606-7.095-6.888-8.956 4.033-2.922 6.5-6.831 6.5-11.128 0-7.997-8.532-14.648-19.818-16.094-0.935 11.439-10.864 20.912-25.033 25.069 4.363 4.463 11.882 7.412 20.431 7.412 3.681 0 7.168-0.55 10.299-1.528 3.297 2.113 8.938 5.353 13.957 6.355 2.297 0.46 1.12-0.685 0.552-1.13z" />
            </g>
        </svg>
    )
}

export default Logo