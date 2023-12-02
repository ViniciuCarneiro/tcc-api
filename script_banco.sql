create database tcc;
use tcc;

CREATE TABLE cliente (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    cpf CHAR(14) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    whatsapp CHAR(14) NOT NULL,
    datanascimento DATE NOT NULL,
    endereco VARCHAR(200),
    usuario VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE servico (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tempo TIME NOT NULL,
    valor DOUBLE NOT NULL DEFAULT 0.00,
    ativo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE profissional (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    cpf CHAR(14) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    datanascimento DATE NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    usuario VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE servicoprofissional (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    servico_id INT NOT NULL,
    profissional_id INT NOT NULL,
    FOREIGN KEY (servico_id)
        REFERENCES servico (id),
    FOREIGN KEY (profissional_id)
        REFERENCES profissional (id)
);

CREATE TABLE agendamento (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    servico_id INT NOT NULL,
    profissional_id INT NOT NULL,
    dataagendada DATE NOT NULL,
    horaagendada TIME NOT NULL,
	horaatermino TIME NOT NULL,
    valordesconto DOUBLE NOT NULL DEFAULT 0.00,
    valorfinal DOUBLE NOT NULL DEFAULT 0.00,
    cancelado BOOLEAN NOT NULL DEFAULT FALSE,
    concluido BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (cliente_id)
        REFERENCES cliente (id),
    FOREIGN KEY (servico_id)
        REFERENCES servico (id),
    FOREIGN KEY (profissional_id)
        REFERENCES profissional (id)
);

CREATE TABLE horariofuncionamento (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dia INT NOT NULL,
    nome VARCHAR(30) NOT NULL,
    horarioabertura TIME NOT NULL,
    horariofechamento TIME NOT NULL
);
