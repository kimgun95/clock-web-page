const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greetings = document.querySelector(".js-greetings");

//   아래 currentUser와 showing은 단지 string일 뿐 어떤 객체나 함수를 의미하는게 아님
const USER_LOCALSOTRAGE = "currentUser",
  SHOWING_CLASSNAME = "showing";

//   사용자가 input에 입력한 정보를 계속 localStorage에 저장함으로써 페이지가 기억해주는 함수
function saveName(text) {
  localStorage.setItem(USER_LOCALSOTRAGE, text);
}

// event.preventDefault는 event가 계속 진행됨을 막는 기능이다.
// input.value은 input 오브젝트의 value값을 가져오는 의미.
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreetings(currentValue);
  saveName(currentValue);
}

// input오브젝트에 무언가를 입력하여 엔터하게 되면 'submit'이란게 '동작'을 하게 되는데 이를 통해 handleSubmit이란 함수를 동작시킴
function askForName() {
  form.classList.add(SHOWING_CLASSNAME);
  form.addEventListener("submit", handleSubmit);
}

// 우선 이 greetings가 나오기 전에 기존에 있던 form은 없애고 greetings만을 출력시키는 기능.
// innerText를 통해 text추가
function paintGreetings(text) {
  form.classList.remove(SHOWING_CLASSNAME);
  greetings.classList.add(SHOWING_CLASSNAME);
  greetings.innerText = `Hello! ${text}`;
}

// constant한 '변수' currentUser는 localStorage에 저장된 요소를 getItem을 통해 USER_LOCALSOTRAGE 즉 , currentUsername의 value 값을 읽어오려는 것.
// 하지만 처음 localStorage에는 어떠한 요소도 없기에 아무 값도 못가지고 올 것. 자동적으로 if문의 null값을 만족하며 askForName을 동작시킬 것.
function loadName() {
  const currentUser = localStorage.getItem(USER_LOCALSOTRAGE);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreetings(currentUser);
  }
}

function init() {
  loadName();
}

init();
