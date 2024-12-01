import { useState } from "react";
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
} from "@chakra-ui/react";
import ReactInputMask from "react-input-mask";

const CadCliente = ({data, setData, dataEdit, isOpen, onClose}) => {
    const [nome, setNome] = useState(dataEdit.nome || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [telefone, setTelefone] = useState(dataEdit.telefone || "");
    const [cpf, setCPF] = useState(dataEdit.cpf || "");
    const [endereco, setEndereco] = useState(dataEdit.endereco || "");

    const handleSave = () => {
        if (!nome || !email) return;

        if(emailAlreadyExists()) {
            return alert("E-mail já cadastrado!");
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = {nome, email, telefone, cpf, endereco};
        }

        const newDataArray = !Object.keys(dataEdit).length
            ?[...(data ? data : []), {nome, email, telefone, cpf, endereco}]
            : [...(data ? data :[])];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
        setData(newDataArray);
        onClose();
    };

    const emailAlreadyExists = () => {
        if (dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email);
        }
        return false;
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastrar Cliente</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={6}>
                            <Box>
                                <FormLabel>Nome Completo</FormLabel>
                                <Input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Digite o nome completo"
                                />
                            </Box>
                            <Box>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Digite o email"
                                />
                            </Box>
                            <Box>
                                <FormLabel>Telefone</FormLabel>
                                <ReactInputMask
                                    mask="(99) 99999-9999"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                >
                                {(inputProps) => (
                                    <Input
                                        {...inputProps}
                                        type="tel"
                                        placeholder="Digite o telefone"
                                    />
                                )}
                                </ReactInputMask>
                            </Box>
                            <Box>
                                <FormLabel>CPF</FormLabel>
                                <ReactInputMask
                                    mask="999.999.999-99"
                                    value={cpf}
                                    onChange={(e) => setCPF(e.target.value)}
                                >
                                {(inputProps) => (
                                <Input
                                    {...inputProps}
                                    type="text"
                                    placeholder="Digite o CPF"
                                />
                                )}
                                </ReactInputMask>
                            </Box>
                            <Box>
                                <FormLabel>Endereço</FormLabel>
                                <Input
                                    type="text"
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                    placeholder="Digite o endereço completo"
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
}

export default CadCliente;