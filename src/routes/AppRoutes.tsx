import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../page/Dashboard/Dashboard";
import Login from "../page/Login";
import SignUp from "../page/SignUp";
import { GlobalStyled } from "../theme/GlobalStyled";

function AppRoutes(){
    return (
        <>
            <GlobalStyled/>
            <BrowserRouter>            
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp />}/>
                    <Route path="/tasks" element={<Dashboard />}/>
                    <Route path="*" element={<h1>Not Found</h1>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRoutes;