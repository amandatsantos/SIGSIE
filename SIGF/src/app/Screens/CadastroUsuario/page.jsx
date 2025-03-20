"use client";

import React from "react";
import { useRouter } from "next/navigation"; // <-- ADICIONE ESTA LINHA!
import FormContainer from "../../Componentes/FormContainer";
import InputField from "../../Componentes/Input";
import ButtonCadastrar from "../../Componentes/BotaoCadastrar";
import "../Login/style.css";

function CadastroUsuarioPage() {
  const router = useRouter(); // <-- INICIALIZA O ROUTER

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const nome = formData.get('nome');
    const cpfCnpj = formData.get('cpfCnpj');
    const nascimento = formData.get('nascimento');
    const telefone = formData.get('telefone');

    // Envia os dados para o backend
    fetch('localhost:5665/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, cpfCnpj, nascimento, telefone }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Usuário cadastrado com sucesso!');
          // Redireciona para o Login após o cadastro
          router.push("/Screens/Login");
        } else {
          console.error('Erro ao cadastrar usuário');
        }
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
      });
  }

  return (
    <div className="page-container">
      <img className="Logo" src="https://i.postimg.cc/m2bhRV32/Design-sem-nome-2-1.png" />
      <FormContainer title="Cadastrar usuário" subtitle="Informe seus dados pessoais">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <InputField
              label="Nome completo"
              placeholder="Digite seu nome completo"
              name="nome"
              error=""
            />
          </div>
          <div className="form-group">
            <InputField
              label="CPF/CNPJ"
              placeholder="Digite seu CPF ou CNPJ"
              name="cpfCnpj"
              error=""
            />
          </div>
          <div className="form-group">
            <InputField
              label="Data de nascimento"
              placeholder="Digite sua data de nascimento"
              name="nascimento"
              type="date"
              error=""
            />
          </div>
          <div className="form-group">
            <InputField
              label="Telefone"
              placeholder="Digite seu telefone"
              name="telefone"
              error=""
            />
          </div>
          <div className="form-group">
            <ButtonCadastrar onClick={() => router.push("/Screens/Login")}>Cadastrar</ButtonCadastrar>
            {/**<ButtonCadastrar type="submit">Cadastrar</ButtonCadastrar>*/}
          </div>
        </form>
      </FormContainer>
    </div>
  );
}

export default CadastroUsuarioPage;
