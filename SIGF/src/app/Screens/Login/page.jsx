"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ← Importar o router do Next
import FormContainer from "../../Componentes/FormContainer";
import InputField from "../../Componentes/Input";
import ButtonConfirmar from "../../Componentes/BotaoConfirmar";
import ButtonCadastrar from "../../Componentes/BotaoCadastrar";
import ToggleSwitch from "../../Componentes/ToggleSwitch";
import "./style.css";

function LoginPage() {
  const router = useRouter(); // ← Inicializa o router

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Enviando login...");
  
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
  
    console.log("Dados coletados:", { email, password });
  
    try {
      const response = await fetch("http://localhost:5665/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Resposta recebida:", response);
  
      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }
  
      const data = await response.json();
      console.log("Login bem-sucedido:", data);
  
      // Redireciona para o dashboard após o login
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro:", error.message);
    }
  }

  return (
    <div className="page-container">
      <img
        className="Logo"
        src="https://i.postimg.cc/m2bhRV32/Design-sem-nome-2-1.png"
        alt="Logo"
      />

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
              type="password"
              error=""
            />
          </div>
          <div className="ts">
            <ToggleSwitch />
            <label className="ts-label">Mantenha Conectado</label>
            <label
              className="ts-label"
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => router.push("/Screens/EsqueciSenha")}
            >
              Esqueceu a senha?
            </label>
          </div>
          <div className="form-group">
            <ButtonConfirmar>Entrar</ButtonConfirmar>
          </div>
          <hr className="divider" />
          <div className="form-group">
            <ButtonCadastrar
              onClick={() => router.push("/Screens/CadastroUsuario")}
            >
              Cadastrar
            </ButtonCadastrar>
          </div>
        </form>
      </FormContainer>
    </div>
  );
}

export default LoginPage;
