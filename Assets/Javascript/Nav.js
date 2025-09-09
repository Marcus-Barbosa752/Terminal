const LiModeLinguagem = document.getElementById('LiModeLinguagem')
const LiAjustes = document.getElementById('LiAjustes')

const SpanLinguagerSelect = document.querySelectorAll('#SpanLinguagerSelect')
const SpanSelectFontSize = document.getElementById('SpanSelectFontSize')
const SpanVelocidadeCodeSelect = document.querySelectorAll("#SpanVelocidadeCodeSelect")
const SpanInsertModeLinguagem = document.getElementById("SpanInsertModeLinguagem")

const SelectLanguager = document.getElementById('SelectLanguager')
const EscolharLinguagem = document.getElementById('EscolharLinguagem')
const SelectVelocidadeCodeOptions = document.getElementById('SelectVelocidadeCodeOptions')
const Ajustes = document.getElementById("Ajustes")

const InputSelectFontSize = document.getElementById('InputSelectFontSize')
const InputSelectVelocidadeCode = document.getElementById("InputSelectVelocidadeCode")
const InputSelectFontColor = document.getElementById("InputSelectFontColor")
const InputSetFontColor = document.getElementById("InputSetFontColor")

InputSelectFontSize.oninput = () => {
    localStorage.setItem('FontSize', InputSelectFontSize.value)
    SpanSelectFontSize.textContent = `${localStorage.getItem("FontSize")}px`
    document.getElementById('term').style.fontSize = `${localStorage.getItem("FontSize")}px`
}

InputSelectVelocidadeCode.onclick = () => {
    SelectVelocidadeCodeOptions.classList.toggle('SelectVelocidadeCodeOptionsActivate')

    SpanVelocidadeCodeSelect.forEach(Span => {
        Span.onclick = () => {
            SpanVelocidadeCodeSelect.forEach(span => span.classList.remove('SpanVelocidadeCodeSelect'))
            Span.classList.add('SpanVelocidadeCodeSelect')
            InputSelectVelocidadeCode.textContent = Span.textContent
        }
    })
}

InputSelectFontColor.oninput = () => {
    const SaveColor = InputSelectFontColor.value
    localStorage.setItem('FontColor', SaveColor)
    document.getElementById("term").style.color = localStorage.getItem('FontColor') || "rgb(55, 255, 0)"
    InputSetFontColor.value = localStorage.getItem('FontColor') || "rgb(55, 255, 0)"
}

InputSetFontColor.oninput = () => {
    const SaveColor = InputSetFontColor.value
    localStorage.setItem('FontColor', SaveColor)
    document.getElementById("term").style.color = localStorage.getItem('FontColor') || "rgb(55, 255, 0)"
    InputSelectFontColor.value = localStorage.getItem('FontColor') || "rgb(55, 255, 0)"
}

LiModeLinguagem.onclick = () => {
    LiModeLinguagem.classList.toggle("LiNavHeaderActive")
    LiAjustes.classList.remove("LiNavHeaderActive")

    SelectLanguager.classList.toggle('SelectLanguagerActivate')
    Ajustes.classList.remove("AjustesActive")

    SpanLinguagerSelect.forEach(Span => {
        Span.onclick = () => {
            SpanLinguagerSelect.forEach(span => span.classList.remove('SpanLinguagerSelect'))
            Span.classList.add('SpanLinguagerSelect')
            document.title = `Terminal - ${Span.textContent}`
            EscolharLinguagem.value = Span.textContent
            SpanInsertModeLinguagem.textContent = Span.textContent
        }
    })
}

LiAjustes.onclick = () => {
    LiModeLinguagem.classList.remove("LiNavHeaderActive")
    LiAjustes.classList.toggle("LiNavHeaderActive")

    SelectLanguager.classList.remove('SelectLanguagerActivate')
    Ajustes.classList.toggle("AjustesActive")
}