import "./BotaoCadastrar.css";

export default function ButtonCadastrar({ children }) {
  return (
    <button type="submit" className="button-cadastrar">
      {children}
    </button>
  );
}