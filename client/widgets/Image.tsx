'use client';
import NextImage, { ImageProps } from 'next/image'
import { FC, useEffect, useState } from 'react';

const Image: FC<ImageProps> = ({ src, ...rest }) => {
    const [image, setImage] = useState(src);
    const handleFallback = () => {
        setImage("/fallback-image.png");
    }

    useEffect(() => {
        setImage(src);
    }, [src]);

    return (
        <NextImage
            src={image}
            {...rest}
            onError={() => handleFallback()}
        />
    )

}

export default Image;