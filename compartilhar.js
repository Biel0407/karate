document.addEventListener("DOMContentLoaded", () => {
    const botaoCompartilhar = document.getElementById("btnCompartilhar");
    const botaoCopiar = document.getElementById("btnCopiarLink");
    const botaoWhatsApp = document.getElementById("btnWhatsApp");
    const urlAtual = window.location.href;
    const titulo = document.title;
    const mensagem = `Confira o site ${titulo}: ${urlAtual}`;

    const copiarTexto = async (texto) => {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(texto);
            return true;
        }

        const campo = document.createElement("textarea");
        campo.value = texto;
        campo.setAttribute("readonly", "true");
        campo.style.position = "absolute";
        campo.style.left = "-9999px";
        document.body.appendChild(campo);
        campo.select();

        const copiado = document.execCommand("copy");
        document.body.removeChild(campo);

        return copiado;
    };

    if (botaoWhatsApp) {
        botaoWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
    }

    if (botaoCompartilhar) {
        botaoCompartilhar.addEventListener("click", async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: titulo,
                        text: "Conheça este site sobre Karatê-Do.",
                        url: urlAtual,
                    });
                } catch (erro) {
                    console.error(erro);
                }
                return;
            }

            if (botaoCopiar) {
                botaoCopiar.click();
            }
        });
    }

    if (botaoCopiar) {
        botaoCopiar.addEventListener("click", async () => {
            try {
                const copiado = await copiarTexto(urlAtual);

                if (!copiado) {
                    throw new Error("Não foi possível copiar o link.");
                }

                botaoCopiar.textContent = "Link copiado";
                setTimeout(() => {
                    botaoCopiar.textContent = "Copiar link";
                }, 1800);
            } catch (erro) {
                console.error(erro);
                botaoCopiar.textContent = "Tente novamente";
                setTimeout(() => {
                    botaoCopiar.textContent = "Copiar link";
                }, 1800);
            }
        });
    }
});