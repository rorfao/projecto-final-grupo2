CREATE DATABASE IF NOT EXISTS roteiro_tugartes;
USE roteiro_tugartes;

DROP TABLE IF EXISTS tugartes;

CREATE TABLE tugartes
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    atividade VARCHAR(50) NOT NULL,
    distrito VARCHAR(50) NOT NULL,
    concelho VARCHAR(100) NOT NULL,
    morada VARCHAR(200),
    telefone INT,
    email VARCHAR(100), 
    website VARCHAR(150),
    descricao VARCHAR(500) NOT NULL,
    url_imagem VARCHAR(200)
);

INSERT INTO tugartes (nome, atividade, distrito, concelho, morada, telefone, email, website, descricao, url_imagem) VALUES
("Olaria Periquito", "Olaria", "Portalegre", "Nisa", "R. Prof. João Porto 21, 6050-344 NISA Espírito Santo, Nisa, Portalegre", 927531183, NULL, NULL, "Olaria Periquito", NULL),
("Porches Pottery", "Olaria","Algarve","Lagoa","EN125, 8400-451 Porches, Lagoa", NULL, NULL, "https://www.porchespottery.com", "A Olaria de Porches é uma pequena olaria da região do Algarve, em Portugal. Somos uma equipa de artistas que pintam cerâmica à mão há mais de cinquenta anos.", NULL),
("Nuno Nunes: Instrumentos Musicais de Corda", "Instrumentos Musicais", "Açores", "Angra do Heroísmo","Rua Ciprião de Figueiredo, n.º 15, Nossa Senhora da Conceição, 9700-053 Angra do Heroísmo", 962985354, "n_nunes57@outlook.pt", "https://ciudadespatrimonio.eu/pt-pt/artesanos/instrumentos-musicales-de-cuerda-viola-da-terra/", "Instrumentos Musicais de Corda – Viola da Terra. A viola de 12 cordas é mais típico instrumento musical do arquipélago dos Açores", NULL),
("Capuchinhas", "Têxteis", "Viseu", "Castro Daire", "Rua da Motinha - Campo Benfeito, 3600-371 Gosende", 254689160, "capuchinhas@gmail.com", "https://www.capuchinhas.pt/", "Produção de vestuário em burel, linho e lã, tecidos em teares manuais, usando métodos tradicionais com um design contemporâneo. Cooperativa situada na pequena aldeia na serra e a origem do seu nome está na Capucha, a capa usada pelos pastores para se abrigarem do frio e da chuva durante o Inverno. Este trabalho contribui para transmitir às gerações futuras, as vivências e tradições, e para a preservação deste património", "https://ec91836c05.clvaw-cdnwnd.com/496620579cb0d5864d89211c74092102/200003266-942c8942ca/CAPUCHINHAS%2025%20-%20INVERNO-3.jpeg?ph=ec91836c05"),
("Rendas de Bilros de Vila do Conde", "Têxteis", "Porto", "Vila do Conde","Praça Luís de Camões, 31 2º Dto, 4480-719 Vila do Conde", 252627700, "geral@adapvc.pt", "https://www.rendasdebilros.com/index.php", "A Renda de Bilros de Vila do Conde é uma arte secular que remonta ao século XVI. O processo artesanal baseia-se no uso de pequenos cilindros de madeira (bilros) para entrelace de fios fixados numa almofada. A tradição, que se inspira na espuma do mar, é candidata a Património da UNESCO", "http://rendasdebilros.com/eventos/imagem_201110241623531319466233_22.jpg"),
("ORLANDO TRINDADE - VIOLEIRO / LUTHIER", "Instrumentos Musicais", "Leiria", "Caldas da Rainha", "Rua Mário Duarte dos Santos n35, Mosteiros 2500-744 Vidais", 966035359, "orlandotrindade@hotmail.com", "https://orlandotrindade.pt/", "Restauro e reparação de Instrumentos Musicais de Corda Dedilheira. Orlando Trindade dedica-se à construção e restauro de cordofones, com especial interesse pelos instrumentos antigos. estuda e colabora com músicos, investigadores, musicólogos e outros construtores, sempre com o objectivo de realizar o melhor trabalho possível no domínio da reconstituição histórica deste património", "https://orlandotrindade.pt/wp-content/uploads/2018/12/logo-orlando-trindade-violeiro.jpg"),
("Aida Atelier - Manufactura de Tapetes Arraiolos", "Têxteis", "Porto", "Vila Nova de Gaia", "Rua Oliva Telles 1359, Granja, Arcozelo, 4410-513", 914347034, "aidaatelier@hotmail.com", "https://www.facebook.com/profile.php?id=100057153771980&sk=photos", "Têxteis de Arraiolos", "https://www.rotacriativa.pt/wp-content/uploads/2020/11/atelier-da-aida-dorinda-gaia-5-e1607529970777.jpg"),
("Navalhas Gilberto Ferreira - Artesão Transmontano", "Cutelaria", "Bragança", "Bragança", "R. do Santo, 19 | 5300-411 Aveleda", 938947491 , "navalhasgferreira@gmail.com", "https://navalhasgferreira.pt/", "Navalhas artesanais, desde a de enxertia até à de esfolar, com lâmina em aço damasco ou carbono com empunhadura em madeira nacionais, exóticas ou haste de veado - O Transmontano anda sempre com uma navalha no bolso, até porque quem não tem navalha não come presunto.", "https://navalhasgferreira.pt/wp-content/uploads/2021/02/logogn.png"),
("O Cesto - Artesanato do Alentejo", "Cestaria", "Évora", "Évora", "Rua 5 de Outubro 77, 7000-854 Évora", 962553522, "o.cesto@hotmail.com", "https://ocesto.com.pt/", "Divulgação do Artesanato Nacional que sobrevive aos tempos e nos acompanha de geração em geração, peças criadas com materiais tradicionais, focados em produtos amigos do ambiente, sustentáveis, naturais e 100% portugueses.", "https://ocesto.com.pt/wp-content/uploads/2016/05/oCesto.webp");