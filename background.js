const body = document.querySelector("body");

const IMG_NUMBER = 3;

// 이미지 src에 랜덤숫자를 이용한 이미지를 연결, classList.add 를 통해 클래스 이름을 넣어줌(css에서 꾸밀 수 있게)
function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/landscape${imgNumber + 1}.jpg`;
  image.classList.add("backgroundImage");
  body.appendChild(image);
}

// 랜덤 넘버를 만드는 함수
// math에서 floor는 소수점 나머지를 버려주는 함수, random은 말그대로 랜덤한 숫자를 생성, * IMG_NUMBER 는 IMG_NUMBER까지의 숫자 범위를 의미
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
