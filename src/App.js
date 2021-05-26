import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

// function assa(e){
//   chrome.tabs.executeScript(null,
//       {code:"document.querySelector('#invoice_no_0').value='123123';"});
// }
// document.addEventListener('DOMContentLoaded',function(){
//  var btn01 = document.querySelector('#btn');
//  btn01.addEventListener("click",assa);

// });

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
    clearTimeout(timer);
    let timerId = setTimeout(
      () => alert("아무런 일도 일어나지 않습니다."),
      300000
    );
    setTimer(timerId);

    if (count >= 99) {
      handleUse();
      // 마우스 겁나 크게 코드
    }
  };

  return (
    <div className="App">
      {console.log(on)}
      마우스 클릭 제어 확장 프로그램입니다.
      <button onClick={() => handleUse()}> 사용 </button>
      {count}번 클릭했습니다.
    </div>
  );
}

export default App;
