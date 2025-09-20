'use client'

import { HTMLInputTypeAttribute, useState } from "react"

type Value = string | number | readonly string[] | undefined;

type EditableValueProps = {
    content: Value,
    type: HTMLInputTypeAttribute,
    onChange?: (value: Value) => void
}

export function EditableValue({content, type, onChange} : EditableValueProps) {
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
            <input autoFocus type={type} 
                ref={input => {
                    input?.focus();
                }}
                className="w-48"
                hidden={!isEditMode} value={field}
                onChange={(e) => onChangeHandler(e.target.value)} 
                onBlur={() => onBlurHandler()}/>
            <div hidden={isEditMode} className="w-48" 
                onClick={() => divClickedHandler()}>
                {field}
            </div>
        </>
    );
}