import "./BotaoConfirmar.css";

export default function ButtonConfirmar({ children }) {
  return (
    <button type="submit" className="button-confirmar">
      {children}
    </button>
  );
}