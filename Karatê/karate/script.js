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

let indice = 0;
let pontos = 0;

const pergunta = document.getElementById("pergunta");
const respostas = document.getElementById("respostas");
const proxima = document.getElementById("proxima");
const contador = document.getElementById("contador");
const pontuacao = document.getElementById("pontuacao");
const barra = document.getElementById("barra");
const feedback = document.getElementById("feedback");

// ==============================
// CARREGA PERGUNTA
// ==============================

function carregarPergunta() {

    proxima.style.display = "none";
    proxima.disabled = false;

    contador.textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;

    pontuacao.textContent = `Pontos: ${pontos}`;

    barra.style.width = `${(indice / perguntas.length) * 100}%`;

    pergunta.textContent = perguntas[indice].pergunta;

    respostas.innerHTML = "";

    perguntas[indice].respostas.forEach((texto, i) => {

        const botao = document.createElement("button");

        botao.className = "resposta";

        botao.textContent = texto;

        botao.onclick = () => selecionarResposta(botao, i);

        respostas.appendChild(botao);

    });

}

// ==============================
// SELECIONA RESPOSTA
// ==============================

function selecionarResposta(botao, indiceResposta) {

    const botoes = document.querySelectorAll(".resposta");

    botoes.forEach(btn => {

        btn.classList.add("desativada");

    });

    if (indiceResposta === perguntas[indice].correta) {

        botao.classList.add("correta");

        pontos++;

        pontuacao.textContent = `Pontos: ${pontos}`;

        feedback.innerHTML = "✔ Resposta Correta!";

        feedback.className = "text-center fw-bold fs-4 correta-texto";

    }

    else {

        botao.classList.add("errada");

        botoes[perguntas[indice].correta].classList.add("correta");

        feedback.innerHTML = "❌ Resposta Incorreta!";

        feedback.className = "text-center fw-bold fs-4 errada-texto";

    }

    setTimeout(() => {

        feedback.innerHTML = "";

        proxima.style.display = "inline-block";

    }, 1000);

}

// ==============================
// BOTÃO PRÓXIMA
// ==============================

proxima.addEventListener("click", () => {

    proxima.disabled = true;

    indice++;

    if (indice < perguntas.length) {

        carregarPergunta();

    } else {

        barra.style.width = "100%";

        mostrarResultado();

    }

});

// ==============================
// RESULTADO FINAL
// ==============================

function mostrarResultado() {

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
// ======================
// FEEDBACK
// ======================

let notaSelecionada = 0;

const estrelas = document.querySelectorAll(".estrela");

estrelas.forEach(estrela => {

    estrela.addEventListener("click", () => {

        notaSelecionada = estrela.dataset.nota;

        estrelas.forEach(e => {

            e.classList.remove("bi-star-fill", "ativa");

            e.classList.add("bi-star");

        });

        for (let i = 0; i < notaSelecionada; i++) {

            estrelas[i].classList.remove("bi-star");

            estrelas[i].classList.add("bi-star-fill", "ativa");

        }

    });

});

function salvarFeedback() {

    const nome = document.getElementById("nomeFeedback").value.trim();

    const comentario = document.getElementById("comentarioFeedback").value.trim();

    if (nome === "" || comentario === "" || notaSelecionada == 0) {

        alert("Preencha todos os campos.");

        return;

    }

    const feedback = {

        nome,

        comentario,

        nota: notaSelecionada

    };

    const lista = JSON.parse(localStorage.getItem("feedbacks")) || [];

    lista.push(feedback);

    localStorage.setItem("feedbacks", JSON.stringify(lista));

    document.getElementById("nomeFeedback").value = "";

    document.getElementById("comentarioFeedback").value = "";

    notaSelecionada = 0;

    estrelas.forEach(e => {

        e.classList.remove("bi-star-fill", "ativa");

        e.classList.add("bi-star");

    });

    carregarFeedbacks();

    const mensagem = document.getElementById("mensagemFeedback");

    mensagem.classList.remove("d-none");

    setTimeout(() => {

        mensagem.classList.add("mostrar");

    }, 10);

    setTimeout(() => {

        mensagem.classList.remove("mostrar");

        setTimeout(() => {

            mensagem.classList.add("d-none");

        }, 600);

    }, 3500);

    document.getElementById("nomeFeedback").focus();

}

function carregarFeedbacks() {

    const listaFeedbacks = document.getElementById("listaFeedbacks");

    listaFeedbacks.innerHTML = "";

    const lista = JSON.parse(localStorage.getItem("feedbacks")) || [];

    lista.reverse().forEach(item => {

        let estrelas = "";

        for (let i = 0; i < item.nota; i++) {

            estrelas += "⭐";

        }

        listaFeedbacks.innerHTML += `

            <div class="feedback-card">

                <h5>${item.nome}</h5>

                <p>${estrelas}</p>

                <p>${item.comentario}</p>

            </div>

        `;

    });

}

carregarFeedbacks();