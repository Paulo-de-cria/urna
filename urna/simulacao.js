const digito1 = document.getElementById("digito-1");
const digito2 = document.getElementById("digito-2");
const cargoVoto = document.getElementById("cargo-voto");
const numeroCandidato = document.getElementById("numero-candidato");
const nomeCandidato = document.getElementById("nome-candidato");
const partidoCandidato = document.getElementById("partido-candidato");
const viceCandidato = document.getElementById("vice-candidato");
const fotoGovernador = document.getElementById("foto-governador");
const fotoVice = document.getElementById("foto-vice");
const mensagemNulo = document.getElementById("mensagem-nulo");
const imagens = document.querySelector(".imagens");

let numeroAtual = "";
let etapaAtual = "governador"; 

const votos = JSON.parse(localStorage.getItem("votos")) || {
    governador: {
        "72": 0,
        "10": 0,
        "12": 0,
        "18": 0,
        nulo: 0,
        branco: 0
    },
    presidente: {
        "22": 0,
        "13": 0,
        nulo: 0,
        branco: 0
    }
};

imagens.style.display = "none";

document.querySelectorAll(".botao").forEach(botao => {
    botao.addEventListener("click", () => {
        const numero = botao.dataset.numero;

        if (numeroAtual.length < 2) {
            numeroAtual += numero;
            atualizarDigitos();
        }

        if (numeroAtual.length === 2) {
            verificarCandidato();
        }
    });
});

document.querySelector(".corrige").addEventListener("click", () => {
    numeroAtual = "";
    atualizarDigitos();
    limparTela();
});

document.querySelector(".branco").addEventListener("click", () => {
    numeroAtual = "branco";
    atualizarDigitos();
    exibirBranco();
});

document.querySelector(".confirma").addEventListener("click", () => {
    if (numeroAtual.length === 2 || numeroAtual === "branco") {
        registrarVoto();
        avancarEtapa();
    } else {
        mensagemNulo.textContent = "Por favor, complete o voto.";
    }
});

function atualizarDigitos() {
    digito1.textContent = numeroAtual[0] || "_";
    digito2.textContent = numeroAtual[1] || "_";
}

function verificarCandidato() {
    limparTela();

    if (etapaAtual === "governador") {
        if (numeroAtual === "72") {
            exibirCandidato("72", "The Pebble", "PP", "The Rock", "img/governador1.png", "img/vicegovernador1.png");
        } else if (numeroAtual === "10") {
            exibirCandidato("10", "Ben 10", "PH", "Gwen", "img/governador2.png", "img/vicegovernador2.png");
        } else if (numeroAtual === "12") {
            exibirCandidato("12", "Serjão", "PATC", "Onça", "img/governador3.png", "img/vicegovernador3.png");
        } else if (numeroAtual === "18") {
            exibirCandidato("18", "Alanzoka", "PS", "Casemiro", "img/governador4.png", "img/vicegovernador4.png");
        } else {
            mensagemNulo.textContent = "VOTO NULO";
        }
    } else if (etapaAtual === "presidente") {
        if (numeroAtual === "22") {
            exibirCandidato("22", "Batman", "PH", "Superman", "img/presidente1.png", "img/vicepresidente1.png");
        } else if (numeroAtual === "13") {
            exibirCandidato("13", "Mario", "PS", "Luigi", "img/presidente2.png", "img/vicepresidente2.png");
        } else {
            mensagemNulo.textContent = "VOTO NULO";
        }
    }
}

function exibirCandidato(numero, nome, partido, vice, fotoGovernadorSrc, fotoViceSrc) {
    numeroCandidato.textContent = numero;
    nomeCandidato.textContent = nome;
    partidoCandidato.textContent = partido;
    viceCandidato.textContent = vice;
    fotoGovernador.src = fotoGovernadorSrc;
    fotoVice.src = fotoViceSrc;
    imagens.style.display = "block";
}

function exibirBranco() {
    mensagemNulo.textContent = "VOTO EM BRANCO";
}

function limparTela() {
    numeroCandidato.textContent = "--";
    nomeCandidato.textContent = "---";
    partidoCandidato.textContent = "---";
    viceCandidato.textContent = "---";
    fotoGovernador.src = "";
    fotoVice.src = "";
    mensagemNulo.textContent = "";
    imagens.style.display = "none";
}

function registrarVoto() {
    if (numeroAtual === "branco") {
        votos[etapaAtual].branco++;
    } else if (mensagemNulo.textContent === "VOTO NULO") {
        votos[etapaAtual].nulo++;
    } else {
        votos[etapaAtual][numeroAtual]++;
    }

    localStorage.setItem("votos", JSON.stringify(votos));
}

function avancarEtapa() {
    if (etapaAtual === "governador") {
        etapaAtual = "presidente";
        cargoVoto.textContent = "Presidente";
        numeroAtual = "";
        atualizarDigitos();
        limparTela();
    } else {
        exibirResultados();
    }
}

function exibirResultados() {
    document.body.innerHTML = `
        <main class="resultados">
            <h1>Resultados da Votação</h1>
            <section class="resultado-cargo">
                <h2>Governador</h2>
                ${exibirResultadoCargos("governador")}
            </section>
            <section class="resultado-cargo">
                <h2>Presidente</h2>
                ${exibirResultadoCargos("presidente")}
            </section>
            <button class="botao-inicio" onclick="voltarAoInicio()">Voltar ao início</button>
        </main>
    `;
}

function exibirResultadoCargos(cargo) {
    const resultados = Object.entries(votos[cargo]).map(
        ([numero, total]) => {
            return `<p>${numero}: ${total} voto(s)</p>`;
        }
    ).join("");
    return `<div>${resultados}</div>`;
}

function voltarAoInicio() {
    location.href = "index.html";
}

function reiniciarVotos() {
    const votosIniciais = {
        governador: {
            "72": 0,
            "10": 0,
            "12": 0,
            "18": 0,
            nulo: 0,
            branco: 0
        },
        presidente: {
            "22": 0,
            "13": 0,
            nulo: 0,
            branco: 0
        }
    };

    localStorage.setItem("votos", JSON.stringify(votosIniciais));

    alert("Votos reiniciados com sucesso!");
    location.reload();
}