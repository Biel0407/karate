const botaoTema = document.getElementById("toggleTema");

// Verifica se já existe preferência salva
if (localStorage.getItem("tema") === "dark") {

    document.body.classList.add("dark-mode");

    botaoTema.innerHTML = "☀️ Modo Claro";

}

botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        botaoTema.textContent = "☀️";

    } else {

        botaoTema.textContent = "🌙";

    }

});