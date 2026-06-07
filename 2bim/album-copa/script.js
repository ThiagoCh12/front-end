/* =========================================================
   Questão 3 - Botão "Próximo": alterna os grupos exibidos
   na página (A/B/C  <->  D/E/F), mantendo estilo e estrutura.
   ========================================================= */

// Dados dos grupos divididos em duas "páginas"
const paginasDeGrupos = [
    // Página 1 -> Grupos A, B e C
    [
        {
            id: "grupo-a",
            nome: "🅰️ Grupo A",
            selecoes: ["México", "África do Sul", "Coreia do Sul", "República Tcheca"],
            fatos: "O jogo de abertura será México x África do Sul. Confrontos entre Coreia do Sul e seleções europeias já ocorreram em várias Copas, com histórico equilibrado."
        },
        {
            id: "grupo-b",
            nome: "🅱️ Grupo B",
            selecoes: ["Canadá", "Suíça", "Catar", "Vaga Europeia (Bósnia)"],
            fatos: "O Canadá joga em casa, fator importante de desempenho. Catar e Suíça já se enfrentaram recentemente em amistosos internacionais."
        },
        {
            id: "grupo-c",
            nome: "🅲 Grupo C",
            selecoes: ["Brasil", "Marrocos", "Haiti", "Escócia"],
            fatos: "Brasil, Marrocos e Escócia já dividiram grupo em 1998. Brasil nunca perdeu para a Escócia em Copas."
        }
    ],
    // Página 2 -> Grupos D, E e F
    [
        {
            id: "grupo-d",
            nome: "🅳 Grupo D",
            selecoes: ["Estados Unidos", "Paraguai", "Austrália", "Turquia"],
            fatos: "Os EUA jogam em casa, vantagem histórica em Copas. Austrália enfrenta frequentemente seleções sul-americanas em torneios."
        },
        {
            id: "grupo-e",
            nome: "🅴 Grupo E",
            selecoes: ["Alemanha", "Equador", "Costa do Marfim", "Curaçao"],
            fatos: "Alemanha costuma dominar fases de grupos. Equador e Costa do Marfim têm estilos físicos semelhantes."
        },
        {
            id: "grupo-f",
            nome: "🅵 Grupo F",
            selecoes: ["Holanda", "Japão", "Tunísia", "Suécia"],
            fatos: "Holanda chega como favorita do grupo. Japão e Suécia vêm de boas campanhas em Copas recentes."
        }
    ]
];

// Página atualmente exibida (0 = A/B/C, 1 = D/E/F)
let paginaAtual = 0;

// Monta o HTML de cada grupo e injeta no container
function renderizarGrupos() {
    const container = document.getElementById("lista-grupos");
    const grupos = paginasDeGrupos[paginaAtual];

    container.innerHTML = grupos.map(function (grupo) {
        const itens = grupo.selecoes
            .map(function (selecao) { return "<li>" + selecao + "</li>"; })
            .join("");

        return `
            <div class="grupo-card" id="${grupo.id}">
                <h4 class="grupo-titulo">${grupo.nome}</h4>
                <h5>Seleções</h5>
                <ul>${itens}</ul>
                <details>
                    <summary>Saiba Mais</summary>
                    <p>${grupo.fatos}</p>
                </details>
            </div>
        `;
    }).join("");
}

// Chamada pelo botão "Próximo": alterna entre as duas páginas
function proximo() {
    paginaAtual = (paginaAtual + 1) % paginasDeGrupos.length;
    renderizarGrupos();

    // Atualiza o texto do botão conforme a página
    const botao = document.getElementById("btn-proximo");
    if (botao) {
        botao.textContent = paginaAtual === 0 ? "Próximo" : "Voltar";
    }
}


/* =========================================================
   Questão 4 - add(): insere um novo card de jogador ao lado
   do card já existente, sem remover o anterior.
   ========================================================= */
function add() {
    const container = document.getElementById("container-album");

    // Evita inserir o mesmo jogador várias vezes
    if (document.getElementById("card-paqueta")) {
        return;
    }

    const novoCard = document.createElement("div");
    novoCard.className = "jogador-card";
    novoCard.id = "card-paqueta";
    novoCard.innerHTML = `
        <img src="img/Lucas_Paqueta.webp" alt="Lucas Paquetá" class="jogador-foto">
        <h3 class="jogador-nome">Lucas Paquetá</h3>
        <ul class="jogador-info">
            <li>📅 <strong>Nascimento:</strong> <span id="nascimento">27/08/1997 (28 anos)</span></li>
            <li>📏 <strong>Altura:</strong> <span id="altura">1,80 m</span></li>
            <li>🏃 <strong>Posição:</strong> <span id="posicao">Meio-campista</span></li>
            <li>⭐ <strong>Rank:</strong> <span id="rank">8,8</span></li>
        </ul>
    `;

    container.appendChild(novoCard);
}
