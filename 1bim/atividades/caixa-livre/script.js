const produto = {
    "101": { "nome": "Teclado Mecânico HyperX", "preco": 249.90 },
    "102": { "nome": "Mouse Gamer Logitech G305", "preco": 189.90 },
    "103": { "nome": "Headset JBL Quantum 100", "preco": 299.90 },
    "104": { "nome": "Mousepad XL Speed", "preco": 59.90 },
    "105": { "nome": "Webcam Full HD 1080p", "preco": 179.90 }
};

let carrinho = [];

window.onload = () => {
    document.getElementById("cod").focus();

    document.getElementById("cod").addEventListener("keypress", (e) => {
        if (e.key === "Enter") addProduto();
    });
};

function addProduto() {
    const codInput = document.getElementById("cod");
    const qtdInput = document.getElementById("qtd");
    const qtdXunSpan = document.getElementById("qtdXun");

    const codigo = codInput.value.trim();
    const quantidade = parseInt(qtdInput.value) || 1;

    if (!produto[codigo]) {
        mostrarAlerta("Produto não encontrado! Códigos válidos: 101, 102, 103, 104, 105", "danger");
        codInput.value = "";
        codInput.focus();
        return;
    }

    const produtoBase = produto[codigo];
    const subtotal = produtoBase.preco * quantidade;

    qtdXunSpan.textContent = subtotal.toFixed(2);

    const itemExistente = carrinho.find(i => i.codigo === codigo);
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
        itemExistente.subtotal += subtotal;
    } else {
        carrinho.push({
            codigo: codigo,
            nome: produtoBase.nome,
            preco: produtoBase.preco,
            quantidade: quantidade,
            subtotal: subtotal
        });
    }

    codInput.value = "";
    qtdInput.value = "1";
    codInput.focus();

    atualizarTela();
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarTela();
}

function atualizarTela() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.subtotal;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center bg-dark text-white border-secondary";

        li.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                <small>${item.quantidade} x R$ ${item.preco.toFixed(2)} = <strong>R$ ${item.subtotal.toFixed(2)}</strong></small>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="removerItem(${index})">X</button>
        `;

        lista.appendChild(li);
    });

    document.getElementById("Total").textContent = total.toFixed(2);
}

function mostrarAlerta(mensagem, tipo) {
    const alertDiv = document.getElementById("Alert");
    alertDiv.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show mx-3" role="alert">
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}
