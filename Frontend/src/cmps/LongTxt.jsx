import React, { useState, useCallback } from 'react';

export const LongTxt = ({ description }) => {
    const [isLongTxtShown, setisLongTxtShown] = useState(false)

    const toggleIsLongTxtShown = useCallback(() => {
        setisLongTxtShown(!isLongTxtShown)
    }, [])

    let text = description;
    return (
        <p>
            {isLongTxtShown ? text : text.substring(0, 200) + '...'}
            <button onClick={toggleIsLongTxtShown}>{isLongTxtShown ? 'Read Less' : 'Read More'}</button>
        </p>
    )
}







