const closeDetailsPage = document.getElementById("closeDetailsPage");
const secondPage = document.querySelector(".secondPage");
const links = document.querySelectorAll(".navbar ul a");

closeDetailsPage.addEventListener("click", function () {
  console.log(closeDetailsPage);

  secondPage.classList.add("d-none");
});
for (const link of links) {
  link.addEventListener("click", () => {
    getGames(link.innerHTML.toLowerCase());
    console.log(link.innerHTML.toLowerCase());
  });
}
async function getGames(cat) {
  document.querySelector(".loading").classList.remove("d-none");
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "4beb13d1e4msh1fb7a6639fc6061p193580jsnff6d58a4cf8a",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  const result = await response.json();
  displayGames(result);
  console.log(result);
  document.querySelector(".loading").classList.add("d-none");
}
getGames("mmorpg");
function displayGames(games) {
  let cartona = "";
  for (let i = 0; i < games.length; i++) {
    cartona += `
         <div class="col-xl-3 col-lg-4 col-md-6 col-12" onclick="getGameDetails(${games[i].id})">
                    <div class="card text-left w-100 pt-2 mb-3">
                        <img class="w-100" src=${games[i].thumbnail} alt="photo game">
                        <div class="card-body">
                            <h6 class="card-title text-white">${games[i].title}</h6>
                            <span class=" padge px-3 py-1 text-white bg-primary rounded-2 ">free</span>
                        </div>
                        <p class="card-text text-white text-center mb-2">
                            ${games[i].short_description}</p>
                        <hr class="w-100 h-50" style="color: black;">
                        <div class="footer d-flex justify-content-between mb-2">
                            <span class="badge badge-color" style="background-color: #363739;">${games[i].genre}</span>
                            <span class="badge badge-color" style="background-color: #363739;">${games[i].platform}</span>
                        </div>
                    </div>
                </div>
        
        
        `;
  }
  document.querySelector(".games .row").innerHTML = cartona;
}

async function getGameDetails(gameId) {
  secondPage.classList.remove("d-none");
  document.querySelector(".loading").classList.remove("d-none");
  console.log(gameId);

  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "4beb13d1e4msh1fb7a6639fc6061p193580jsnff6d58a4cf8a",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  const result = await response.json();
  displayGameDetails(result);
  console.log(result);
  document.querySelector(".loading").classList.add("d-none");
}
function displayGameDetails(game) {
  let cartona = `
               <div class="col-md-4 col-12">
                    <div class="cap w-100">
                        <img src=${game.thumbnail} class="w-100" alt="game photo">
                    </div>
                </div>
               <div class="col-md-8 col-12">
                    <div class="desc w-100">
                        <h2>Title: Throne And Liberty</h2>
                        <h5>Category : <span class="badge text bg-info">${game.genre}</span> </h5>
                        <h5>Platform : <span class="badge text bg-info">${game.platform}</span></h5>
                        <h5>Status : <span class="badge text bg-info">${game.status}</span></h5>
                        <p>${game.description}</p>
                        <a href=${game.game_url} target="_blank" class="btn btn-outline-warning">Show Game</a>
                    </div>
                </div>

               

    `;
  document.querySelector(".secondPage .content").innerHTML = cartona;
}
