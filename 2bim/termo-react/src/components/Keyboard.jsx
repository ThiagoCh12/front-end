export default function Keyboard({ onKeyPress }) {
  const row1 = "qwertyuiop".split("");
  const row2 = "asdfghjkl".split("");
  const row3 = ["enter", ..."zxcvbnm".split(""), "back"];

  // Dispara a tecla e tira o foco do botão, para que apertar
  // Espaço/Enter depois não "clique" de novo a mesma tecla.
  function press(event, key) {
    event.currentTarget.blur();
    onKeyPress(key);
  }

  return (
    <div className="keyboard">
      <div className="row">
        {row1.map((key) => (
          <button type="button" key={key} onClick={(e) => press(e, key)}>
            {key}
          </button>
        ))}
      </div>

      <div className="row">
        {row2.map((key) => (
          <button type="button" key={key} onClick={(e) => press(e, key)}>
            {key}
          </button>
        ))}
      </div>

      <div className="row">
        {row3.map((key, index) => (
          <button type="button" key={index} onClick={(e) => press(e, key)}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
