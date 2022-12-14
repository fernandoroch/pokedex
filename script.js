const ulElements = document.querySelector('.card')
const modal = document.querySelector('.moda-container')
const modalContainer = document.querySelector('.container')

let jsonArray = []

function executarRepeticao(){

  for (let i = 1; i <= 150; i++) {
    requisicao(i)
  }

}
executarRepeticao()

async function requisicao(i){
  let url =`https://pokeapi.co/api/v2/pokemon/${i}`

    let fetchAtual = await fetch(url)
    let jsonAtual = await fetchAtual.json()
    jsonArray.push(jsonAtual)
    
  if (jsonArray.length === 150) {
    manipularDom()
  }
   
}

function manipularDom() {

  jsonArray.forEach((e, index) => {
    ulElements.innerHTML += `
    <ul onclick="mostraModal()">
     <li><img class="img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e.id}.png"></img></li>
     <li class="cards flex"><h2>${e.name}</h2><span>#${e.id}</span></li>
     <li class="cards flex"><h2>Species:</h2><span>${e.species.name}</span></li>
     <li class="cards flex"><h2>Types:</h2><span>${e.types.map((item) => item.type.name).join('|')}</span></li>
    </ul>
   `
  })
  console.log(jsonArray);
  estilizar()
  atributos()
}

function estilizar() {
  let ulEstilizar = document.querySelectorAll('.card ul')
  
  jsonArray.forEach((e,index) =>  {
    let type = e.types.map((item) => item.type.name).join('|')

    if (type === 'grass|poison'){
      ulEstilizar[index].style.background = 'rgb(129, 227, 129)'

    }else if(type === 'fire|flying' || type === 'fire'){
      ulEstilizar[index].style.background = 'rgb(245, 166, 92)'

    }else if(type === 'water' || type === 'water|ice'){
      ulEstilizar[index].style.background = 'rgb(189, 223, 246)'

    }else if(type === 'bug'){
      ulEstilizar[index].style.background = 'rgb(229, 220, 206)'
    }else if(type === 'electric'){
      ulEstilizar[index].style.background = 'rgb(246, 242, 183)'
    }

  })
}

function mostraModal() {
  atributos()
  modal.style.display = 'block'
}

function fecharModal(e){
  if(e.target === this) {
    modal.style.display = 'none'
  }
}

function atributos(){
  let attributes = []
  jsonArray.forEach((e, index) => {
    let now = jsonArray[index].stats.map((e) => {
      return {
        name: e.stat.name,
        valor:  e.base_stat
      }
    })
    attributes.push(now)
  })
  
  console.log(attributes);
}

modalContainer.addEventListener('click', fecharModal)



