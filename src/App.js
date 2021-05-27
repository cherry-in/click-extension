import { useEffect, useState } from "react";
import * as S from "./styles";

function App() {
  const [count, setCount] = useState(0);
  const [on, setOn] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (on) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const handleUse = () => {
    setOn(!on);
    setCount(0);
  };

  const handleClick = () => {
    setCount(count + 1);
    // Todo: 커서 1.25배
    clearTimeout(timer);

    let timerId = setTimeout(() => alert("5분뒤 커서 크기 원래대로"), 300000);
    setTimer(timerId);

    if (count >= 99) {
      handleUse();
      // Todo: 마우스 완전 크게 꽉채우기
    }
  };
  //window 객체에 scroll & mouse 이벤트를 추가하고 cursor함수 실행되도록 함
  window.addEventListener("scroll", cursor);
  window.addEventListener("mousemove", cursor);
  //커스텀 커서의 left값과 top값을 커서의 XY좌표값과 일치시킴
  function cursor(e) {
    let mouseCursor = document.querySelector(".cursor");
    mouseCursor.style.left = e.pageX + "px";
    mouseCursor.style.top = e.pageY + "px";
  }

  return (
    <S.App>
      <S.Cursor />
      <p>마우스 클릭 제어 확장 프로그램입니다.</p>
      <button onClick={() => handleUse()}> 프로그램 사용 </button>
      <p>{count}번 클릭했습니다.</p>
    </S.App>
  );
}

export default App;
