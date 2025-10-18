import { Python, Cpp, Java, Javascript } from "./ListaLiguagens.js"

const term = document.getElementById("term")
const InputSelectVelocidadeCodes = document.getElementById("InputSelectVelocidadeCode")
const EscolherLinguagem = document.getElementById("EscolharLinguagem")
const btnPlay = document.getElementById("btnPlay")
const btnPause = document.getElementById("btnPause")
const btnClear = document.getElementById("btnClear")

// Opções de linguagem e velocidade
const LinguagemOptions = document.querySelectorAll(".SelectLanguagerOptions span")
const VelocidadeOptions = document.querySelectorAll(".SelectVelocidadeCodeOptions span")

let running = false
let interval = null
let currentLine = ""
let currentIndex = 0

const codeSamples = {
    Python: Python["Python"],
    "C++": Cpp["C++"],
    Java: Java["Java"],
    Javascript: Javascript["Javascript"],
    "Todos": []
}

const speedModes = {
    "Normal": 1,
    "Fast": 5,
    "Ultra rápido": 10
}

// ======== LÓGICA PRINCIPAL ========

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

function escreverCodigo() {
    if (!running) return

    const linguagem = EscolherLinguagem?.value || "Todos"
    const velocidade = InputSelectVelocidadeCodes?.textContent?.trim() || "Normal"
    const step = speedModes[velocidade] || 1

    // Gera nova linha se terminou a atual
    if (!currentLine || currentIndex >= currentLine.length) {
        currentLine = gerarLinha(linguagem) + "\n"
        currentIndex = 0
    }

    // Escreve o código gradualmente
    const caracteresParaEscrever = Math.min(step, currentLine.length - currentIndex)
    const novosCaracteres = currentLine.substr(currentIndex, caracteresParaEscrever)

    term.value += novosCaracteres
    term.scrollTop = term.scrollHeight
    currentIndex += caracteresParaEscrever
}

// ======== EVENTOS DE SELEÇÃO ========

// Trocar linguagem
LinguagemOptions.forEach(span => {
    span.addEventListener("click", () => {
        const valor = span.textContent.trim()
        EscolherLinguagem.value = valor
        document.getElementById("SpanInsertModeLinguagem").textContent = valor
    })
})

// Trocar velocidade
VelocidadeOptions.forEach(span => {
    span.addEventListener("click", () => {
        InputSelectVelocidadeCodes.textContent = span.textContent.trim()
    })
})

// ======== EVENTO TECLADO ========

term.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (!running) running = true
    escreverCodigo()
})

// ======== CONTROLES ========

if (btnPlay && btnPause && btnClear) {
    btnPlay.onclick = () => {
        btnPlay.style.display = 'none'
        btnPause.style.display = 'flex'
        btnClear.style.display = 'flex'

        running = true

        const velocidade = InputSelectVelocidadeCodes?.textContent?.trim() || "Normal"
        const intervalTime = 1000 / speedModes[velocidade]

        interval = setInterval(() => {
            if (running) escreverCodigo()
        }, intervalTime)
    }

    btnPause.onclick = () => {
        btnPlay.style.display = 'flex'
        btnPause.style.display = 'none'
        running = false
        if (interval) {
            clearInterval(interval)
            interval = null
        }
    }

    btnClear.onclick = () => {
        term.value = ""
        currentLine = ""
        currentIndex = 0
        running = false

        if (interval) {
            clearInterval(interval)
            interval = null
        }

        btnPlay.style.display = 'flex'
        btnPause.style.display = 'none'
    }
}
