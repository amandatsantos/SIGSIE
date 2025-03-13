"use client";

import React from "react";
import FormContainer from "../../Componentes/FormContainer";
import InputField from "../../Componentes/Input";
import ButtonConfirmar from "../../Componentes/BotaoConfirmar";
import "../Login/style.css";

function NovaSenhaPage() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const senha = formData.get('senha');
    const confirmarSenha = formData.get('confirmarSenha');
    console.log({ senha, confirmarSenha });
  }

  return (
    <div className="page-container">
      <img className="Logo" src="https://i.postimg.cc/m2bhRV32/Design-sem-nome-2-1.png" />
      <FormContainer title="Nova senha" subtitle="Digite sua nova senha">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <InputField
              label="Senha"
              placeholder="Digite sua senha"
              name="senha"
              error=""
              type="password"
            />
          </div>
          <div className="form-group">
            <InputField
              label="Confirmar senha"
              placeholder="Digite sua senha"
              name="confirmarSenha"
              error=""
              type="password"
            />
          </div>
          <div className="form-group">
            <ButtonConfirmar>Salvar</ButtonConfirmar>
          </div>
        </form>
      </FormContainer>
    </div>
  );
}

export default NovaSenhaPage;
