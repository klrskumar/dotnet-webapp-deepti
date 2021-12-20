using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Dot.Controllers
{
    [ApiController]

    public class FavouriteController : ControllerBase
    {
        public static List<Favourite> Favourites { get; set; } = new List<Favourite>();

        public FavouriteController()
        {
            if (Favourites == null)
                Favourites = new List<Favourite>();
        }

        [HttpGet]
        [Route("Favourite/GetAllFavouriteUsers")]
        public IEnumerable<Favourite> GetAllFavouriteUsers()
        {
            return Favourites;
        }

        [HttpPost]
        [Route("Favourite/SaveFavouriteUser")]
        public bool SaveFavouriteUser([FromBody] Favourite favourite)
        {
            Favourites.Add(favourite);
            return true;
        }

        [HttpPut]
        [Route("Favourite/UpdateFavouriteUser/{userId}")]
        public bool UpdateFavouriteUser([FromBody] Favourite favourite, string userId)
        {
            var existingFavouriteUser = Favourites.FirstOrDefault(x => x.userId == userId);
            existingFavouriteUser.Notes = favourite.Notes;
            return true;
        }

        [HttpDelete]
        [Route("Favourite/DeleteFavouriteUser/{userId}")]
        public bool DeleteFavouriteUser(string userId)
        {
            var existingFavouriteUser = Favourites.FirstOrDefault(x => x.userId == userId);
            Favourites.Remove(existingFavouriteUser);
            return true;
        }
    }
}
