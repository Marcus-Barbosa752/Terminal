import { Python, Cpp, Java, Javascript } from "./ListaLiguagens.js"

const term = document.getElementById("term")
const InputSelectVelocidadeCodes = document.getElementById("InputSelectVelocidadeCode")
const EscolherLinguagem = document.getElementById("EscolharLinguagem")
const btnPlay = document.getElementById("btnPlay")
const btnPause = document.getElementById("btnPause")
const btnClear = document.getElementById("btnClear")

let running = false
let interval = null
let isTyping = false

const codeSamples = {
    ...Python["Python"],
    ...Cpp["C++"],
    ...Java["Java"],
    ...Javascript["Javascript"],
    "Todos": []
}

const speedModes = {
    "Normal": 1,
    "Fast": 5,
    "Ultra rápido": 10
}

function gerarLinha(linguagem) {
    let pool = []

    if (linguagem === "Todos") {
        Object.keys(codeSamples).forEach(lang => {
            if (lang !== "Todos") {
                pool = pool.concat(codeSamples[lang])
            }
        })
    } else {
        pool = codeSamples[linguagem] || []
    }

    return pool[Math.floor(Math.random() * pool.length)] || ""
}

let currentLine = ""
let currentIndex = 0

function escreverCodigo() {
    if (!running || isTyping) return

    const linguagem = (EscolherLinguagem && EscolherLinguagem.textContent) ? EscolherLinguagem.textContent : "Todos"
    const velocidade = (InputSelectVelocidadeCodes && InputSelectVelocidadeCodes.textContent) ? InputSelectVelocidadeCodes.textContent : "Normal"
    const step = speedModes[velocidade] || 1

    // Se não há linha atual ou chegou ao fim, gera nova linha
    if (!currentLine || currentIndex >= currentLine.length) {
        currentLine = gerarLinha(linguagem) + "\n"
        currentIndex = 0
    }

    // Escreve apenas a quantidade de caracteres definida pela velocidade
    if (currentIndex < currentLine.length) {
        const caracteresParaEscrever = Math.min(step, currentLine.length - currentIndex)
        const novosCaracteres = currentLine.substr(currentIndex, caracteresParaEscrever)
        
        term.value += novosCaracteres
        term.scrollTop = term.scrollHeight
        currentIndex += caracteresParaEscrever
    }
}

// Event listener para quando usuário digita - escreve código simulado baseado na velocidade
term.addEventListener('keydown', (event) => {
    // Previne que a tecla digitada apareça no terminal
    event.preventDefault()
    
    if (!running) {
        running = true
    }
    
    // A cada tecla pressionada, escreve código simulado
    escreverCodigo()
})

// Botões de controle
if (btnPlay && btnPause && btnClear) {
    btnPlay.onclick = () => {
        btnPlay.style.display = 'none'
        btnPause.style.display = 'flex'
        btnClear.style.display = 'flex'

        running = true

        interval = setInterval(() => {
            if (running) escreverCodigo()
        }, 800)
    }

    btnPause.onclick = () => {
        btnPlay.style.display = 'flex'
        btnPause.style.display = 'none'

        running = false;
        if (interval) {
            clearInterval(interval)
            interval = null
        }
    }

    btnClear.onclick = () => {
        term.value = ""
        currentLine = ""
        currentIndex = 0
    }
}