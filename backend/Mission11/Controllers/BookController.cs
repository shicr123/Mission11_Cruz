using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]

    // This controller is used to manage the books in the database
    public class BookController : ControllerBase
    {

        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;


        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, [FromQuery] List<string>? bookTypes = null )
        {
            var query = _bookContext.Books.AsQueryable();
            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            var totalNumProjects = query.Count();
            var something = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var someObject = new
            {
                Books = something,
                TotalNumBooks = totalNumProjects
            };

            return Ok(someObject);
        }
        // This method is used to get the details of a specific book by its ID

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }

    }

}

