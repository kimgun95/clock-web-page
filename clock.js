const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  // Date라는 object에서 현재 시간을 가져오는 듯
  const date = new Date();
  //   현재 시간을 저장한 date를 통해 시,분,초를 받아옴
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  //   clockTitle 즉, h1에 innerText를 통해 text를 넣어줌
  // 이때 super sexy한 backtic(``)을 이용
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  // h1의 text내용을 getTime으로 초기화 해주는 역할
  getTime();
  //   setInterval은 일정한 시간 간격으로 작업을 수행하는 함수이다
  //   여기서 1000은 milisecond단위이기때문에 1초를 의미
  setInterval(getTime, 1000);
}

init();
