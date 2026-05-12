//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace TaskApi.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class TasksController : ControllerBase
//    {
//    }
//}
using Microsoft.AspNetCore.Mvc;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static List<TaskItem> tasks = new();

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult Post([FromBody] TaskItem task)
        {
            if (string.IsNullOrWhiteSpace(task.Title))
            {
                return BadRequest("Title is required");
            }

            task.Id = tasks.Count + 1;
            tasks.Add(task);

            return Ok(task);
        }
    }

    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsCompleted { get; set; }
    }
}
