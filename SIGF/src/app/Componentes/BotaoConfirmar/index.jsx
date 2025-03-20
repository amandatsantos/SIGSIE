import "./BotaoConfirmar.css";

export default function ButtonConfirmar({ children, onClick }) {
  return (
    <button type="submit" className="button-confirmar" onClick={onClick}>
      {children}
    </button>
  );
}