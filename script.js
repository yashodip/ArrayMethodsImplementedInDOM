const mainData = document.getElementById("data")
const addUserBtn = document.getElementById("add-user")
const doubleMoneyBtn = document.getElementById("double-money")
const showMillionaire = document.getElementById("only-millionaire")
const sortRichestBtn = document.getElementById("sort-richest")
const calculateWealthBtn = document.getElementById("total")

let data = []

function formatMoney(number) {
  console.log(number)
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}

async function getUserData() {
  const resp = await fetch("https://randomuser.me/api")
  const dataResp = await resp.json()
  const user = dataResp.results[0]
  const fullName = `${dataResp.results[0].name.first} ${dataResp.results[0].name.last}`
  const wealth = Math.random() * 800000 + 300000
  const newUser = { name: fullName, wealth }
  addUserData(newUser)
}

function addUserData(user) {
  data.push(user)
  updateUI()
}
getUserData()
getUserData()
getUserData()
function updateUI(paramData = data) {
  mainData.innerHTML = " <h2><strong>Person</strong>Wealth</h2>"

  paramData.forEach((item) => {
    const person = document.createElement("div")
    person.classList.add("person")
    person.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.wealth
    )}`
    mainData.appendChild(person)
  })
}

//double moeny
function doubleMoney() {
  data = data.map((item) => ({ ...item, wealth: item.wealth * 2 }))

  updateUI()
}

function onlyMillionaire() {
  Millionaire = data.filter((item) => item.wealth > 1000000)
  updateUI(Millionaire)
}
function sortByRichest() {
  data.sort((a, b) => b.wealth - a.wealth)
  console.log()
  updateUI()
}
function totalWealth() {
  const total = data.reduce((acc, item) => acc + item.wealth, 0)
  const totalEl = document.createElement("h3")
  totalEl.innerHTML = `<strong>Total weath</strong> ${formatMoney(total)}`
  mainData.appendChild(totalEl)
  console.log(total)
}
addUserBtn.addEventListener("click", getUserData)
doubleMoneyBtn.addEventListener("click", doubleMoney)
showMillionaire.addEventListener("click", onlyMillionaire)
sortRichestBtn.addEventListener("click", sortByRichest)
calculateWealthBtn.addEventListener("click", totalWealth)
