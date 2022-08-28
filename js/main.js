const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')

//criacao de dicionario que ira guardar a lista de items
// || = Operador logic "ou"
const itens = JSON.parse(localStorage.getItem("itens")) || []

//elemento = parametro da funcao
itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {

    evento.preventDefault()

    const passaNome = (evento.target.elements['nome'])
    const passaQuantidade = (evento.target.elements['quantidade'])

    const verificaSeElementoExiste = itens.find(elemento => elemento.nome === passaNome.value)

    //criacao de objeto com os items nome e quantidade
    const itemAtual = {
        "nome": passaNome.value,
        "quantidade": passaQuantidade.value
    }


    if (verificaSeElementoExiste) {

        itemAtual.id = verificaSeElementoExiste.id
        //console.log(verificaSeElementoExiste.id)

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === verificaSeElementoExiste.id)] = itemAtual

    } else {

        //operador ternario
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length - 1]).id + 1 : 0

        criaElemento(itemAtual)
        itens.push(itemAtual)

    }

    localStorage.setItem("itens", JSON.stringify(itens))

    passaNome.value = ""
    passaQuantidade.value = ""
})

function criaElemento(item) {

    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    //cria um novo elemento, elemento este especificado em parenteses
    const valorItem = document.createElement('strong')
    valorItem.innerHTML = item.quantidade
    valorItem.dataset.id = item.id

    //Adiciona item dentro do objeto
    novoItem.appendChild(valorItem)
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)

}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function () {

        deletaElemento(this.parentNode, id)

    })

    return elementoBotao
}


function deletaElemento(tag, id) {

    tag.remove()

    //remove item do Array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    //escrever no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))
}