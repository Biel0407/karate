import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    getDocs,
    limit
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

            <div
                class="avatar"
                style="background:${corAvatar(item.nome)}">

                ${inicial}

            </div>

            <div class="feedback-info">

                <div class="feedback-topo">

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

                <div class="feedback-texto">

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
async function carregarFeedbacks() {

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
                data: "Agora"

            });

        });

        exibirFeedbacks();

    });

}

carregarFeedbacks();

btnEnviar.addEventListener("click", async () => {

    const nome = nomeInput.value.trim();
    const comentario = comentarioInput.value.trim();

    if (nome === "") {
        alert("Digite seu nome.");
        return;
    }

    if (notaSelecionada === 0) {
        alert("Selecione uma nota.");
        return;
    }

    if (comentario === "") {
        alert("Digite um comentário.");
        return;
    }

    try {

        await addDoc(collection(db, "feedbacks"), {

            nome,
            comentario,
            nota: notaSelecionada,
            createdAt: serverTimestamp()

        });

        nomeInput.value = "";
        comentarioInput.value = "";
        notaSelecionada = 0;
        atualizarEstrelas();

        alert("Obrigado pelo seu feedback!");

    } catch (erro) {

        console.error(erro);
        alert("Erro ao enviar o feedback.");

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