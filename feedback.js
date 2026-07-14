import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// ==============================
// VARIÁVEIS
// ==============================

let notaSelecionada = 0;

let quantidadeExibida = 3;

let todosFeedbacks = [];

const estrelas = document.querySelectorAll("#estrelas span");

const nomeInput = document.getElementById("nomeFeedback");

const comentarioInput = document.getElementById("comentarioFeedback");

const btnEnviar = document.getElementById("btnEnviarFeedback");

const listaFeedbacks = document.getElementById("listaFeedbacks");

const btnVerMais = document.getElementById("btnVerMais");

const mediaNota = document.getElementById("mediaNota");

const estrelasMedia = document.getElementById("estrelasMedia");

const totalAvaliacoes = document.getElementById("totalAvaliacoes");

// ==============================
// ESTRELAS
// ==============================

estrelas.forEach((estrela) => {

    estrela.addEventListener("click", () => {

        notaSelecionada = Number(estrela.dataset.nota);

        atualizarEstrelas();

    });

});

function atualizarEstrelas() {

    estrelas.forEach((estrela) => {

        if (Number(estrela.dataset.nota) <= notaSelecionada) {

            estrela.textContent = "★";

            estrela.classList.add("ativa");

        } else {

            estrela.textContent = "☆";

            estrela.classList.remove("ativa");

        }

    });

}
// ==============================
// GERA ESTRELAS
// ==============================

function gerarEstrelas(nota) {

    let estrelas = "";

    for (let i = 1; i <= 5; i++) {

        estrelas += i <= nota ? "★" : "☆";

    }

    return estrelas;

}
// ==============================
// COR DO AVATAR
// ==============================

function corAvatar(nome) {

    const cores = [

        "#dc3545",
        "#198754",
        "#0d6efd",
        "#fd7e14",
        "#6f42c1",
        "#20c997",
        "#6610f2"

    ];

    let soma = 0;

    for (let letra of nome) {

        soma += letra.charCodeAt(0);

    }

    return cores[soma % cores.length];

}
// ==============================
// EXIBE OS FEEDBACKS
// ==============================

function exibirFeedbacks() {

    listaFeedbacks.innerHTML = "";

    if (todosFeedbacks.length === 0) {

        listaFeedbacks.innerHTML = `

            <div class="text-center py-5">

                <h1 style="font-size:55px;">💬</h1>

                <h4>Ainda não há avaliações.</h4>

                <p class="text-muted">
                    Seja o primeiro a compartilhar sua opinião!
                </p>

            </div>

        `;

        btnVerMais.style.display = "none";

        return;

    }

    const feedbacksVisiveis = todosFeedbacks.slice(0, quantidadeExibida);

    feedbacksVisiveis.forEach(item => {

        const inicial = item.nome.charAt(0).toUpperCase();

        const card = document.createElement("div");

        card.className = "feedback-card";

        card.innerHTML = `

        <div class="feedback-avatar"
            style="background:${corAvatar(item.nome)}">

            ${inicial}

        </div>

        <div class="feedback-conteudo">

            <div class="feedback-cabecalho">

                <div>

                    <div class="feedback-nome">

                        ${item.nome}

                    </div>

                    <div class="feedback-data">

                        ${item.data}

                    </div>

                </div>

                <div class="feedback-estrelas">

                    ${gerarEstrelas(item.nota)}

                </div>

            </div>

            <div class="feedback-comentario">

                ${item.comentario}

            </div>

        </div>

        `;

        listaFeedbacks.appendChild(card);

    });

    // Atualiza o botão

    if (todosFeedbacks.length <= 3) {

        btnVerMais.style.display = "none";

    } else {

        btnVerMais.style.display = "inline-block";

        if (quantidadeExibida >= todosFeedbacks.length) {

            btnVerMais.innerHTML = "▲ Mostrar menos";

        } else {

            btnVerMais.innerHTML = "▼ Ver mais comentários";

        }

    }

}

// ==============================
// TEMPO RELATIVO
// ==============================

function tempoRelativo(timestamp) {

    if (!timestamp) return "Agora";

    const agora = new Date();
    const data = timestamp.toDate();

    const diff = Math.floor((agora - data) / 1000);

    if (diff < 60)
        return "Agora";

    if (diff < 3600) {

        const minutos = Math.floor(diff / 60);

        return minutos === 1
            ? "Há 1 minuto"
            : `Há ${minutos} minutos`;

    }

    if (diff < 86400) {

        const horas = Math.floor(diff / 3600);

        return horas === 1
            ? "Há 1 hora"
            : `Há ${horas} horas`;

    }

    if (diff < 172800)
        return "Ontem";

    const dias = Math.floor(diff / 86400);

    return `Há ${dias} dias`;

}
// ==============================
// CARREGA FEEDBACKS DO FIRESTORE
// ==============================

function carregarFeedbacks() {

    const q = query(
        collection(db, "feedbacks"),
        orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {

        todosFeedbacks = [];

        snapshot.forEach((doc) => {

            const dados = doc.data();

            todosFeedbacks.push({

                id: doc.id,
                nome: dados.nome,
                comentario: dados.comentario,
                nota: dados.nota,
                data: tempoRelativo(dados.createdAt)

            });

        });

        atualizarMedia();
        exibirFeedbacks();

    });

}

carregarFeedbacks();
// ==============================
// MÉDIA DAS AVALIAÇÕES
// ==============================

function atualizarMedia() {

    if (todosFeedbacks.length === 0) {

        mediaNota.textContent = "0,0";
        estrelasMedia.innerHTML = "☆☆☆☆☆";
        totalAvaliacoes.textContent = "Nenhuma avaliação";

        return;

    }


    const soma = todosFeedbacks.reduce((total, item) => total + item.nota, 0);

    const media = soma / todosFeedbacks.length;

    const contagem = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };

    todosFeedbacks.forEach(item => {

        contagem[item.nota]++;

    });

    for (let nota = 1; nota <= 5; nota++) {

        document.getElementById(`qtd${nota}`).textContent =
            contagem[nota];

        document.getElementById(`barra${nota}`).style.width =
            `${(contagem[nota] / todosFeedbacks.length) * 100}%`;

    }

    mediaNota.textContent = media.toFixed(1).replace(".", ",");

    totalAvaliacoes.textContent =
        `${todosFeedbacks.length} ${todosFeedbacks.length === 1 ? "avaliação" : "avaliações"}`;

    let estrelas = "";

    for (let i = 1; i <= 5; i++) {

        estrelas += i <= Math.round(media)
            ? "★"
            : "☆";

    }

    estrelasMedia.innerHTML = estrelas;

}

carregarFeedbacks();



// ==============================
// SALVAR FEEDBACK
// ==============================

async function salvarFeedback(nome, comentario, nota) {

    await addDoc(collection(db, "feedbacks"), {

        nome,
        comentario,
        nota,
        createdAt: serverTimestamp()

    });

}
// ==============================
// ENVIAR FEEDBACK
// ==============================

// ==============================
// ENVIAR FEEDBACK
// ==============================

btnEnviar.addEventListener("click", async () => {

    const nome = nomeInput.value.trim();
    const comentario = comentarioInput.value.trim();

    if (!nome) {

        alert("Digite seu nome.");
        nomeInput.focus();
        return;

    }

    if (notaSelecionada === 0) {

        alert("Escolha uma nota.");
        return;

    }

    if (!comentario) {

        alert("Digite um comentário.");
        comentarioInput.focus();
        return;

    }

    try {

        await salvarFeedback(
            nome,
            comentario,
            notaSelecionada
        );

        nomeInput.value = "";
        comentarioInput.value = "";
        notaSelecionada = 0;

        atualizarEstrelas();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao enviar a avaliação.");

    }

});

// ==============================
// BOTÃO VER MAIS
// ==============================

btnVerMais.addEventListener("click", () => {

    if (quantidadeExibida >= todosFeedbacks.length) {

        quantidadeExibida = 3;

        exibirFeedbacks();

        document.querySelector("#listaFeedbacks").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } else {

        quantidadeExibida += 3;

        exibirFeedbacks();

    }

});