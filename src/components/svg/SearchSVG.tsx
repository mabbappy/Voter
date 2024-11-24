
import React from 'react';

const SearchSVG = ({ color = 'currentColor', strokeWidth = '0', strokeColor = 'currentColor', size = '64', ...rest }) => {
    return (
        <svg

            xmlns="http://www.w3.org/2000/svg"

            width={size}
            height={size}
            fill={color}
            stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
            {...rest}

            viewBox="0 0 16 16" >
            <path d="M7.00065 12.6663C10.1303 12.6663 12.6673 10.1293 12.6673 6.99967C12.6673 3.87007 10.1303 1.33301 7.00065 1.33301C3.87105 1.33301 1.33398 3.87007 1.33398 6.99967C1.33398 10.1293 3.87105 12.6663 7.00065 12.6663Z" stroke="#666666" stroke-width="1.5" stroke-linejoin="round" />
            <path d="M8.88647 4.78103C8.4039 4.29847 7.73723 4 7.00083 4C6.26447 4 5.5978 4.29847 5.11523 4.78103" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.0742 11.0742L13.9027 13.9027" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    );
};
// https://github.com/SRAKIB17/ReactCustomIconsLibrary.git

export default SearchSVG;

