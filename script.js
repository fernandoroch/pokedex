const ulElements = document.querySelector('.card')
const modal = document.querySelector('.moda-container')
const buttonFecharModal = document.querySelector('.fechar-modal')
const modalContainer = document.querySelector('.container')
const atributosModal = document.querySelector('.atributos')

let jsonArray = []

function executarRepeticao(){

  for (let i = 1; i <= 150; i++) {
    requisicao(i)
  }

}
executarRepeticao()

/*  Fazendo requisição dos dados da API */
async function requisicao(i){
  let url =`https://pokeapi.co/api/v2/pokemon/${i}`

    let fetchAtual = await fetch(url)
    let jsonAtual = await fetchAtual.json()
    jsonArray.push(jsonAtual)
    
  if (jsonArray.length === 150) {
    manipularDom()
  }
   
}

/*   Adicionando os elementos do html */
function manipularDom() {
  jsonArray.forEach((e, index) => {
    ulElements.innerHTML += `
    <ul onclick="mostraModal(${index})">
     <li><img class="img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e.id}.png"></img></li>
     <li class="cards flex " ><h2>${e.name}</h1><span>#${e.id}</span></li>
     <li class="cards flex"><h3>Species:</h3><span>${e.species.name}</span></li>
     <li class="cards flex"><h3>Types:</h3><span>${e.types.map((item) => item.type.name).join('|')}</span></li>
    </ul>
   `
  })
  estilizar()
  console.log(jsonArray);
}

/*   Estilizando os cards   */
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

/*    Abrir e fechar modal de atributos   */

function mostraModal(e) {
  let total = []
  jsonArray[e].stats.forEach((item, index) => {
    let largura = () => {
     return Math.floor((item.base_stat / 200) * 100) 
    }
    console.log(largura());
    total.push(item.base_stat)
    atributosModal.innerHTML += `
   <ul class="elementos">
    <li class="hp">${item.stat.name}</li>
    <li class="value">${item.base_stat}</li>
    <li class="porcentagem"><div style="width:${largura()}%"></div></li>
   </ul>
  `
  })

  let cpTotal = total.reduce((acumulador, atual) => {
    return acumulador + atual
  })

  let cpTotalLargura = () => {
    return Math.floor((cpTotal / 800) * 100) 
   }

  atributosModal.innerHTML += `
   <ul class="elementos">
    <li class="total">total CP</li>
    <li class="total">${cpTotal}</li>
    <li class="porcentagem"><div class="p-total" style="width:${cpTotalLargura()}%"></div></li>
   </ul>
  `

  modal.style.display = 'block'
}

function fecharModal(e){
  if(e.target === this) {
    modal.style.display = 'none'
    atributosModal.innerHTML = ''
  }
  
}

modalContainer.addEventListener('click', fecharModal)
buttonFecharModal.addEventListener('click', fecharModal)


