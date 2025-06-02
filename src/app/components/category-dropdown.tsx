import { useState } from "react";
import { useAddCategoryMutation, useGetCategoriesQuery } from "../hooks/investment-category-hooks";
import { InvestmentCategory } from "../backend-calls/investment-category-calls";

type CategoryDropDownProps = {
    onChange: (category: string) => void
}

export default function CategoryDropdown({ onChange }: CategoryDropDownProps) {
    const { data: categories } = useGetCategoriesQuery()
    const mutation = useAddCategoryMutation()
    const [selectedCategory, setSelectedCategory] = useState<string>('')
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
        onChange(_category)
    }

    async function addNewCategory(category: string) {
        mutation.mutate(category)
    }

    return(
        <div className="dropdown dropdown-bottom">
            <input tabIndex={0} 
                type="text"
                className="input input-bordered input-xs w-full max-w-xs"
                value={selectedCategory}
                onChange={e => handleFilterChange(e.target.value)}/>
            <ul tabIndex={0} 
                className="dropdown-content menu neutral rounded-md z-[1] w-32 shadow overflow-hidden p-0">
                { selectedCategory && !categories.find(c => c.category === selectedCategory) && 
                    <li className="btn btn-neutral btn-xs rounded-none"
                        onClick={() => addNewCategory(selectedCategory)}>
                        Add Category
                    </li>
                }
                { filteredCategories.map(c => (
                    <li key={c.category}
                        className="btn btn-neutral btn-xs rounded-none"
                        onClick={() => handleFilterChange(c.category)}>
                        {c.category}
                    </li>
                ))}
            </ul>
        </div>
    )
}