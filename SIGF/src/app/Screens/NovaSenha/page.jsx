"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FormContainer from "../../Componentes/FormContainer";
import InputField from "../../Componentes/Input";
import ButtonConfirmar from "../../Componentes/BotaoConfirmar";
import "../Login/style.css";

function NovaSenhaPage() {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const senha = formData.get('senha');
    const confirmarSenha = formData.get('confirmarSenha');

    // Valida se as senhas coincidem
    if (senha !== confirmarSenha) {
      console.error('As senhas não coincidem!');
      alert('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    // Envia a nova senha para o backend usando PUT
    fetch('/api/novaSenha', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senha }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Senha atualizada com sucesso!');
          // Redireciona para a página de login
          router.push("/Screens/Login");
        } else {
          console.error('Erro ao atualizar a senha');
          alert('Erro ao atualizar a senha. Por favor, tente novamente.');
        }
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
        alert('Erro na requisição. Por favor, tente novamente.');
      });
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
            <ButtonConfirmar onClick={() => router.push("/Screens/Login")}>Salvar</ButtonConfirmar>
            {/*<ButtonConfirmar type="submit">Salvar</ButtonConfirmar>*/}
          </div>
        </form>
      </FormContainer>
    </div>
  );
}

export default NovaSenhaPage;
