ALTER TABLE peca (
    PecaID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100),
    Codigo VARCHAR(20),
    Categoria VARCHAR(50),
    QuantidadeDisponivel INT,
    PrecoCusto DECIMAL(10, 2),
    NivelMinimo INT,
    DataVencimento DATE
);

CREATE TABLE checkin_diagnostico (
    CheckinID INT AUTO_INCREMENT PRIMARY KEY,
    ClienteID INT NOT NULL,
    NomeCliente VARCHAR(100),
    VeiculoDescricao VARCHAR(255) NOT NULL,
    Sintomas TEXT NOT NULL,
    Diagnostico TEXT,
    Observacoes TEXT,
    DataCheckin DATETIME DEFAULT CURRENT_TIMESTAMP,
    DataConclusao DATETIME                   
);
