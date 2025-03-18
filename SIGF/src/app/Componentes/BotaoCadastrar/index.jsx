import "./BotaoCadastrar.css";

export default function ButtonCadastrar({ children, onClick }) {
  return (
    <button type="button" className="button-cadastrar" onClick={onClick}>
      {children}
    </button>
  );
}