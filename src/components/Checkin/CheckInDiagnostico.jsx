import { useState } from "react";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea,
} from "@chakra-ui/react";

const CheckInDiagnostico = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [cliente, setCliente] = useState(dataEdit.cliente || "");
  const [veiculo, setVeiculo] = useState(dataEdit.veiculo || "");
  const [sintomas, setSintomas] = useState(dataEdit.sintomas || "");
  const [diagnostico, setDiagnostico] = useState(dataEdit.diagnostico || "");
  const [observacoes, setObservacoes] = useState(dataEdit.observacoes || "");

  const handleSave = () => {
    if (!cliente || !veiculo || !sintomas) {
      return alert("Preencha os campos obrigatórios!");
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { cliente, veiculo, sintomas, diagnostico, observacoes };
    }

    const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { cliente, veiculo, sintomas, diagnostico, observacoes }]
      : [...(data ? data : [])];

    localStorage.setItem("check_in_diagnostico", JSON.stringify(newDataArray));
    setData(newDataArray);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registrar Check-in e Diagnóstico</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={6}>
              <Box>
                <FormLabel>Cliente</FormLabel>
                <Input
                  type="text"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="Nome do cliente"
                />
              </Box>
              <Box>
                <FormLabel>Veículo</FormLabel>
                <Input
                  type="text"
                  value={veiculo}
                  onChange={(e) => setVeiculo(e.target.value)}
                  placeholder="Descrição do veículo (modelo, placa, etc.)"
                />
              </Box>
              <Box>
                <FormLabel>Sintomas</FormLabel>
                <Textarea
                  value={sintomas}
                  onChange={(e) => setSintomas(e.target.value)}
                  placeholder="Descreva os problemas ou sintomas relatados"
                />
              </Box>
              <Box>
                <FormLabel>Diagnóstico (Opcional)</FormLabel>
                <Textarea
                  value={diagnostico}
                  onChange={(e) => setDiagnostico(e.target.value)}
                  placeholder="Informe o diagnóstico, se aplicável"
                />
              </Box>
              <Box>
                <FormLabel>Observações (Opcional)</FormLabel>
                <Textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Adicione observações adicionais"
                />
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              Salvar
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckInDiagnostico;