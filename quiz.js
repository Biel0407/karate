// ==============================
// PERGUNTAS DO QUIZ
// ==============================

const perguntas = [
    {
        pergunta: "Onde surgiu o Karatê?",
        respostas: ["Japão", "China", "Okinawa", "Coreia"],
        correta: 2
    },
    {
        pergunta: "O significado da palavra Karatê é:",
        respostas: [
            "Punhos de ferro",
            "Espírito guerreiro",
            "Mãos vazias",
            "Caminho do samurai"
        ],
        correta: 2
    },
    {
        pergunta: "Quem é considerado o pai do Karatê moderno?",
        respostas: [
            "Kenwa Mabuni",
            "Gichin Funakoshi",
            "Chojun Miyagi",
            "Hironori Otsuka"
        ],
        correta: 1
    },
    {
        pergunta: "Qual destes NÃO era um dos estilos originais do Te?",
        respostas: [
            "Shuri-te",
            "Naha-te",
            "Tomari-te",
            "Shotokan"
        ],
        correta: 3
    },
    {
        pergunta: "Qual é o estilo de Karatê mais praticado no mundo?",
        respostas: [
            "Goju-Ryu",
            "Shotokan",
            "Shito-Ryu",
            "Wado-Ryu"
        ],
        correta: 1
    },
    {
        pergunta: "Quais são os três pilares do Karatê?",
        respostas: [
            "Defesa, Kata e Kumite",
            "Kata, Judô e Kihon",
            "Kihon, Kata e Kumite",
            "Kata, Boxe e Kumite"
        ],
        correta: 2
    },
    {
        pergunta: "Quem implantou o Karatê no Rio Grande do Norte?",
        respostas: [
            "Franklin Fernandes Ramos",
            "Juarez Alves Gomes",
            "Sensei Humberto",
            "Sensei Telvane"
        ],
        correta: 1
    },
    {
        pergunta: "Quem foi o primeiro faixa-preta formado no Rio Grande do Norte?",
        respostas: [
            "Juarez Alves Gomes",
            "Franklin Fernandes Ramos",
            "Sensei Humberto",
            "Sensei Akamine"
        ],
        correta: 1
    },
    {
        pergunta: "O que significa UKIRN?",
        respostas: [
            "União de Karatê Internacional",
            "União de Karatê Interestadual",
            "União de Karatê Interestilos do Rio Grande do Norte",
            "União de Karatê do Nordeste"
        ],
        correta: 2
    },
    {
        pergunta: "Em quais Jogos Olímpicos o Karatê estreou como modalidade olímpica?",
        respostas: [
            "Londres 2012",
            "Rio 2016",
            "Paris 2024",
            "Tóquio 2020"
        ],
        correta: 3
    }
];

// ==============================
// VARIÁVEIS
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    let indice = 0;
    let respostasUsuario = new Array(perguntas.length).fill(null);

    const pergunta = document.getElementById("pergunta");
    const respostas = document.getElementById("respostas");
    const proxima = document.getElementById("proxima");
    const contador = document.getElementById("contador");
    const barra = document.getElementById("barra");
    const feedback = document.getElementById("feedback");

    // ==============================
    // CARREGA PERGUNTA
    // ==============================

    function carregarPergunta() {

        const respostaSalva = respostasUsuario[indice];

        proxima.style.display = "inline-block";

        contador.textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;

        barra.style.width = `${((indice + 1) / perguntas.length) * 100}%`;

        pergunta.textContent = perguntas[indice].pergunta;

        respostas.innerHTML = "";

        perguntas[indice].respostas.forEach((texto, i) => {

            const botao = document.createElement("button");
            botao.className = "resposta";
            botao.textContent = texto;

            botao.onclick = () => selecionarResposta(botao, i);

            if (respostaSalva !== null) {
                botao.classList.add("desativada");

                if (i === respostaSalva) {
                    botao.classList.add("correta");
                }
            }

            respostas.appendChild(botao);
        });
    }
    // ==============================
    // SELECIONA RESPOSTA
    // ==============================

    function selecionarResposta(botao, indiceResposta) {

        const correta = perguntas[indice].correta;

        feedback.innerHTML = indiceResposta === correta
            ? "✔ Resposta Correta!"
            : "❌ Resposta Incorreta!";

        respostasUsuario[indice] = indiceResposta;

        const botoes = document.querySelectorAll(".resposta");

        botoes.forEach(btn => btn.classList.add("desativada"));
        botoes.forEach(btn => {
            btn.disabled = true;
        });

        if (indiceResposta === correta) {
            botao.classList.add("correta");
        } else {
            botao.classList.add("errada");
            botoes[correta].classList.add("correta");
        }



        setTimeout(() => {

            feedback.innerHTML = "";

            proxima.style.display = "inline-block";

        }, 1000);

    }
    document.getElementById("voltar").addEventListener("click", () => {
        if (indice > 0) {
            indice--;
            carregarPergunta();
        }
    });
    // ==============================
    // BOTÃO PRÓXIMA
    // ==============================

    document.getElementById("proxima").addEventListener("click", () => {

        if (indice < perguntas.length - 1) {
            indice++;
            carregarPergunta();
        } else {
            finalizarQuiz();
        }

    });

    // ==============================
    // FINALIZA O QUIZ
    // ==============================

    function finalizarQuiz() {

        let pontos = 0;

        respostasUsuario.forEach((resposta, i) => {

            if (resposta === perguntas[i].correta) {
                pontos++;
            }

        });

        mostrarResultado(pontos);

    }


    // ==============================
    // RESULTADO FINAL
    // ==============================

    function mostrarResultado(pontos) {

        let medalha = "";
        let mensagem = "";

        if (pontos === 10) {

            medalha = "🥇";

            mensagem = "Fantástico! Você demonstrou excelente conhecimento sobre a história e a filosofia do Karatê-Do.";

        } else if (pontos >= 8) {

            medalha = "🥈";

            mensagem = "Excelente desempenho! Você conhece muito bem o Karatê.";

        } else if (pontos >= 6) {

            medalha = "🥉";

            mensagem = "Muito bom! Continue treinando e estudando para evoluir ainda mais.";

        } else if (pontos >= 4) {

            medalha = "👏";

            mensagem = "Bom trabalho! Revise alguns conteúdos do site e tente novamente.";

        } else {

            medalha = "💪";

            mensagem = "Todo mestre já foi um iniciante. Continue estudando e volte para tentar novamente!";

        }

        const porcentagem = Math.round((pontos / perguntas.length) * 100);
        let faixa = "";
        let corFaixa = "";

        if (pontos <= 2) {

            faixa = "⚪ Faixa Branca";
            corFaixa = "#6c757d";

        }

        else if (pontos <= 5) {

            faixa = "🟨 Faixa Amarela";
            corFaixa = "#d4a017";

        }

        else if (pontos <= 7) {

            faixa = "🟩 Faixa Verde";
            corFaixa = "#198754";

        }

        else if (pontos <= 9) {

            faixa = "🟫 Faixa Marrom";
            corFaixa = "#8B4513";

        }

        else {

            faixa = "⬛ Faixa Preta";
            corFaixa = "#000";

        }

        document.querySelector(".quiz-container").innerHTML = `

<div class="text-center">

    <h1 style="
        font-size:110px;
        animation:pular 1s infinite;
    ">
        ${medalha}
    </h1>

    <h2 class="mb-4">
        Quiz Finalizado!
    </h2>

    <h3>
        Você acertou
    </h3>

    <h1 class="display-4 text-danger fw-bold">
        ${pontos} / ${perguntas.length}
    </h1>

    <h4 class="mb-4">
        Aproveitamento de ${porcentagem}%
    </h4>

    <h2
        style="
            color:${corFaixa};
            margin-top:25px;
            font-weight:bold;
        ">
        ${faixa}
    </h2>

    <p class="lead mt-3">
        ${mensagem}
    </p>

    <button
        class="btn btn-danger btn-lg mt-4"
        onclick="location.reload()">

        🔄 Jogar novamente

    </button>

</div>

`;
        if (pontos === 10) {

            confetti({

                particleCount: 300,

                spread: 180,

                origin: {

                    y: 0.6

                }

            });

        }

    }

    // ==============================
    // INICIA O QUIZ
    // ==============================

    carregarPergunta();

});