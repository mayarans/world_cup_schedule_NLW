import json from "./games.js"

function createGame(player1, hour, player2) {
  return `
    <li>
      <img class="bandeira" style="width: 40px;" src="./assets/logo-${player1}.svg" alt="${player1} flag" />
      <strong class="hora">${hour}</strong>
      <img class="bandeira" style="width: 40px;"
        src="./assets/logo-${player2}.svg"
        alt="${player2} flag"
      />
    </li>
  `
}


let delay = -0.4;
function createCard(day, date, games) {
  delay = delay + 0.4;
  return `<div class="card" style="animation-delay: ${delay}s">
    <h2>
      ${date} <span>${day}</span>
    </h2>
    <ul>
      ${games}
    </ul>
  </div>`
}

function createAllCards() {
  let cards = ""
  for (let i in json) {
    let games = ""
    for (let a in json[i].games) {
      let presentGame = json[i].games[a]
      games += createGame(presentGame.player1, presentGame.hour, presentGame.player2)
    }
    cards += createCard(json[i].day, json[i].date, games)
  
  }
  return cards
}

document.querySelector("#app").innerHTML += `
  <main id="cards">
    ${createAllCards()}
  </main>
`
