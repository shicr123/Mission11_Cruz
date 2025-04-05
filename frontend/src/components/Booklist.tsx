import { useEffect, useState } from 'react';
import { Book } from '../types/Book'; 
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  useEffect(() => {
    if (books.length > 0) { // Ensure books are loaded before sorting
      const sorted = [...books].sort((a, b) => {
        return sortAscending
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
      setSortedBooks(sorted);
    }
  }, [books, sortAscending]);

  if (loading) return <p> Loading Books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <button onClick={() => setSortAscending(!sortAscending)}>
        Sort by Title {sortAscending ? '▲' : '▼'}
      </button>
      <br />
      {sortedBooks.map((p) => (
        <div key={p.bookID} id="bookCard" className="card">
          <h3 className="card-title">{p.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li><strong>Author:</strong> {p.author}</li>
              <li><strong>Publisher:</strong> {p.publisher}</li>
              <li><strong>ISBN:</strong> {p.isbn}</li>
              <li><strong>Category:</strong> {p.category}</li>
              <li><strong>Price:</strong> ${p.price}</li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/buy/${encodeURIComponent(p.title)}/${p.bookID}/${p.price}`)
              }
            >
              Buy
            </button>
          </div>
          
        </div>

      ))}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1); // Reset to first page when changing page size
        }}
      />
    </>
  );
}

export default BookList;
