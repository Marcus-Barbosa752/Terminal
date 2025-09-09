window.addEventListener("DOMContentLoaded", () => {
    const fontSizeInput = document.getElementById("InputSelectFontSize")
    const fontSizeSpan = document.getElementById("SpanSelectFontSize")
    const term = document.getElementById("term")

    fontSizeInput.addEventListener("input", () => {
        const size = fontSizeInput.value
        fontSizeSpan.textContent = `${size}px`
        term.style.fontSize = `${size}px`
    })

    document.getElementById("InputSelectFontColor").value = localStorage.getItem('FontColor') || "rgb(55, 255, 0)"
    document.getElementById("term").style.color = localStorage.getItem('FontColor') || "rgb(55, 255, 0)"
})