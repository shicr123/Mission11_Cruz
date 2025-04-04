import { useEffect, useState } from "react";
import './CategoryFilter.css';

function CategoryFilter ({
    selectedCategories,
    setSelectedCategories,
}: {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
})  // Pass the function as a prop
{
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
            const response = await fetch("https://localhost:5000/Book/GetBookTypes");
            const data = await response.json();
            console.log("Fetched categories", data);
            setCategories(data);
            }
            catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories();
    }, [])

    function handleCheckboxChange ({target}: {target: HTMLInputElement}) {
        const updateCategories = selectedCategories.includes(target.value) ? 
        selectedCategories.filter((x) => x !== target.value) 
        : [...selectedCategories, target.value];
    
        setSelectedCategories(updateCategories);
    }


    return (
        <div className="category-filter">
            <h5>Project Types</h5>
            <div className="category-list">
                {categories.map((category) => (
                    <div key={category} className="category-item">
                        <input type="checkbox" 
                        id={category} 
                        name={category} 
                        value={category} 
                        className="category-checkbox" 
                        onChange={handleCheckboxChange}
                        />
                        <label htmlFor={category}>{category}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;