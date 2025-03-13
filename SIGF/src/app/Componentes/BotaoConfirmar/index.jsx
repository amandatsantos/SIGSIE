import "./BotaoConfirmar.css";

export default function ButtonConfirmar({ children, onClick }) {
  return (
    <button type="button" className="button-confirmar" onClick={onClick}>
      {children}
    </button>
  );
}