'use client'

import { useState } from "react"
import TickerDropdown from "./ticker-dropdown";


type EditableTickerProps = {
    content: string,
    onTickerSelected?: (value: string) => void
}

export function EditableTicker({content, onTickerSelected} : EditableTickerProps) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [field, setField] = useState(content)

    function onBlurHandler() {
        setIsEditMode(false)
        onTickerSelected && onTickerSelected(field)
    }

    function onTickerSelectHandler(value: string) {
        setField(value)
        onTickerSelected && onTickerSelected(value)
    }

    function divClickedHandler() {
       setIsEditMode(true)
    }

    return (
        <>
            {isEditMode && (
                <TickerDropdown
                    onTickerSelected={(ticker) => onTickerSelectHandler(ticker)}
                    onBlur={() => onBlurHandler()}
                    initialValue={field}
                />
            )}
            <div hidden={isEditMode} className="w-48" 
                onClick={() => divClickedHandler()}>
                {field}
            </div>
        </>
    )
}