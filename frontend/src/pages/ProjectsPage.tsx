import { useState } from "react";
import BookList from "../components/Booklist";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBook from "../components/Welcome";

function ProjectsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    return (
        <div className ="container"> 
        <div className="row bg-primary text-white"> 
        <WelcomeBook />
        </div>
        <div className="row">
        <div className="col-md-3">
            <CategoryFilter 
            selectedCategories={selectedCategories} 
            setSelectedCategories = {setSelectedCategories} 
            />
        </div>
        <div className="col-md-9">
            <BookList selectedCategories = {selectedCategories} />
        </div>
        </div>
    </div>
  );
}

export default ProjectsPage;