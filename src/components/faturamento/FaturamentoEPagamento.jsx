import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, useToast, Stack, Text } from "@chakra-ui/react";

const FaturamentoEPagamento = () => {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [statusPagamento, setStatusPagamento] = useState("");
  const [pagamentoEfetuado, setPagamentoEfetuado] = useState(false);
  const toast = useToast();

  const handlePagamento = () => {
    if (!descricao || !valor || !metodoPagamento) {
      toast({
        title: "Erro no pagamento",
        description: "Por favor, preencha todos os campos.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setStatusPagamento(`Pagamento de R$ ${valor} via ${metodoPagamento} foi realizado com sucesso!`);
    setPagamentoEfetuado(true);

    toast({
      title: "Pagamento realizado",
      description: `O pagamento de R$ ${valor} foi registrado com sucesso.`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box p={5} borderRadius="md" boxShadow="lg" bg="white" maxWidth="500px" mx="auto">
      <Stack spacing={4}>
        {/* Descrição do Faturamento */}
        <FormControl>
          <FormLabel>Descrição do Faturamento</FormLabel>
          <Input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição do serviço ou produto"
          />
        </FormControl>

        {/* Valor do Faturamento */}
        <FormControl>
          <FormLabel>Valor</FormLabel>
          <Input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Valor a ser pago"
          />
        </FormControl>

        {/* Método de Pagamento */}
        <FormControl>
          <FormLabel>Método de Pagamento</FormLabel>
          <Select
            value={metodoPagamento}
            onChange={(e) => setMetodoPagamento(e.target.value)}
            placeholder="Escolha o método de pagamento"
          >
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Boleto Bancário">Boleto Bancário</option>
            <option value="Transferência Bancária">Transferência Bancária</option>
            <option value="Dinheiro">Dinheiro</option>
          </Select>
        </FormControl>

        {/* Botão para Processar o Pagamento */}
        <Button colorScheme="teal" onClick={handlePagamento}>
          Efetuar Pagamento
        </Button>

        {/* Status do Pagamento */}
        {pagamentoEfetuado && (
          <Text mt={4} color="green.500" fontSize="lg">
            {statusPagamento}
          </Text>
        )}

        {/* Resumo do Faturamento */}
        <Box mt={6} p={4} borderRadius="md" boxShadow="md" bg="gray.50">
          <Text fontSize="lg" fontWeight="bold">Resumo do Faturamento:</Text>
          <Text><strong>Descrição:</strong> {descricao}</Text>
          <Text><strong>Valor:</strong> R$ {valor}</Text>
          <Text><strong>Método de Pagamento:</strong> {metodoPagamento}</Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default FaturamentoEPagamento;
