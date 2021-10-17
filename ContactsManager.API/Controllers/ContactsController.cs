namespace ClientManager.API.Controllers
{
    using ContactsManager.Services.Dto;
    using ContactsManager.Services.Interfaces;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;

    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {

        private readonly IContactsManagerService service;

        public ContactsController(IContactsManagerService service)
        {
            this.service = service;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ContactDto>), 200)]
        public async Task<ActionResult<IEnumerable<ContactDto>>> GetContacts()
        {
            var result = await service.GetContactsAsync();
            return Ok(result);
        }
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(ContactDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<ContactDto>> GetContact(int id)
        {
            var result = await service.GetContactAsync(id);
            if (result == null) {
                return NotFound($"Contact with Id:{id} not found");
             }
            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(typeof(ContactDto), 201)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<IEnumerable<ContactDto>>> CreateContact([FromBody] ContactDto client)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await service.CreateContactAsync(client);
            return new ObjectResult(created) { StatusCode = StatusCodes.Status201Created };
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(typeof(ContactDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<IEnumerable<ContactDto>>> UpdateContact([FromBody] ContactDto client, int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var updated = await service.UpdateContactAsync(client, id);
            return new ObjectResult(updated) { StatusCode = StatusCodes.Status200OK };
        }
    }
}