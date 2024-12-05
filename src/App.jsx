import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/home/home.jsx";
import CheckInApp from "./components/Checkin/CheckInApp.jsx";
import CadClienteApp from "./components/cliente/CadClienteApp.jsx";
import CadVeiculoApp from "./components/veiculo/CadVeiculoApp.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/navbar/NavBar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import AgendamentoServico from "./components/agendamento/AgendamentoServico.jsx";

function App() {
    return (
        <ChakraProvider>  {/* Envolvendo toda a aplicação */}
            <BrowserRouter>
            <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/checkindiagnostico" element={<CheckInApp />}/>
                    <Route path="/cadastrarcliente" element={<CadClienteApp />} />
                    <Route path="/cadastrarveiculo" element={<CadVeiculoApp />} />
                    <Route path="/agendamento" element={<AgendamentoServico />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
