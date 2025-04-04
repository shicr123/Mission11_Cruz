interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
  }
  
  const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange,
  }: PaginationProps) => {
    return (
      <div className="flex items-center justify-center mt-4">
        {/* Previous button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="btn"
        >
          Previous
        </button>
  
        {/* Page number buttons */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            disabled={currentPage === i + 1}
            className="btn"
          >
            {i + 1}
          </button>
        ))}
  
        {/* Next button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="btn"
        >
          Next
        </button>
  
        <br />
  
        {/* Results per page selection */}
        <label>
          Results per page:
          <select
            value={pageSize}
            onChange={(p) => {
              onPageSizeChange(Number(p.target.value));
              onPageChange(1); // Reset to the first page when changing page size
            }}
            className="select"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    );
  };
  
  export default Pagination;
  
    