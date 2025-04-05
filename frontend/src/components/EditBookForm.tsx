import { useState } from "react";
import { Book } from "../types/Book";
import { updateBook } from "../api/BooksAPI";

interface EditBookFormProps {
    book: Book;
    onSuccess: () => void;
    onCancel: () => void;
    // }: EditProjectFormProps) => {
    //     const [formData, setFormData] = useState<Book>({ ...book});
    }
const EditBookForm = ({
    book, onSuccess, onCancel
}: EditBookFormProps) => {
    const [formData, setFormData] = useState<Book>({... book});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value}) 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBook(formData.bookID, formData);
        onSuccess();
      };
    
    
    //honestly not sure if "number" is correct
    return (
    <form onSubmit={handleSubmit}>
        <h2>Add New Book</h2>
        <label>Book ID:<input type="text" name="bookID" value={formData.bookID} onChange={handleChange}/></label>
        <label>Book Title:<input type="text" name="title" value={formData.title} onChange={handleChange} /></label>
        <label>Book Author:<input type="text" name="author" value={formData.author} onChange={handleChange}/></label>
        <label>Book Publisher:<input type="text" name="publisher" value={formData.publisher} onChange={handleChange}/></label>
        <label>ISBN:<input type="text" name="isbn" value={formData.isbn} onChange={handleChange}/></label>
        <label>Book Classification:<input type="text" name="classification" value={formData.classification} onChange={handleChange} /></label>
        <label>Book Category:<input type="text" name="category" value={formData.category} onChange={handleChange}/></label>
        <label>Book Page Count:<input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange}/></label>
        <label>Book Price:<input type="number" name="price" value={formData.price} onChange={handleChange}/></label>
        <button type="submit">Update Book</button>
        <button type="button" onClick={onCancel}>Cancel</button>
    </form>

                            // bookID: number;
                            // title: string;
                            // author: string;
                            // publisher: string;
                            // isbn: string;
                            // classification: string;
                            // category: string;
                            // pageCount: number;
                            // price: number;

      )
}

export default EditBookForm;

