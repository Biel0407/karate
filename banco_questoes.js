document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("bancoQuestoesLista");
    const botao = document.getElementById("btnVerMaisBanco");

    if (!lista || !botao) {
        return;
    }

    const questoes = [
        { categoria: "História", pergunta: "Onde surgiu o karatê?" },
        { categoria: "História", pergunta: "Qual ilha é considerada o berço do karatê?" },
        { categoria: "História", pergunta: "O que significa a palavra Karatê-Do?" },
        { categoria: "História", pergunta: "Quem é considerado o pai do karatê moderno?" },
        { categoria: "História", pergunta: "Qual mestre ajudou a introduzir o karatê nas escolas de Okinawa?" },
        { categoria: "História", pergunta: "Quais foram os três estilos originais do Te?" },
        { categoria: "História", pergunta: "Que influência chinesa contribuiu para o desenvolvimento do karatê?" },
        { categoria: "Brasil", pergunta: "Em que período o karatê chegou ao Brasil?" },
        { categoria: "Brasil", pergunta: "Quem foi um dos primeiros mestres a ensinar karatê no Brasil?" },
        { categoria: "Brasil", pergunta: "Qual foi a primeira escola de karatê fundada em São Paulo?" },
        { categoria: "Brasil", pergunta: "Qual estilo foi divulgado por Mitsuke Harada?" },
        { categoria: "Brasil", pergunta: "Que entidade foi criada em 1960 para organizar o karatê no Brasil?" },
        { categoria: "RN", pergunta: "Quem trouxe o karatê para o Rio Grande do Norte?" },
        { categoria: "RN", pergunta: "Quem foi o primeiro faixa-preta formado no Rio Grande do Norte?" },
        { categoria: "RN", pergunta: "O que significa UKIRN?" },
        { categoria: "RN", pergunta: "Qual foi um dos primeiros grandes eventos que a UKIRN passou a representar?" },
        { categoria: "Ética", pergunta: "O que significa o termo Dojo Kun?" },
        { categoria: "Ética", pergunta: "Cite um dos valores centrais do karatê." },
        { categoria: "Ética", pergunta: "O que representa o termo 'Do' em Karatê-Do?" },
        { categoria: "Ética", pergunta: "Por que o autocontrole é importante na prática do karatê?" },
        { categoria: "Pilares", pergunta: "Quais são os três pilares do karatê?" },
        { categoria: "Pilares", pergunta: "O que é Kihon?" },
        { categoria: "Pilares", pergunta: "O que é Kata?" },
        { categoria: "Pilares", pergunta: "O que é Kumite?" },
        { categoria: "Pilares", pergunta: "Qual pilar desenvolve mais a base técnica?" },
        { categoria: "Técnica", pergunta: "O que significa Zanshin?" },
        { categoria: "Técnica", pergunta: "O que é Ma-ai?" },
        { categoria: "Técnica", pergunta: "O que significa Kiai?" },
        { categoria: "Técnica", pergunta: "O que é Gedan-barai?" },
        { categoria: "Técnica", pergunta: "O que é Mae-geri?" }
    ];

    const visibleDefault = 8;
    let expanded = false;

    lista.innerHTML = questoes
        .map((item, indice) => `
            <article class="bank-card ${indice >= visibleDefault ? "is-hidden" : ""}">
                <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                    <span class="bank-numero">${String(indice + 1).padStart(2, "0")}</span>
                    <span class="bank-tag">${item.categoria}</span>
                </div>
                <h4>${item.pergunta}</h4>
            </article>
        `)
        .join("");

    const atualizarBotao = () => {
        botao.textContent = expanded ? "Ver menos questões" : "Ver mais questões";
    };

    const atualizarVisibilidade = () => {
        const cards = lista.querySelectorAll(".bank-card");

        cards.forEach((card, indice) => {
            card.classList.toggle("is-hidden", !expanded && indice >= visibleDefault);
        });

        atualizarBotao();
    };

    botao.addEventListener("click", () => {
        expanded = !expanded;
        atualizarVisibilidade();
    });

    atualizarVisibilidade();
});