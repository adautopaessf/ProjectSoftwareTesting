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