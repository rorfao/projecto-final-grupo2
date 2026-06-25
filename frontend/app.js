/*
1 - Criar função de carregar artesãos 
2 - Criar função de criar artesãos
3 - Criar elementos baseados no. HTML
4 - Função para renderizar a lista no HTML
5 - Função de filtro de lista
*/


/* início do script do catálogo */ 
async function renderArtisans() 
{
    const resposta = await fetch("/api/roteiro")
    const catalogo = await resposta.json()
    console.log(catalogo)

    const container = document.getElementById('ateliers-list');
    const title = document.getElementById('sidebar-title');
    container.innerHTML = '';

    for (const atelier of catalogo)
    {
        container.innerHTML += 
            `<article class="cartao">
                <div class="cartao-info">
                <h3>${atelier.nome}</h3>
                <p class="cartao-meta">
                    <span class="badge">${atelier.atividade}</span>
                    <span>${atelier.distrito}</span>
                    <span class="cartao-ano"></span>
                </p>
                </div>
            </article>`;
    }

}

function filterArtisans()
{
    const container = document.getElementById('ateliers-list');
    const title = document.getElementById('sidebar-title');
    container.innerHTML = '';

    const filtered = district ? artisans.filter(a => a.district === district) : artisans;

    title.textContent = district ? `Ateliers e Artesãos - ${district}` : 'Ateliers e Artesãos';

    if (filtered.length === 0) 
    {
        container.innerHTML = `<p style="opacity:0.6; padding:20px;">Nenhum artesão encontrado neste distrito/ilha.</p>`;
        return;
    }

    filtered.forEach(art => 
    {
        const div = document.createElement('div');
        div.className = 'atelier-item';
        div.innerHTML = `
            <h4>${art.name}</h4>
            <p class="activity">${art.activity}</p>
            <p class="location">${art.location}</p>
        `;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => 
{
    const districtItems = document.querySelectorAll('#district-list li');
    const islandItems = document.querySelectorAll('.island');

    function clearActive() 
    {
        districtItems.forEach(li => li.classList.remove('active'));
        islandItems.forEach(island => island.classList.remove('active'));
    }

    // Distritos
    districtItems.forEach(item => 
    {
        item.addEventListener('click', () => 
        {
            clearActive();
            item.classList.add('active');
            renderArtisans(item.dataset.district);
        });
    });

    // Ilhas (Madeira e Açores)
    islandItems.forEach(island => 
    {
        island.addEventListener('click', () => 
        {
            clearActive();
            island.classList.add('active');
            renderArtisans(island.dataset.district);
        });
    });

    // Inicial
    renderArtisans();
});

/* fim do script do catálogo */

/* início script registo */
const distritosConcelhos = 
{
    "Aveiro": ["Águeda", "Albergaria-a-Velha", "Anadia", "Arouca", "Aveiro", "Castelo de Paiva", "Espinho", "Estarreja", "Ílhavo", "Mealhada", "Murtosa", "Oliveira de Azeméis", "Oliveira do Bairro", "Ovar", "Santa Maria da Feira", "São João da Madeira", "Sever do Vouga", "Vagos", "Vale de Cambra"],
    "Beja": ["Aljustrel", "Almodôvar", "Alvito", "Barrancos", "Beja", "Castro Verde", "Cuba", "Ferreira do Alentejo", "Mértola", "Moura", "Odemira", "Ourique", "Serpa", "Vidigueira"],
    "Braga": ["Amares", "Barcelos", "Braga", "Cabeceiras de Basto", "Celorico de Basto", "Esposende", "Fafe", "Guimarães", "Póvoa de Lanhoso", "Terras de Bouro", "Vieira do Minho", "Vila Nova de Famalicão", "Vila Verde", "Vizela"],
    "Bragança": ["Alfândega da Fé", "Bragança", "Carrazeda de Ansiães", "Freixo de Espada à Cinta", "Macedo de Cavaleiros", "Miranda do Douro", "Mirandela", "Mogadouro", "Torre de Moncorvo", "Vila Flor", "Vimioso", "Vinhais"],
    "Castelo Branco": ["Belmonte", "Castelo Branco", "Covilhã", "Fundão", "Idanha-a-Nova", "Oleiros", "Penamacor", "Proença-a-Nova", "Sertã", "Vila de Rei", "Vila Velha de Ródão"],
    "Coimbra": ["Arganil", "Cantanhede", "Coimbra", "Condeixa-a-Nova", "Figueira da Foz", "Góis", "Lousã", "Mira", "Miranda do Corvo", "Montemor-o-Velho", "Oliveira do Hospital", "Pampilhosa da Serra", "Penacova", "Penela", "Soure", "Tábua", "Vila Nova de Poiares"],
    "Évora": ["Alandroal", "Arraiolos", "Borba", "Estremoz", "Évora", "Montemor-o-Novo", "Mora", "Mourão", "Portel", "Redondo", "Reguengos de Monsaraz", "Vendas Novas", "Viana do Alentejo", "Vila Viçosa"],
    "Faro": ["Albufeira", "Alcoutim", "Aljezur", "Castro Marim", "Faro", "Lagoa", "Lagos", "Loulé", "Monchique", "Olhão", "Portimão", "São Brás de Alportel", "Silves", "Tavira", "Vila do Bispo", "Vila Real de Santo António"],
    "Guarda": ["Aguiar da Beira", "Almeida", "Celorico da Beira", "Figueira de Castelo Rodrigo", "Fornos de Algodres", "Gouveia", "Guarda", "Manteigas", "Mêda", "Pinhel", "Sabugal", "Seia", "Trancoso", "Vila Nova de Foz Côa"],
    "Leiria": ["Alcobaça", "Alvaiázere", "Ansião", "Batalha", "Bombarral", "Caldas da Rainha", "Castanheira de Pêra", "Figueiró dos Vinhos", "Leiria", "Marinha Grande", "Nazaré", "Óbidos", "Pedrógão Grande", "Peniche", "Pombal", "Porto de Mós"],
    "Lisboa": ["Alenquer", "Amadora", "Arruda dos Vinhos", "Azambuja", "Cadaval", "Cascais", "Lisboa", "Loures", "Lourinhã", "Mafra", "Odivelas", "Oeiras", "Sintra", "Sobral de Monte Agraço", "Torres Vedras", "Vila Franca de Xira"],
    "Portalegre": ["Alter do Chão", "Arronches", "Avis", "Campo Maior", "Castelo de Vide", "Crato", "Elvas", "Fronteira", "Gavião", "Marvão", "Monforte", "Nisa", "Ponte de Sor", "Portalegre", "Sousel"],
    "Porto": ["Amarante", "Baião", "Felgueiras", "Gondomar", "Lousada", "Maia", "Marco de Canaveses", "Matosinhos", "Paços de Ferreira", "Paredes", "Penafiel", "Porto", "Póvoa de Varzim", "Santo Tirso", "Trofa", "Valongo", "Vila do Conde", "Vila Nova de Gaia"],
    "Santarém": ["Abrantes", "Alcanena", "Almeirim", "Alpiarça", "Benavente", "Cartaxo", "Chamusca", "Constância", "Coruche", "Entroncamento", "Ferreira do Zêzere", "Golegã", "Mação", "Ourém", "Rio Maior", "Salvaterra de Magos", "Santarém", "Sardoal", "Tomar", "Torres Novas", "Vila Nova da Barquinha"],
    "Setúbal": ["Alcácer do Sal", "Alcochete", "Almada", "Barreiro", "Grândola", "Moita", "Montijo", "Palmela", "Santiago do Cacém", "Seixal", "Sesimbra", "Setúbal", "Sines"],
    "Viana do Castelo": ["Arcos de Valdevez", "Caminha", "Melgaço", "Monção", "Paredes de Coura", "Ponte da Barca", "Ponte de Lima", "Valença", "Viana do Castelo", "Vila Nova de Cerveira"],
    "Vila Real": ["Alijó", "Boticas", "Chaves", "Mesão Frio", "Mondim de Basto", "Montalegre", "Murça", "Peso da Régua", "Ribeira de Pena", "Sabrosa", "Santa Marta de Penaguião", "Valpaços", "Vila Pouca de Aguiar", "Vila Real"],
    "Viseu": ["Armamar", "Carregal do Sal", "Castro Daire", "Cinfães", "Lamego", "Mangualde", "Moimenta da Beira", "Mortágua", "Nelas", "Oliveira de Frades", "Penalva do Castelo", "Penedono", "Resende", "Santa Comba Dão", "São João da Pesqueira", "São Pedro do Sul", "Sátão", "Sernancelhe", "Tabuaço", "Tarouca", "Tondela", "Vila Nova de Paiva", "Viseu", "Vouzela"],
    "Açores": ["Angra do Heroísmo", "Calheta", "Corvo", "Horta", "Lagoa", "Lajes das Flores", "Lajes do Pico", "Madalena", "Nordeste", "Ponta Delgada", "Povoação", "Praia da Vitória", "Ribeira Grande", "Santa Cruz da Graciosa", "Santa Cruz das Flores", "São Roque do Pico", "Velas", "Vila do Porto", "Vila Franca do Campo"],
    "Madeira": ["Calheta", "Câmara de Lobos", "Funchal", "Machico", "Ponta do Sol", "Porto Moniz", "Porto Santo", "Ribeira Brava", "Santa Cruz", "Santana", "São Vicente"]
};

const distritoSelect = document.getElementById("distrito");
const concelhoSelect = document.getElementById("concelho");
const descricao = document.getElementById("descricao");
const contador = document.getElementById("contadorDescricao");
console.log("ESTÁ A CORRER")
console.log(distritoSelect, concelhoSelect)
// Carregar distritos dinamicamente
Object.keys(distritosConcelhos).sort().forEach(distrito => 
    {
        distritoSelect.add(new Option(distrito, distrito));
    });

// Atualizar concelhos ao mudar o distrito
distritoSelect.addEventListener("change", function ()
{
    const distrito = this.value;
    concelhoSelect.innerHTML = '<option value="">Selecione um concelho</option>';

    if (!distrito) return;

    distritosConcelhos[distrito].sort().forEach(concelho => 
        {
            concelhoSelect.add(new Option(concelho, concelho));
        });
});

// Contador de caracteres da descrição
descricao.addEventListener("input", () => {
    contador.textContent = `${descricao.value.length} / 500 caracteres`;
});

// Evento de submissão do formulário
document.getElementById("formulario").addEventListener("submit", async function(e) {
    e.preventDefault();

    const dados = 
    {
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
    if (!dados.nome || !dados.atividade || !dados.distrito || !dados.concelho || !dados.descricao) {
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
        '<p class="sucesso">Registo de atelier validado com sucesso!</p>';

    await fetch("/api/roteiro",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    
    // .reset() limpa todos os campos do formulario.
    formulario.reset();
    
    // Voltar a buscar a lista para mostrar a nova musica.
    // carregar();
});

/*
    if (dados.telefone && !/^[0-9]+$/.test(dados.telefone)) 
*/

/* fim script registo */ 

renderArtisans()