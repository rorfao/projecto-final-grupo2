/*
1 - Criar função de carregar artesãos 
2 - Criar função de criar artesãos
3 - Criar elementos baseados no. HTML
4 - Função para renderizar a lista no HTML
5 - Função de filtro de lista
*/

const API_URL = "/api/roteiro"
const formulario = document.getElementById("formulario")
const mensagem = document.getElementById("mensagem")
const lista = document.getElementById("ateliers-list")
const titulo = document.getElementById("sidebar-title")
const descricao = document.getElementById("descricao")
const contador = document.getElementById("contadorDescricao")
const distritoSelect = document.getElementById("distrito")
const concelhoSelect = document.getElementById("concelho")
const submitBtn = document.querySelector('button[type="submit"]')
const districtList = document.querySelectorAll("#district-list li")

let roteiroAtual = []
let editandoId = null
let distritoFiltro = ""

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
}

function preencherDistritos() 
{
    console.log("preencher distritos")
    if (!distritoSelect) return
    distritoSelect.innerHTML = '<option value="">Selecione um distrito</option>'
    Object.keys(distritosConcelhos).sort().forEach(d => distritoSelect.add(new Option(d, d)))
}

function atualizarConcelhos()
{
    console.log("actualizar distritos")
    if (!concelhoSelect || !distritoSelect) return
    const distrito = distritoSelect.value
    concelhoSelect.innerHTML = '<option value="">Selecione um concelho</option>'
    if (!distrito || !distritosConcelhos[distrito]) return
    distritosConcelhos[distrito].sort().forEach(c => concelhoSelect.add(new Option(c, c)))
}

function mostrarMensagem(texto, tipo = "sucesso")
{
    if (!mensagem) return
    mensagem.innerHTML = `<p class="${tipo}">${texto}</p>`
}

function limparFormulario()
{
    if (!formulario) return
    formulario.reset()
    editandoId = null
    if (submitBtn) submitBtn.textContent = "Submeter Registo"
    if (contador) contador.textContent = "0 / 500 caracteres"
}

function gerarCartao(atelier)
{
    return `
        <article class="cartao">
            <div class="cartao-info">
                <h3>${atelier.nome}</h3>
                <p class="cartao-meta">
                    <span class="badge">${atelier.atividade}</span>
                    <span>${atelier.distrito}</span>
                    <span>${atelier.concelho}</span>
                </p>
                <p>${atelier.descricao}</p>
                <div>
                    <button class="editar" data-id="${atelier.id}">Editar</button>
                    <button class="apagar" data-id="${atelier.id}">Apagar</button>
                </div>
            </div>
        </article>
    `
}

async function carregarArtisans()
{
    if (!lista) return
    const resposta = await fetch(API_URL)
    roteiroAtual = await resposta.json()
    const filtrados = distritoFiltro ? roteiroAtual.filter(a => a.distrito === distritoFiltro) : roteiroAtual
    lista.innerHTML = filtrados.length ? filtrados.map(gerarCartao).join("") : "<p>Sem registos.</p>"
    if (titulo) titulo.textContent = distritoFiltro ? `Ateliers e Artesãos - ${distritoFiltro}` : "Ateliers e Artesãos"
}


function preencherFormulario(atelier)
{
    document.getElementById("nome").value = atelier.nome ?? ""
    document.getElementById("atividade").value = atelier.atividade ?? ""
    document.getElementById("distrito").value = atelier.distrito ?? ""
    atualizarConcelhos()
    document.getElementById("concelho").value = atelier.concelho ?? ""
    document.getElementById("morada").value = atelier.morada ?? ""
    document.getElementById("telefone").value = atelier.telefone ?? ""
    document.getElementById("email").value = atelier.email ?? ""
    document.getElementById("website").value = atelier.website ?? ""
    document.getElementById("descricao").value = atelier.descricao ?? ""
    document.getElementById("url_imagem").value = atelier.url_imagem ?? ""
    if (submitBtn) submitBtn.textContent = "Atualizar"
    editandoId = atelier.id
}

async function submeterFormulario(e)
{
    e.preventDefault()

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
    }

    const metodo = editandoId ? "PUT" : "POST"
    const url = editandoId ? `${API_URL}/${editandoId}` : API_URL

    const resposta = await fetch(url, 
    {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })

    const resultado = await resposta.json()
    console.log(resultado)

    if (!resposta.ok)
    {
        mostrarMensagem(resultado.erro || (resultado.erros ? resultado.erros.join(" ") : "Erro ao guardar."), "erro")
        return
    }

    mostrarMensagem(resultado.mensagem || "Guardado com sucesso.", "sucesso")
    limparFormulario()
    await carregarArtisans()
}

async function apagarArtisan(id)
{
    if (!confirm("Tem a certeza que quer apagar este registo?")) return

    const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
    const resultado = await resposta.json()

    if (!resposta.ok) {
        mostrarMensagem(resultado.erro || "Erro ao apagar.", "erro")
        return
    }

    mostrarMensagem(resultado.mensagem || "Registo apagado.", "sucesso")
    await carregarArtisans()
}

document.addEventListener("DOMContentLoaded", () => 
{
    const navBtn = document.querySelector(".menu-btn")
    const navList = document.querySelector(".nav-list")

    if (navBtn && navList) {
        navBtn.addEventListener("click", () => {
            navList.classList.toggle("active")
        })
    }

    if (formulario)
    {
        preencherDistritos()
        carregarArtisans()
        formulario.addEventListener("submit", submeterFormulario)
        distritoSelect?.addEventListener("change", atualizarConcelhos)
        descricao?.addEventListener("input", () => contador.textContent = `${descricao.value.length} / 500 caracteres`)
    }

    if (lista) 
    {
        lista.addEventListener("click", async (e) => {
            const btnEditar = e.target.closest(".editar")
            const btnApagar = e.target.closest(".apagar")

            if (btnEditar)
            {
                const atelier = roteiroAtual.find(a => String(a.id) === btnEditar.dataset.id)
                if (atelier) preencherFormulario(atelier)
            }

            if (btnApagar)
            {
                await apagarArtisan(btnApagar.dataset.id)
            }
        })
    }

    districtList.forEach(item => 
    {
        item.addEventListener("click", () => 
        {
            distritoFiltro = item.dataset.district
            carregarArtisans()
        })
    })
})


/*
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

    if (dados.telefone && !/^[0-9]+$/.test(dados.telefone)) 

renderArtisans()
*/