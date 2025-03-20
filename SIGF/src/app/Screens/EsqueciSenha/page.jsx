"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FormContainer from "../../Componentes/FormContainer";
import InputField from "../../Componentes/Input";
import ButtonConfirmar from "../../Componentes/BotaoConfirmar";
import "../Login/style.css";

function EsqueciSenhaPage() {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');

    // Envia o e-mail para o backend
    fetch('/api/esqueciSenha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('E-mail enviado com sucesso!');
          // Redireciona para a página de nova senha
          router.push("/Screens/NovaSenha");
        } else {
          console.error('Erro ao enviar e-mail');
        }
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
      });
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
            <ButtonConfirmar onClick={() => router.push("/Screens/NovaSenha")}>Enviar</ButtonConfirmar>
            {/*<ButtonConfirmar type="submit">Enviar</ButtonConfirmar>*/}
          </div>
        </form>
      </FormContainer>
    </div>
  );
}

export default EsqueciSenhaPage;