import { useState, useEffect } from "react";
import React from 'react';
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
    Select // Importa Select do Chakra UI
} from "@chakra-ui/react";
import ReactInputMask from "react-input-mask";

const CadVeiculo = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [clientes, setClientes] = useState([]); // Estado para armazenar clientes
    const [cliente, setCliente] = useState(dataEdit.cliente || "");
    const [placa, setPlaca] = useState(dataEdit.placa || "");
    const [marca, setMarca] = useState(dataEdit.marca || "");
    const [modelo, setModelo] = useState(dataEdit.modelo || "");
    const [ano, setAno] = useState(dataEdit.ano || "");
    const [cor, setCor] = useState(dataEdit.cor || "");
    const [historico, setHistorico] = useState(dataEdit.historico || "");

    // Carrega clientes do localStorage
    useEffect(() => {
        const storedClients = JSON.parse(localStorage.getItem("cad_cliente")) || [];
        setClientes(storedClients);
    }, []);

    const handleSave = () => {
        if (!placa || !cliente) return; // Valida se a placa e o cliente estão selecionados

        if (placaAlreadyExists()) {
            return alert("Placa já cadastrada!");
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { cliente, placa, marca, modelo, ano, cor, historico };
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { cliente, placa, marca, modelo, ano, cor, historico }]
            : [...(data ? data : [])];

        localStorage.setItem("cad_veiculo", JSON.stringify(newDataArray));
        setData(newDataArray);
        onClose();
    };

    const placaAlreadyExists = () => {
        if (dataEdit.placa !== placa && data?.length) {
            return data.find((item) => item.placa === placa);
        }
        return false;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cadastrar Veículo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl display="flex" flexDir="column" gap={6}>
                        <Box>
                            <FormLabel>Cliente</FormLabel>
                            <Select
                                value={cliente}
                                onChange={(e) => setCliente(e.target.value)}
                                placeholder="Selecione um cliente"
                            >
                                {clientes.map((cli, index) => (
                                    <option key={index} value={cli.nome}>
                                        {cli.nome}
                                    </option>
                                ))}
                            </Select>
                        </Box>
                        <Box>
                            <FormLabel>Placa</FormLabel>
                            <ReactInputMask
                                mask="aaa-9a99"
                                value={placa}
                                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                            >
                            {(inputProps) => (
                            <Input
                                {...inputProps}
                                type="text"
                                placeholder="Digite a placa"
                            />
                            )}                           
                            </ReactInputMask>
                        </Box>
                        <Box>
                            <FormLabel>Marca</FormLabel>
                            <Input
                                type="text"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                                placeholder="Digite a marca do veículo"
                            />
                        </Box>
                        <Box>
                            <FormLabel>Modelo</FormLabel>
                            <Input
                                type="text"
                                value={modelo}
                                onChange={(e) => setModelo(e.target.value)}
                                placeholder="Digite o modelo do veículo"
                            />
                        </Box>
                        <Box>
                            <FormLabel>Ano</FormLabel>
                            <ReactInputMask
                                mask="0000"
                                value={ano}
                                onChange={(e) => setAno(e.target.value)}
                            >
                                {(inputProps) => (
                                    <Input {...inputProps} 
                                    type="text" 
                                    placeholder="Digite o ano do veículo" 
                                    />
                                )}
                            </ReactInputMask>
                        </Box>
                        <Box>
                        <FormLabel>Cor</FormLabel>
                        <Select 
                            placeholder="Selecione a cor" 
                            value={cor} 
                            onChange={(e) => setCor(e.target.value)}
                        >
                            <option value="Branco">Branco</option>
                            <option value="Preto">Preto</option>
                            <option value="Prata">Prata</option>
                            <option value="Cinza">Cinza</option>
                            <option value="Azul">Azul</option>
                            <option value="Vermelho">Vermelho</option>
                            <option value="Verde">Verde</option>
                            <option value="Amarelo">Amarelo</option>
                            <option value="Bege">Bege</option>
                            <option value="Marrom">Marrom</option>
                            <option value="Roxo">Roxo</option>
                            <option value="Laranja">Laranja</option>
                            <option value="Dourado">Dourado</option>
                        </Select>
                        </Box>
                        <Box>
                            <FormLabel>Histórico</FormLabel>
                            <Input
                                type="text"
                                value={historico}
                                onChange={(e) => setHistorico(e.target.value)}
                                placeholder="Histórico de serviços"
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
    );
};

export default CadVeiculo;
