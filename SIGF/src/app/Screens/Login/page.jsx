"use client"

import React from "react";
import FormContainer from "../../Componentes/FormContainer";
import InputField from "../../Componentes/Input";
import ButtonConfirmar from "../../Componentes/BotaoConfirmar";
import ButtonCadastrar from "../../Componentes/BotaoCadastrar";
import ToggleSwitch from "../../Componentes/ToggleSwitch";
import "./style.css";

function LoginPage() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log({ email, password });
  }

  return (
    <div className="page-container">
    <FormContainer title="Login">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <InputField
            label="E-mail"
            placeholder="Digite seu email"
            name="email"
            error=""
          />
        </div>
        <div className="form-group">
          <InputField
            label="Senha"
            placeholder="Digite sua senha"
            name="password"
            error=""
          />
        </div>
        <div className="form-group">
          <ToggleSwitch />
          <label>Mantenha Conectado</label>
        </div>
        <div className="form-group">
          <ButtonConfirmar>Entrar</ButtonConfirmar>
        </div>
        <div className="form-group">
          <ButtonCadastrar>Cadastrar</ButtonCadastrar>
        </div>
      </form>
    </FormContainer>
    </div>
  );
}

export default LoginPage;