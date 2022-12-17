
  let active = document.querySelector('#active')
let prev = document.querySelector('#first')
let last = document.querySelector('#last')
let verificacao = 0


function nextElement(){
  if (verificacao === 0){
    prev.classList.remove('prev-b3')
    prev.classList.add('prev-b1')

    active.classList.remove('active-b3')
    active.classList.add('active-b1')

    last.classList.remove('last-b3')
    last.classList.add('last-b1')

    verificacao ++ 
  }else if(verificacao === 1){
    prev.classList.remove('prev-b1')
    prev.classList.add('prev-b2')

    active.classList.remove('active-b1')
    active.classList.add('active-b2')

    last.classList.remove('last-b1')
    last.classList.add('last-b2')
    verificacao ++ 
  }else {
    prev.classList.remove('prev-b2')
    prev.classList.add('prev-b3')

    active.classList.remove('active-b2')
    active.classList.add('active-b3')

    last.classList.remove('last-b2')
    last.classList.add('last-b3')

    verificacao = 0
  }
}

function next(){
  nextElement()
}

