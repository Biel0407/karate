const botaoTema = document.getElementById("toggleTema");

if (botaoTema) {

    // Verifica se já existe preferência salva
    if (localStorage.getItem("tema") === "dark") {

        document.body.classList.add("dark-mode");

        botaoTema.textContent = "☀️";

    }

    botaoTema.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            botaoTema.textContent = "☀️";
            localStorage.setItem("tema", "dark");

        } else {

            botaoTema.textContent = "🌙";
            localStorage.setItem("tema", "light");

        }

    });

}