import { useState } from "react";
import { useAddCategoryMutation, useGetCategoriesQuery } from "../hooks/investment-category-hooks";
import { InvestmentCategory } from "../backend-calls/investment-category-calls";

type CategoryDropDownProps = {
    initialValue?: string
    onBlur?: (category: string) => void
    onCategorySelected?: (category: string) => void
}

export default function CategoryDropdown({ onBlur, onCategorySelected, initialValue }: CategoryDropDownProps) {
    const { data: categories } = useGetCategoriesQuery()
    const mutation = useAddCategoryMutation()
    const [selectedCategory, setSelectedCategory] = useState<string>(initialValue ?? '')
    const [filteredCategories, setFilteredCategories] = useState<InvestmentCategory[]>(filterCategories(categories, selectedCategory))

    function filterCategories(categories: InvestmentCategory[], targetCategory: string) {
        if (targetCategory) {
            const lowerTargetCategory = targetCategory.toLowerCase()
            return categories.filter(c => c.category.toLowerCase().includes(lowerTargetCategory))
        }
        else
            return categories
    }

    function handleFilterChange(category: string) {
        const _category = category.toLowerCase()
        setFilteredCategories(filterCategories(categories, category))
        setSelectedCategory(_category)
    }

    function handleCategorySelected(category: string) {
        onCategorySelected?.(category)
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            handleCategorySelected(selectedCategory)
            e.currentTarget.blur()
        } else if (e.code === 'Escape') {
            setSelectedCategory(prev => initialValue ?? prev)
            handleCategorySelected(initialValue ?? selectedCategory)
            e.currentTarget.blur()
        }
    }

    async function addNewCategory(category: string) {
        mutation.mutate(category)
        setSelectedCategory(category)
        handleCategorySelected(category)
        onBlur?.(category)
    }

    return(
        <div className="dropdown dropdown-bottom" onBlur={() => onBlur?.(selectedCategory)}>
            <input tabIndex={0} 
                type="text"
                className="input input-bordered input-xs w-full max-w-xs"
                value={selectedCategory}
                onKeyDown={handleKeyPress}
                onChange={e => handleFilterChange(e.target.value)}/>
            <ul tabIndex={0} 
                className="dropdown-content menu neutral rounded-md z-[1] w-32 shadow overflow-hidden p-0">
                { selectedCategory && !categories.find(c => c.category === selectedCategory) && 
                    <li className="btn btn-neutral btn-xs rounded-none"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => addNewCategory(selectedCategory)}>
                        Add Category
                    </li>
                }
                { filteredCategories.map(c => (
                    <li key={c.category}
                        className="btn btn-neutral btn-xs rounded-none"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                            handleFilterChange(c.category)
                            onBlur?.(c.category)
                        }}>
                        {c.category}
                    </li>
                ))}
            </ul>
        </div>
    )
}