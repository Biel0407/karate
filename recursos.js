document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll("[data-painel]");
    const panels = document.querySelectorAll(".resource-panel[data-painel]");
    const searchInput = document.getElementById("filtroGlossario");
    const glossaryCards = document.querySelectorAll("#glossarioCards .glossary-card");
    const resultLabel = document.getElementById("resultadoGlossario");
    const glossaryButton = document.getElementById("btnVerMaisGlossario");
    const visibleDefault = 6;
    let expanded = false;

    const ativarPainel = (nomePainel) => {
        tabs.forEach((tab) => {
            tab.classList.toggle("active", tab.dataset.painel === nomePainel);
        });

        panels.forEach((panel) => {
            panel.classList.toggle("active", panel.dataset.painel === nomePainel);
        });
    };

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => ativarPainel(tab.dataset.painel));
    });

    const atualizarBotao = (totalMatch) => {
        if (!glossaryButton) {
            return;
        }

        if (totalMatch <= visibleDefault) {
            glossaryButton.style.display = "none";
            return;
        }

        glossaryButton.style.display = "inline-block";
        glossaryButton.textContent = expanded ? "Ver menos termos" : "Ver mais termos";
    };

    const atualizarGlossario = () => {
        if (!searchInput || !resultLabel) {
            return;
        }

        const termo = searchInput.value.trim().toLowerCase();
        let visiveis = 0;
        let totalMatch = 0;

        glossaryCards.forEach((card, indice) => {
            const texto = `${card.dataset.termo} ${card.innerText}`.toLowerCase();
            const correspondeBusca = texto.includes(termo);
            if (correspondeBusca) {
                totalMatch += 1;
            }

            const mostrar = correspondeBusca && (expanded || indice < visibleDefault || termo.length > 0);
            card.classList.toggle("is-hidden", !mostrar);

            if (mostrar) {
                visiveis += 1;
            }
        });

        if (termo.length === 0) {
            resultLabel.textContent = `${glossaryCards.length} termos`;
        } else {
            resultLabel.textContent = `${visiveis} encontrado${visiveis === 1 ? "" : "s"}`;
        }

        atualizarBotao(totalMatch);
    };

    if (searchInput && resultLabel) {
        searchInput.addEventListener("input", atualizarGlossario);

        if (glossaryButton) {
            glossaryButton.addEventListener("click", () => {
                expanded = !expanded;
                atualizarGlossario();
            });
        }

        atualizarGlossario();
    }
});