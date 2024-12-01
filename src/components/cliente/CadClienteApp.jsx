import {EditIcon, DeleteIcon} from "@chakra-ui/icons";
import React from 'react';
import {
    Box,
    Flex,
    Button,
    useDisclosure,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState} from "react";
import CadCliente from "./CadCliente";

const CadClienteApp = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState({});

    const isMobile = useBreakpointValue({
        base: true,
        lg:false,
    });

    useEffect(() => {
        const db_custumer = localStorage.getItem("cad_cliente")
            ? JSON.parse(localStorage.getItem("cad_cliente"))
            : [];
        setData(db_custumer);
    }, [setData]);

    const handleRemove = (email) => {
        const newArray = data.filter((item) => item.email !== email);
        setData(newArray);
        localStorage.setItem("cad_cliente", JSON.stringify(newArray));
    };


    return (
        <Flex
            h="100vh"
            align="center"
            justify="center"
            fontSize="20px"
            fontFamily="poppins"
            >
            <Box maxW={1350} w="100%" h="100vh" py={10} px={2}>
                <Button colorScheme="gray" onClick={() => [setDataEdit({}), onOpen()]}>
                    NOVO CADASTRO
                </Button>
                <Box overflowY="auto" height="auto">
                    <Table mt="6">
                        <Thead>
                            <Tr>
                                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                                    Nome
                                </Th>
                                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                                    E-mail
                                </Th>
                                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                                    Telefone
                                </Th>
                                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                                    CPF
                                </Th>
                                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                                    Endereço
                                </Th>
                                <Th p={0}></Th>
                                <Th p={0}></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map(({nome, email, telefone, cpf, endereco}, index) => (
                                <Tr key={index} cursor="pointer" _hover={{bg:"gray.100"}}>
                                    <Td maxW={isMobile ? 5 : 100}>{nome}</Td>
                                    <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                                    <Td maxW={isMobile ? 5 : 100}>{telefone}</Td>
                                    <Td maxW={isMobile ? 5 : 100}>{cpf}</Td>
                                    <Td maxW={isMobile ? 5 : 100}>{endereco}</Td>
                                    <Td p={0}>
                                        <EditIcon
                                            fontSize={20}
                                            onClick={() => [
                                                setDataEdit({nome, email, telefone, cpf, endereco, index}),
                                                onOpen(),
                                            ]}
                                        />
                                    </Td>
                                    <Td p={0}>
                                        <DeleteIcon
                                            fontSize={20}
                                            onClick={() => handleRemove(email)}
                                        />
                                    </Td>
                                </Tr>  
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
            {isOpen && (
                <CadCliente
                    isOpen={isOpen}
                    onClose={onClose}
                    data={data}
                    setData={setData}
                    dataEdit={dataEdit}
                    setDataEdit={setDataEdit}
                />
            )}
        </Flex>
    );
};

export default CadClienteApp;