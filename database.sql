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
    url_imagem VARCHAR(100)
);

INSERT INTO tugartes (nome, atividade, distrito, concelho, morada, telefone, email, website, descricao, url_imagem) VALUES
("Olaria Periquito", "Olaria", "Portalegre", "Nisa", "R. Prof. João Porto 21, 6050-344 NISA Espírito Santo, Nisa, Portalegre", 927531183, NULL, NULL, "bla bla bla Olaria Periquito", NULL),
('Porches Pottery', 'Olaria','Algarve','Lagoa','EN125, 8400-451 Porches, Lagoa', NULL, NULL, 'https://www.porchespottery.com', 'Dizer alguma coisa sobre a Porches Pottery', NULL),
('Nuno Nunes: Instrumentos Musicais de Corda', 'Instrumentos Musicais', 'Açores', 'Angra do Heroísmo','Rua Ciprião de Figueiredo, n.º 15 – Nossa Senhora da Conceição, 9700-053 Angra do Heroísmo', 962985354, 'n_nunes57@outlook.pt', 'https://ciudadespatrimonio.eu/pt-pt/artesanos/instrumentos-musicales-de-cuerda-viola-da-terra/', 'bla bla bla', NULL);