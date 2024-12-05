import {
    Box,
    Flex,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useDisclosure,
    useBreakpointValue
  } from '@chakra-ui/react';  
import { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import CheckInDiagnostico from "./CheckInDiagnostico";

const CheckInApp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_checkin = localStorage.getItem("check_in_diagnostico")
      ? JSON.parse(localStorage.getItem("check_in_diagnostico"))
      : [];
    setData(db_checkin);
  }, [setData]);

  const handleRemove = (index) => {
    const newArray = data.filter((_, i) => i !== index);
    setData(newArray);
    localStorage.setItem("check_in_diagnostico", JSON.stringify(newArray));
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
        <Button colorScheme="gray" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CHECK-IN
        </Button>
        <Box overflowY="auto" height="auto">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Cliente
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Veículo
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Sintomas
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Diagnóstico
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Observações
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(
                ({ cliente, veiculo, sintomas, diagnostico, observacoes }, index) => (
                  <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                    <Td maxW={isMobile ? 5 : 100}>{cliente}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{veiculo}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{sintomas}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{diagnostico}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{observacoes}</Td>
                    <Td p={0}>
                      <EditIcon
                        fontSize={20}
                        onClick={() => [
                          setDataEdit({
                            cliente,
                            veiculo,
                            sintomas,
                            diagnostico,
                            observacoes,
                            index,
                          }),
                          onOpen(),
                        ]}
                      />
                    </Td>
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => handleRemove(index)}
                      />
                    </Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <CheckInDiagnostico
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

export default CheckInApp;
