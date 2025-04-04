import { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {

    try{
    const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join('&');
      
      const response = await fetch(
        `https://localhost:5000/book/allbooks?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );

    if (!response.ok) {
        throw new Error(`Error fetching books: ${response.statusText}`);
    }
      return await response.json();
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};