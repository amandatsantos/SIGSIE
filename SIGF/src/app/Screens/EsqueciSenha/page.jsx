"use client";

import React from "react";
import FormContainer from "../../Componentes/FormContainer";
import InputField from "../../Componentes/Input";
import ButtonConfirmar from "../../Componentes/BotaoConfirmar";
import "../Login/style.css";

function EsqueciSenhaPage() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    console.log({ email });
  }

  return (
    <div className="page-container">
      <img className="Logo" src="https://i.postimg.cc/m2bhRV32/Design-sem-nome-2-1.png" />
      <FormContainer title="Esqueci minha senha" subtitle="Informe seu e-mail cadastrado para iniciar o processo de recuperação de conta.">
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
            <ButtonConfirmar>Enviar</ButtonConfirmar>
          </div>
        </form>
      </FormContainer>
    </div>
  );
}

export default EsqueciSenhaPage;