using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]

    // This controller is used to manage the books in the database.
    public class BookController : ControllerBase
    {

        private BookDbContext _bookContext;


        public BookController(BookDbContext temp) => _bookContext = temp;


        [HttpGet("Alloks")]
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1)
        {
            var something = _bookContext.Books
                .Skip((pageNum-1)* pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var totalNumProjects = _bookContext.Books.Count();

            var someObject = new
            {
                Books = something,
                TotalNumBooks = totalNumProjects
            };

            return Ok(someObject);
        }

        [HttpGet("FunctionalBooks")]
        public IEnumerable<Book> GetFunctionalBooks()
        {
            var something = _bookContext.Books.Where(p => p.Category == "Functional").ToList();
            return something;
        }
    }

}

