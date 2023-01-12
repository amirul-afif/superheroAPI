// default URL and TOKEN for the SuperHero API
const TOKEN = '9239244806100936'
const BASE_URL = `https://superheroapi.com/api.php/${TOKEN}`

// HTML div
const newHeroButtonDiv = document.getElementById('newHeroButton')
const heroImageDiv = document.getElementById('heroImage')
const searchButtonDiv = document.getElementById('searchButton')
const inputDiv = document.getElementById('input')

// get random hero's ID
const getRandomHeroID = () => {
  const numOfHeroes = 731
  return Math.ceil(Math.random() * numOfHeroes)
}

// // fetch the data from the API
// const getSuperHero = (id) => {
//   fetch(`${BASE_URL}/${id}`)
//     .then(response => response.json())
//     .then(json => {
//       const name = json.name
//       const img = json.image.url
//       heroImageDiv.innerHTML =
//         `<h3>${name}</h3> <img src='${img}' height=400/>`
//       console.log(json)
//     })
// }

// // search for a super hero
// const getSearchSuperHero = (name) => {
//   fetch(`${BASE_URL}/search/${name}`)
//     .then(response => response.json())
//     .then(json => {
//       const hero = json.results[0]
//       const name = hero.name
//       const img = hero.image.url
//       heroImageDiv.innerHTML = `<h3>${name}</h3> <img src='${img}' height=400/>`
//       console.log(json)
//     })
// }

const getSuperHero = (name, id) => {
  // using search input
  if (name != '') {
    fetch(`${BASE_URL}/search/${name}`)
      .then(response => response.json())
      .then(json => {
        const hero = json.results[0]
        showHeroInfo(hero)

        console.log(json)
      })
    // random heroes
  } else if (id != '') {
    fetch(`${BASE_URL}/${id}`)
      .then(response => response.json())
      .then(json => {
        const hero = json
        showHeroInfo(hero)

        console.log(json)
      })
  }
}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️‍♂️',
  power: '📊',
  combat: '⚔️',
}

const showHeroInfo = (character) => {
  const name = `<h2>${character.name}</h2>`
  const img = `<img src='${character.image.url}' height=400/>`
  
  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
  }).join('')
  
  heroImageDiv.innerHTML = `${name}${img}${stats}`
}

// run the program everytime the button is clicked
newHeroButtonDiv.onclick = () => getSuperHero('', getRandomHeroID())
searchButtonDiv.onclick = () => getSuperHero(inputDiv.value, '')