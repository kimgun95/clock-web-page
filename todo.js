const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

//   toDos란 이름으로 localStorage에 저장하겠다는 의도
const TODOS_LOCALSTORAGE = "toDos";
// 여러 data를 저장하기 위해 배열 변수로 선언
let toDos = [];

// delBtn 이벤트 함수이며 target.parentNode를 통해 li를 찾아내어 removeChild를 통해 지워주는 역할
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  //   filter는 딱 필터 역할을 한다 생각. 필터 기준에 맞는 값을 모두 return해주는 것
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

// localStorage에 저장하는 함수
//JSON.stringify는 자바스크립트가 항상 object형태로 저장하는 것을 문자열로 저장해주는 방법이다
//Java Script Object Notation - 데이터를 전달할때 자바스크립트를 다룰 수 있도록 object <-> string으로 바꿔주는 것
function saveToDos() {
  localStorage.setItem(TODOS_LOCALSTORAGE, JSON.stringify(toDos));
}

// createElement를 통해 li,button,span을 만드는 모습.
// delBtn은 이벤트리스너를 만들어줌
// appendChild의 쓰임은 부모이름.appendChild(자식이름) 으로 작성되며 자식을 부모 아래 위치시켜준다
// 텍스트와 아이디가 있는 Object를 만들고 이를 push를 통해 toDos에 넣어준다
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

// input에 값을 적어 넣어 submit할 시 작동하는 함수로 값은 paintToDo함수로 전달되고 input에 있던 값은 " "공백으로 초기화
function handleSubmit(text) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

// 말그대로 localStorage에 값이 있으면 load해와서 paintToDo를 통해 화면에 표시하라는 함수
function loadToDos() {
  const loadedtoDos = localStorage.getItem(TODOS_LOCALSTORAGE);
  if (loadedtoDos !== null) {
    const parseToDos = JSON.parse(loadedtoDos);
    // forEach는 array를 위한 함수
    // toDo의 사용?? parseToDos라는 '배열'의 요소를 forEach선언 후 괄호 안에서 이름을 만들어(ex:toDo) 사용하는 것이다
    parseToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
