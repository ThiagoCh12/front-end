export default function Keyboard({ onKeyPress }) {
  const row1 = "qwertyuiop".split("");
  const row2 = "asdfghjkl".split("");
  const row3 = ["enter", ..."zxcvbnm".split(""), "back"];

  return (
    <div className="keyboard">
      <div className="row">
        {row1.map((key) => (
          <button key={key} onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>

      <div className="row">
        {row2.map((key) => (
          <button key={key} onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>

      <div className="row">
        {row3.map((key, index) => (
          <button key={index} onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}