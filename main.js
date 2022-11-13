import json from "./games.js"

const getBody = document.querySelector("body")

let color = 'purple'
function changeColors() {
  if (color=='purple') {
    color = 'blue'
    getBody.classList.add(color)
  } else if (color=='blue') {
    getBody.classList.remove(color)
    color = 'green'
    getBody.classList.add(color)
  } else if (color=='green') {
    getBody.classList.remove(color)
    color = 'purple'
  }
}

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
function createCard(searchedDate) {
  delay = delay + 0.4;
  let games = ""
  if (searchedDate == -1) {
    return `<div class="card" style="animation-delay: ${delay}s">
    <h2>
      Não há jogos nesta data
    </h2>
  </div>`
  }
  for (let a in searchedDate.games) {
    let presentGame = searchedDate.games[a]
    games += createGame(
      presentGame.player1,
      presentGame.hour,
      presentGame.player2
    )
  }
  return `<div class="card" data="${searchedDate.date}"style="animation-delay: ${delay}s">
    <h2>
      ${searchedDate.date} <span>${searchedDate.day}</span>
    </h2>
    <ul>
      ${games}
    </ul>
  </div>`
}

function createAllCards() {
  let cards = ""
  for (let i in json) {
    cards += createCard(json[i])
  }
  return cards
}

function searchDate(date) {
  for (let i in json) {
    if (json[i].date == date) {
      return json[i]
    }
  }
  return -1
}

document.querySelector("#cards").innerHTML = createAllCards()


// CALENDAR
const currentDate = document.querySelector(".current-date"),
  daysTag = document.querySelector(".days"),
  prevNextIcon = document.querySelectorAll(".icons i")

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth()

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const renderCalendar = () => {
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),
    lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate()
  let liTag = ""

  let prevMonth = currMonth === 0 ? 12 : currMonth,
    prevYear = prevMonth === 12 ? currYear - 1 : currYear,
    nextMonth = currMonth + 1 === 12 ? 1 : currMonth + 2,
    nextYear = nextMonth === 1 ? currYear + 1 : currYear

  for (let i = firstDayOfMonth; i > 0; i--) {
    let dayOfLastMonth = lastDateOfLastMonth - i + 1
    liTag += `<li data="${dayOfLastMonth}/${prevMonth}/${prevYear}" class="inactive">${dayOfLastMonth}</li>`
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : ""
    let dateFormated = i.toString().padStart(2, "0")
    liTag += `<li data="${dateFormated}/${
      currMonth + 1
    }" class="${isToday}">${i}</li>`
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    let dayOfNextMonth = i - lastDayOfMonth + 1
    let dateFormated = dayOfNextMonth.toString().padStart(2, "0")
    liTag += `<li data="${dateFormated}/${nextMonth}/${nextYear}" class="inactive">${dayOfNextMonth}</li>`
  }

  currentDate.innerHTML = `${months[currMonth]} ${currYear}`
  daysTag.innerHTML = liTag

  setDatesClickable();
}

const modal = document.querySelector("#calendar-modal"),
  btnOpenModal = document.querySelector("#calendar-side-menu"),
  btnCloseModal = document.querySelector("#close-modal")

btnOpenModal.onclick = function () {
  modal.style.display = "block"
}

btnCloseModal.onclick = function () {
  modal.style.display = "none"
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

function setDatesClickable() {
  const dates = document.querySelectorAll(".days li")
  dates.forEach((i) => {
    i.addEventListener("click", () => {
      changeColors()
      modal.style.display = "none"
      getBody.style.backgroundSize = "cover"
      const searchedDate = searchDate(i.getAttribute("data"))
      delay = -0.4
      document.querySelector("#cards").innerHTML = createCard(searchedDate)
    })
  })
}

renderCalendar()

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1
    if (currMonth < 0) {
      currMonth = 11
      currYear -= 1
    } else if (currMonth > 11) {
      currMonth = 0
      currYear += 1
    }
    renderCalendar()
  })
})


const homePage = document.querySelector("#house-side-menu")
homePage.onclick = function() {
  changeColors()
  getBody.style.backgroundSize = "contain"
  delay = -0.4
  document.querySelector("#cards").innerHTML = createAllCards()
}
