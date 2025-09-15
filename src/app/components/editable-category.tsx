'use client'

import { useState } from "react"
import CategoryDropdown from "./category-dropdown"

type EditableCategoryProps = {
    content: string,
    onCategorySelected?: (value: string) => void
}

export function EditableCategory({content, onCategorySelected} : EditableCategoryProps) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [field, setField] = useState(content)

    function onBlurHandler(category: string) {
        setIsEditMode(false)
        onCategorySelected && onCategorySelected(category)
    }

    function onCategorySelectHandler(value: string) {
        setField(value)
        onCategorySelected && onCategorySelected(value)
    }

    function divClickedHandler() {
       setIsEditMode(true)
    }

    return (   
        <>
            {isEditMode && (
                <CategoryDropdown
                    onCategorySelected={(category) => onCategorySelectHandler(category)}
                    onBlur={(category) => onBlurHandler(category)}
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
