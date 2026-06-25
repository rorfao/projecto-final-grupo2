/*
1 - Criar função de carregar artesãos 
2 - Criar função de criar artesãos
3 - Criar elementos baseados no. HTML
4 - Função para renderizar a lista no HTML
5 - Função de filtro de lista
*/

(function (win,doc) {
    'use strict';

    doc.querySelector('')
})(window,document);


/* início do script do catálogo */ 

const artisans = [
            {name: "Olaria Periquito", activity: "Olaria", location: "Nisa, Portalegre", district: "Portalegre"},
            {name: "Porches Pottery", activity: "Olaria", location: "Lagoa, Algarve", district: "Faro"},
            {name: "Nuno Nunes: Instrumentos Musicais", activity: "Instrumentos Musicais", location: "Angra do Heroísmo, Açores", district: "Açores"},
            {name: "Capuchinhas", activity: "Têxteis", location: "Castro Daire, Viseu", district: "Viseu"},
            {name: "Rendas de Bilros de Vila do Conde", activity: "Têxteis", location: "Vila do Conde, Porto", district: "Porto"},
            {name: "Orlando Trindade - Violeiro", activity: "Instrumentos Musicais", location: "Caldas da Rainha, Leiria", district: "Leiria"},
            {name: "Aida Atelier", activity: "Têxteis", location: "Vila Nova de Gaia, Porto", district: "Porto"},
            {name: "Navalhas Gilberto Ferreira", activity: "Cutelaria", location: "Bragança", district: "Bragança"},
            {name: "O Cesto", activity: "Cestaria", location: "Évora", district: "Évora"}
        ];

function renderArtisans(district = null) 
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

document.getElementById("formulario").addEventListener("submit", function(e) 
{
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

    if (!dados.nome ||!dados.atividade || !dados.distrito || !dados.concelho || !dados.descricao)
    {
        document.getElementById("mensagem").innerHTML =
            '<p class="erro">Preencha todos os campos obrigatórios.</p>';
        return;
    }

    if (dados.telefone && !/^[0-9]+$/.test(dados.telefone)) 
    {
        document.getElementById("mensagem").innerHTML =
            '<p class="erro">O telefone deve conter apenas números.</p>';
        return;
    }

    console.log(dados);

    document.getElementById("mensagem").innerHTML =
        '<p class="sucesso">Registo validado com sucesso!</p>';
});
/* fim script registo */ 