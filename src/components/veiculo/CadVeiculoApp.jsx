import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
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
import CadVeiculo from "./CadVeiculo";

const CadVeiculoApp = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState({});

    const isMobile = useBreakpointValue({
        base: true,
        lg: false,
    });

    useEffect(() => {
        const storedVehicles = localStorage.getItem("cad_veiculo");
        if (storedVehicles) {
            setData(JSON.parse(storedVehicles));
        }
    }, []);

    const handleRemove = (placa) => {
        const newArray = data.filter((item) => item.placa !== placa);
        setData(newArray);
        localStorage.setItem("cad_veiculo", JSON.stringify(newArray));
    };

    const handleEdit = (vehicle, index) => {
        setDataEdit({ ...vehicle, index });
        onOpen();
    };

    const handleNewVehicle = () => {
        setDataEdit({});
        onOpen();
    };

    return (
        <Flex
            h="100vh"
            align="center"
            justify="center"
            fontSize="20px"
            fontFamily="Poppins"
        >
            <Box maxW={1350} w="100%" h="100vh" py={10} px={2}>
                <Button colorScheme="gray" onClick={handleNewVehicle}>
                    NOVO CADASTRO
                </Button>
                <Box overflowY="auto" maxHeight="80vh" mt={6}>
                    <Table>
                        <Thead>
                            <Tr>
                                {["Cliente", "Placa", "Marca", "Modelo", "Ano", "Cor", "Histórico", ""].map((header, idx) => (
                                    <Th key={idx} maxW={isMobile ? 5 : 100} fontSize="20px">
                                        {header}
                                    </Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((vehicle, index) => (
                                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                                    {Object.values(vehicle).map((value, idx) => (
                                        <Td key={idx} maxW={isMobile ? 5 : 100}>
                                            {value}
                                        </Td>
                                    ))}
                                    <Td p={0}>
                                        <EditIcon
                                            fontSize={20}
                                            cursor="pointer"
                                            onClick={() => handleEdit(vehicle, index)}
                                        />
                                    </Td>
                                    <Td p={0}>
                                        <DeleteIcon
                                            fontSize={20}
                                            cursor="pointer"
                                            onClick={() => handleRemove(vehicle.placa)}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
            {isOpen && (
                <CadVeiculo
                    isOpen={isOpen}
                    onClose={onClose}
                    data={data}
                    setData={setData}
                    dataEdit={dataEdit}
                />
            )}
        </Flex>
    );
};

export default CadVeiculoApp;
