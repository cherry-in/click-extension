function reddenPage() {
  chrome.storage.local.get(null, function (result) {
    console.log(result);
    const { count, size, timer } = result;
    const body = document.body;
    body.style.cursor = "none";
    body.style.zIndex = "1";
    body.style.width = "100%";
    body.style.height = "100%";
    body.style.top = "0";
    body.style.left = "0";
    body.style.position = "relative";

    let img = document.createElement("img");
    body.appendChild(img);
    img.id = "cursor";
    img.src =
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fzflu1%2Fbtq6eGWe58G%2FCZPJZ2tMwwZ6xlIZ2lqwCK%2Fimg.png";
    img.style.height = "1rem";
    img.style.position = "absolute";
    img.style.zIndex = "1000";
    img.style.transform = "translate(-50%, -50%)";
    img.style.pointerEvents = "none";
    img.style.transition = "all 0.3s ease";
    img.style.transitionProperty = "background, transform";
    img.style.transformOrigin = "100% 100%";

    let div = document.createElement("div");
    let p = document.createElement("p");
    let pText = document.createTextNode(`클릭횟수 : ${count} / 100`);
    p.id = "count";

    let button = document.createElement("button");
    let btnText = document.createTextNode("ON / OFF");
    const handleReset = () => {
      chrome.storage.local.set({ count: 0 });
      chrome.storage.local.set({ size: 1 });
      document.querySelector("#cursor").style.height = "1rem";
      document.querySelector("#count").innerText = "클릭횟수 : 0 / 100";
    };
    button.onclick = handleReset;

    p.appendChild(pText);
    button.appendChild(btnText);
    body.appendChild(div);
    div.appendChild(p);
    div.appendChild(button);

    div.style.cursor = "default";
    div.style.position = "absolute";
    div.style.zIndex = "1001";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.height = "80px";
    div.style.width = "120px";
    div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    div.style.padding = "10px";
    div.style.color = "white";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.justifyContent = "center";

    function cursor(e) {
      let mouseCursor = document.querySelector("#cursor");
      mouseCursor.style.left = e.pageX + "px";
      mouseCursor.style.top = e.pageY + "px";
    }

    window.addEventListener("scroll", cursor);
    window.addEventListener("mousemove", cursor);
  });

  const handleClick = () => {
    chrome.storage.local.get(null, function (result) {
      const { count, size, timer } = result;
      chrome.storage.local.set({ count: count + 1 }, function () {
        console.log("count is set to " + (count + 1));
      });
      document.querySelector("#count").innerText = `클릭횟수 : ${
        count < 100 ? count : 100
      } / 100`;
      if (count >= 100) {
        alert("사용 가능한 클릭 횟수를 초과했습니다.");
        chrome.storage.local.set({ size: 100 });
        document.querySelector("#cursor").style.height = "100rem";
      } else {
        chrome.storage.local.set({ size: size + 0.5 }, function () {
          console.log("size is set to " + (size + 0.5));
          document.querySelector("#cursor").style.height = `${size + 0.5}rem`;
        });
      }
      clearTimeout(timer);
      let timerId = setTimeout(() => {
        chrome.storage.local.set({ count: 0 });
        chrome.storage.local.set({ size: 1 });
        document.querySelector("#cursor").style.height = "1rem";
        document.querySelector("#count").innerText = "클릭횟수 : 0 / 100";
      }, 300000);
      chrome.storage.local.set({ timer: timerId });
    });
  };

  document.addEventListener("click", handleClick);
}

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.set({ count: 0, size: 1, timer: 0 });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reddenPage,
  });
});
