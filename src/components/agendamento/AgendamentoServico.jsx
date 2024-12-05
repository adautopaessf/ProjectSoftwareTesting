import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, useToast, Stack } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Estilo do DatePicker

const AgendamentoServico = () => {
  const [servico, setServico] = useState("");
  const [data, setData] = useState(null);
  const [hora, setHora] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [novoClienteNome, setNovoClienteNome] = useState("");
  const [novoClienteEmail, setNovoClienteEmail] = useState("");
  const toast = useToast();

  // Carregar clientes cadastrados do localStorage
  useEffect(() => {
    const clientesCadastrados = JSON.parse(localStorage.getItem("clientes")) || [];
    setClientes(clientesCadastrados);
  }, []);

  const handleAgendar = () => {
    if (!servico || !data || !hora || (!clienteSelecionado && (!novoClienteNome || !novoClienteEmail))) {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, preencha todos os campos.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    let cliente = clienteSelecionado;
    if (!clienteSelecionado) {
      // Se não for um cliente selecionado, salvar um novo cliente
      cliente = { nome: novoClienteNome, email: novoClienteEmail };
      const novosClientes = [...clientes, cliente];
      localStorage.setItem("clientes", JSON.stringify(novosClientes));
      setClientes(novosClientes);
    }

    const agendamento = { servico, data, hora, cliente };
    console.log("Serviço agendado:", agendamento);

    toast({
      title: "Agendamento realizado",
      description: `O serviço ${servico} foi agendado para ${data.toLocaleDateString()} às ${hora}.`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box p={5} borderRadius="md" boxShadow="lg" bg="white" maxWidth="500px" mx="auto">
      <Stack spacing={4}>
        {/* Seleção do serviço */}
        <FormControl>
          <FormLabel>Selecione o Serviço</FormLabel>
          <Select value={servico} onChange={(e) => setServico(e.target.value)} placeholder="Escolha o serviço">
            <option value="Check-in">Check-in</option>
            <option value="Diagnóstico">Diagnóstico</option>
            <option value="Manutenção">Manutenção</option>
          </Select>
        </FormControl>

        {/* Seleção do Cliente */}
        <FormControl>
          <FormLabel>Selecione o Cliente</FormLabel>
          <Select value={clienteSelecionado} onChange={(e) => setClienteSelecionado(e.target.value)} placeholder="Escolha um cliente">
            {clientes.map((cliente, index) => (
              <option key={index} value={cliente.email}>
                {cliente.nome} - {cliente.email}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Nome e Email do Novo Cliente (caso não tenha sido selecionado) */}
        {!clienteSelecionado && (
          <>
            <FormControl>
              <FormLabel>Nome do Cliente</FormLabel>
              <Input 
                value={novoClienteNome} 
                onChange={(e) => setNovoClienteNome(e.target.value)} 
                placeholder="Digite o nome do cliente"
              />
            </FormControl>

            <FormControl>
              <FormLabel>E-mail do Cliente</FormLabel>
              <Input 
                type="email"
                value={novoClienteEmail} 
                onChange={(e) => setNovoClienteEmail(e.target.value)} 
                placeholder="Digite o e-mail do cliente"
              />
            </FormControl>
          </>
        )}

        {/* Seleção da data */}
        <FormControl>
          <FormLabel>Selecione a Data</FormLabel>
          <DatePicker
            selected={data}
            onChange={(date) => setData(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Escolha a data"
            className="chakra-input css-1pjjq2j" // Chakra UI integration className
          />
        </FormControl>

        {/* Seleção da hora */}
        <FormControl>
          <FormLabel>Selecione a Hora</FormLabel>
          <Select value={hora} onChange={(e) => setHora(e.target.value)} placeholder="Escolha a hora">
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
          </Select>
        </FormControl>

        {/* Botão para agendar */}
        <Button colorScheme="teal" onClick={handleAgendar}>Agendar Serviço</Button>
      </Stack>
    </Box>
  );
};

export default AgendamentoServico;
