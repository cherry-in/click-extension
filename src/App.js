import { useEffect, useState } from "react";
import * as S from "./styles";
import mouse from "./mouse.png";

function App() {
  const [on, setOn] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [size, setSize] = useState(1);

  useEffect(() => {
    if (on) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  useEffect(() => {
    if (count >= 100) {
      handleUse();
    }
  }, [count]);

  const handleUse = () => {
    alert("사용 가능한 클릭 횟수를 초과했습니다.");
    setSize(100);
  };

  const handleReset = () => {
    setOn(!on);
    setTimeout(() => {
      setSize(1);
      setCount(0);
    });
  };

  const handleClick = () => {
    setCount(count + 1);
    setSize(size + 0.5);
    clearTimeout(timer);
    let timerId = setTimeout(() => {
      setSize(1);
      setCount(0);
    }, 3000);
    setTimer(timerId);
  };

  window.addEventListener("scroll", cursor);
  window.addEventListener("mousemove", cursor);
  function cursor(e) {
    let mouseCursor = document.querySelector(".cursor");
    console.log(mouseCursor);
    mouseCursor.style.left = e.pageX + "px";
    mouseCursor.style.top = e.pageY + "px";
  }

  return (
    <S.App>
      <S.Cursor className="cursor" size={size} src={mouse} />
      <p>마우스 클릭 제어 확장 프로그램입니다.</p>
      <button onClick={() => handleReset()}> 프로그램 사용 </button>
      <p>{count}번 클릭했습니다.</p>
    </S.App>
  );
}

export default App;
