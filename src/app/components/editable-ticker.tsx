'use client'

import { useState } from "react"
import TickerDropdown from "./ticker-dropdown";


type EditableTickerProps = {
    content: string,
    onChange?: (value: string) => void
}

export function EditableTicker({content, onChange} : EditableTickerProps) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [field, setField] = useState(content)

    function onBlurHandler() {
        console.log('EditableTicker', `onBlurHandler`)
        setIsEditMode(false)
        if (onChange) {
            onChange(field)
        }
    }

    function onTickerSelectHandler(value: string) {
        console.log('EditableTicker', `onTickerSelectHandler`, value)
        setField(value)
        onChange && onChange(value)
    }

    function divClickedHandler() {
       setIsEditMode(true)
    }

    // TODO: Add a function that handles the ticker selection
    // TODO: Move the field update to the ticker selection function
    // TODO: Maybe call onChange in the ticker selection function?

    return (
        <>
            {isEditMode && (
                <TickerDropdown
                    onTickerSelected={(ticker) => onTickerSelectHandler(ticker)}
                    onBlur={() => onBlurHandler()}
                />
            )}
            <div hidden={isEditMode} className="w-48" 
                onClick={() => divClickedHandler()}>
                {field}
            </div>
        </>
    )
}