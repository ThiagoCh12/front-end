const estados = {
    feliz:     { emoji: "🤖", frase: "Estou ótimo! Pronto para codar!" },
    com_fome:  { emoji: "😤", frase: "Preciso de energia! Me alimente!" },
    triste:    { emoji: "😢", frase: "Estou entediado... vamos brincar?" },
    cansado:   { emoji: "😴", frase: "Bateria fraca... preciso descansar." },
    comendo:   { emoji: "😋", frase: "Hmm, processando energia..." },
    brincando: { emoji: "🎮", frase: "Yeahhh! Gameplay!" },
    morto:     { emoji: "💀", frase: "Bateria zerada. Game Over." }
};

let stats = { fome: 100, humor: 100, energia: 100 };
let morto = false;
let intervalo = null;

function atualizar() {
    if (morto) return;

    stats.fome    = Math.max(0, stats.fome    - 3);
    stats.humor   = Math.max(0, stats.humor   - 2);
    stats.energia = Math.max(0, stats.energia - 1);

    atualizarUI();

    if (stats.fome === 0 && stats.humor === 0 && stats.energia === 0) {
        morrer();
    }
}

function atualizarUI() {
    document.getElementById("barra-fome-fill").style.width    = stats.fome    + "%";
    document.getElementById("barra-humor-fill").style.width   = stats.humor   + "%";
    document.getElementById("barra-energia-fill").style.width = stats.energia + "%";

    document.getElementById("val-fome").textContent    = stats.fome    + "%";
    document.getElementById("val-humor").textContent   = stats.humor   + "%";
    document.getElementById("val-energia").textContent = stats.energia + "%";

    if (!morto) {
        const pet    = document.getElementById("pet");
        const status = document.getElementById("status-texto");

        if (stats.fome <= 20) {
            pet.textContent    = estados.com_fome.emoji;
            status.textContent = estados.com_fome.frase;
        } else if (stats.humor <= 20) {
            pet.textContent    = estados.triste.emoji;
            status.textContent = estados.triste.frase;
        } else if (stats.energia <= 20) {
            pet.textContent    = estados.cansado.emoji;
            status.textContent = estados.cansado.frase;
        } else {
            pet.textContent    = estados.feliz.emoji;
            status.textContent = estados.feliz.frase;
        }
    }
}

function mostrarMsg(texto) {
    document.getElementById("msg").textContent = texto;
    setTimeout(() => document.getElementById("msg").textContent = "", 2000);
}

function animarPet(emoji, duracao) {
    const pet = document.getElementById("pet");
    pet.textContent = emoji;
    setTimeout(() => {
        if (!morto) pet.textContent = estados.feliz.emoji;
    }, duracao);
}

function alimentar() {
    if (morto) return;
    stats.fome = Math.min(100, stats.fome + 40);
    animarPet(estados.comendo.emoji, 1500);
    mostrarMsg("Yummy! +40 fome!");
    atualizarUI();
}

function brincar() {
    if (morto) return;
    if (stats.energia < 15) {
        mostrarMsg("Sem energia para brincar! Me deixe dormir.");
        return;
    }
    stats.humor   = Math.min(100, stats.humor   + 35);
    stats.energia = Math.max(0,   stats.energia - 15);
    animarPet(estados.brincando.emoji, 1500);
    mostrarMsg("Wheee! +35 humor!");
    atualizarUI();
}

function dormir() {
    if (morto) return;
    stats.energia = Math.min(100, stats.energia + 50);
    animarPet(estados.cansado.emoji, 2000);
    mostrarMsg("Zzz... +50 energia!");
    atualizarUI();
}

function morrer() {
    morto = true;
    clearInterval(intervalo);
    document.getElementById("pet").textContent          = estados.morto.emoji;
    document.getElementById("status-texto").textContent = estados.morto.frase;
    document.getElementById("msg").textContent          = "Pressione F5 para reiniciar.";
    document.querySelectorAll("button").forEach(b => b.disabled = true);
}

intervalo = setInterval(atualizar, 2000);
atualizarUI();
