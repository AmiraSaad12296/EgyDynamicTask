using ClientForm.BL.DTO;
using ClientForm.BL.UOW;
using ClientForm.DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClientForm.PL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientFormController : ControllerBase
    {
        UnitofWork unit;

        public ClientFormController(UnitofWork unit)
        {
            this.unit = unit;
        }

        [HttpGet]
        public ActionResult Getclients()
        {
            List<Client> clients = unit.ClientsRepository.selectall();
            return Ok(clients);
        }

        [HttpGet("{id}")]
        public ActionResult Getclient(int id)
        {

            var client = unit.ClientsRepository.selectbyid(id);
            if (client == null) return NotFound();

            return Ok(client);

        }


        [HttpPost]
        public ActionResult Postclient([FromBody] ClientDTO client)
        {
            if (client == null) return BadRequest("Client data is null");
            if (!ModelState.IsValid) return BadRequest(ModelState);

            Client existingClient = new Client()
            {
                Name = client.Name,
                Description = client.Description,
                Job = client.Job,
                EnteredBy = client.EnteredBy,
                EntryDate = client.EntryDate,
                LastModificationBy = client.LastModificationBy,
                LastModificationIn = client.LastModificationIn,
                ClientSource = client.ClientSource,
                SalesMan = client.SalesMan,
                ClientClass = client.ClientClass
            };

            unit.ClientsRepository.add(existingClient);
            unit.savechanges();

            return CreatedAtAction(nameof(Getclient), new { id = existingClient.ID }, existingClient);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateClient(int id, ClientDTO client)
        {
            var exsitingClient = unit.ClientsRepository.selectbyid(id);
            if (exsitingClient == null)
            {
                return NotFound();
            }
            exsitingClient.Name = client.Name;
            exsitingClient.Description = client.Description;
            exsitingClient.Job= client.Job;
            exsitingClient.EnteredBy = client.EnteredBy;
            exsitingClient.EntryDate= client.EntryDate;
            exsitingClient.LastModificationBy = client.LastModificationBy;
            exsitingClient.LastModificationIn = client.LastModificationIn;
            exsitingClient.ClientSource = client.ClientSource;
            exsitingClient.SalesMan= client.SalesMan;
            exsitingClient.ClientClass= client.ClientClass;

            unit.ClientsRepository.update(exsitingClient);

            unit.savechanges();
   
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteClient(int id)
        {
            unit.ClientsRepository.delete(id);
            unit.savechanges();
            return Ok();
        }

        [HttpGet("pagination")]
        public ActionResult GetClientPagination(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 4)
        {
            var clients = unit.ClientsRepository.GetPaged(page, pageSize);
            var totalClientsCount = unit.ClientsRepository.Count();

            var totalPages = (int)Math.Ceiling((double)totalClientsCount / pageSize);

            return Ok(new { clients, totalPages });
        }


    }
}

