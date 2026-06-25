const distritosConcelhos = {
    "Aveiro": [
        "Águeda", "Albergaria-a-Velha", "Anadia", "Arouca",
        "Aveiro", "Castelo de Paiva", "Espinho", "Estarreja",
        "Ílhavo", "Mealhada", "Murtosa", "Oliveira de Azeméis",
        "Oliveira do Bairro", "Ovar", "Santa Maria da Feira",
        "São João da Madeira", "Sever do Vouga", "Vagos", "Vale de Cambra"
    ],
    "Braga": [
        "Amares", "Barcelos", "Braga", "Cabeceiras de Basto",
        "Celorico de Basto", "Esposende", "Fafe", "Guimarães",
        "Póvoa de Lanhoso", "Terras de Bouro", "Vieira do Minho",
        "Vila Nova de Famalicão", "Vila Verde", "Vizela"
    ],
    "Coimbra": [
        "Arganil", "Cantanhede", "Coimbra", "Condeixa-a-Nova",
        "Figueira da Foz", "Góis", "Lousã", "Mealhada",
        "Mira", "Miranda do Corvo", "Montemor-o-Velho",
        "Oliveira do Hospital", "Pampilhosa da Serra",
        "Penacova", "Penela", "Soure", "Tábua", "Vila Nova de Poiares"
    ],
    "Lisboa": [
        "Alenquer", "Amadora", "Arruda dos Vinhos", "Azambuja",
        "Cadaval", "Cascais", "Lisboa", "Loures",
        "Lourinhã", "Mafra", "Odivelas", "Oeiras",
        "Sintra", "Sobral de Monte Agraço", "Torres Vedras",
        "Vila Franca de Xira"
    ],
    "Porto": [
        "Amarante", "Baião", "Felgueiras", "Gondomar",
        "Lousada", "Maia", "Marco de Canaveses",
        "Matosinhos", "Paços de Ferreira", "Paredes",
        "Penafiel", "Porto", "Póvoa de Varzim",
        "Santo Tirso", "Trofa", "Valongo",
        "Vila do Conde", "Vila Nova de Gaia"
    ]
};

const distritoSelect = document.getElementById("distrito");
const concelhoSelect = document.getElementById("concelho");
const descricao = document.getElementById("descricao");
const contador = document.getElementById("contadorDescricao");

// Carregar distritos dinamicamente
Object.keys(distritosConcelhos)
    .sort()
    .forEach(distrito => {
        distritoSelect.add(new Option(distrito, distrito));
    });

// Atualizar concelhos ao mudar o distrito
distritoSelect.addEventListener("change", function () {
    const distrito = this.value;
    concelhoSelect.innerHTML = '<option value="">Selecione um concelho</option>';

    if (!distrito) return;

    distritosConcelhos[distrito]
        .sort()
        .forEach(concelho => {
            concelhoSelect.add(new Option(concelho, concelho));
        });
});

// Contador de caracteres da descrição
descricao.addEventListener("input", () => {
    contador.textContent = `${descricao.value.length} / 500 caracteres`;
});

// Evento de submissão do formulário
document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value.trim(),
        atividade: document.getElementById("atividade").value.trim(),
        distrito: document.getElementById("distrito").value.trim(),
        concelho: document.getElementById("concelho").value.trim(),
        morada: document.getElementById("morada").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        email: document.getElementById("email").value.trim(),
        website: document.getElementById("website").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        url_imagem: document.getElementById("url_imagem").value.trim()
    };

    // 1. Validação de campos obrigatórios
    if (
        !dados.nome ||
        !dados.atividade ||
        !dados.distrito ||
        !dados.concelho ||
        !dados.descricao
    ) {
        document.getElementById("mensagem").innerHTML =
            '<p class="erro">Preencha todos os campos obrigatórios.</p>';
        return;
    }

    // 2. Validação de telefone português (9x ou 2x com 9 dígitos no total)
 //   if (dados.telefone && !/^(9[1236]|2)\d{8}$/.test(dados.telefone)) {
//        document.getElementById("mensagem").innerHTML =
//            '<p class="erro">Introduza um número de telefone português válido.</p>';
//        return;
//    }

    // Sucesso
    console.log(dados);
    document.getElementById("mensagem").innerHTML =
        '<p class="sucesso">Registo validado com sucesso!</p>';
});



