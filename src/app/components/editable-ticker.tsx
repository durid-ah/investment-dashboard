'use client'

import { useState } from "react"
import TickerDropdown from "./ticker-dropdown";

type Value = string | number | readonly string[] | undefined;

type EditableTickerProps = {
    content: Value,
    onChange?: (value: Value) => void
}

export function EditableTicker({content, onChange} : EditableTickerProps) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [field, setField] = useState(content)

    function onBlurHandler() {
        setIsEditMode(false)
        if (onChange) {
            onChange(field)
        }
    }

    function onChangeHandler(value: Value) {
        setField(value)
    }

    function divClickedHandler() {
       setIsEditMode(true)
    }

    return (
        <>
            {isEditMode && (
                <TickerDropdown 
                    onChange={(ticker) => onChangeHandler(ticker)}
                />
            // <input autoFocus type={type} 
            //     ref={input => input?.focus()}
            //     className="w-48"
            //     hidden={!isEditMode} value={field}
            //     onChange={(e) => onChangeHandler(e.target.value)} 
            //     onBlur={() => onBlurHandler()}/>
            )}
            <div hidden={isEditMode} className="w-48" 
                onClick={() => divClickedHandler()}>
                {field}
            </div>
        </>
    )
}