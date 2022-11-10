import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/views/home/Home";
import Layout from "./components/layout/Layout";
import RegistrationForm from "./components/views/regform/RegistrationForm";
import LoginForm from "./components/views/login/LoginForm";
import AddItem from "./components/views/addItem/AddItem";
import ItemMain from "./components/views/itemMain/ItemMain";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/item/:id" element={<ItemMain />} />
      </Route>
    </Routes>
  );
}

export default App;
