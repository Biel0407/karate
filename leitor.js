let leitura = null;

const botao = document.getElementById("btnLerPagina");

botao.addEventListener("click", () => {

    if (speechSynthesis.speaking) {

        speechSynthesis.cancel();

        botao.innerHTML = "🔊 Ouvir página";

        return;

    }

    const texto = document.body.innerText;

    leitura = new SpeechSynthesisUtterance(texto);

    leitura.lang = "pt-BR";

    leitura.rate = 1;

    leitura.pitch = 1;

    leitura.onend = () => {

        botao.innerHTML = "🔊 Ouvir página";

    };

    botao.innerHTML = "⏹ Parar leitura";

    speechSynthesis.speak(leitura);

});