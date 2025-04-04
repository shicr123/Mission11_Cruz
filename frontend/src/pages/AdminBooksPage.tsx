import { use, useEffect, useState } from "react";
import { Book } from "../types/Book";
import { fetchBooks } from "../api/BooksAPI";


const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(10, 1, []);
                setBooks(data.books);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    if (loading) return <p>Loading Books...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
  
    return(
        <div>
            <h1>Admin - Books</h1>
            <table>
                <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Clasification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b) => (
                        <tr key={b.bookID}>
                            <td>{b.bookID}</td>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.publisher}</td>
                            <td>{b.isbn}</td>
                            <td>{b.classification}</td>
                            <td>{b.category}</td>
                            <td>{b.pageCount}</td>
                            <td>{b.price}</td>
                            <td>
                                <button onClick={() => console.log(`Edit book ${b.bookID}`)}>Edit</button>
                                <button onClick={() => console.log(`Delete book ${b.bookID}`)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
 };

export default AdminBooksPage;