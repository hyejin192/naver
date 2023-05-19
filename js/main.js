let id = document.querySelector('#id') // id 변수 선언
let pw1 = document.querySelector('#psw1') // pw1 변수 선언
let pwImg1 = document.querySelector('#psw1_img1')
let pwMsg = document.querySelector('#alertTxt')

let pw2 = document.querySelector('#psw2')
let pwImg2 = document.querySelector('#psw2_img1')

let username = document.querySelector('#name')

let yy = document.querySelector('#yy')
let mm = document.querySelector('#mm')
let dd = document.querySelector('#dd')

let gender = document.querySelector("#gender")

let email = document.querySelector("#email")

let mobile = document.querySelector("#phoneNum")


// 똑같은 클래스를 여러개 가져올땐 querySelectorAll
let error = document.querySelectorAll('.error_next_box')


console.log(error)

/* id.addEventListener('focusout',function(){
    // 이벤트 핸들러 (함수이름) 이벤트에서 일어나는 함수
}) 밑 내용과 같음 (함수를 재활용하기 위해서 밖으로 뺌)*/
// 마우스 focus가 벗어나면 실행
id.addEventListener('focusout', checkId)
pw1.addEventListener('focusout', checkPw)
pw2.addEventListener('focusout', comparePw)
username.addEventListener('focusout', checkname)
yy.addEventListener('focusout', isBirthCompleted)
mm.addEventListener('focusout', isBirthCompleted)
dd.addEventListener('focusout', isBirthCompleted)
gender.addEventListener('focusout', function () {
  if (gender.value == "성별") {
    error[5].style.display = "block"
  } else {
    error[5].style.display = "none"
  }
})
email.addEventListener('focusout', checkEmail)
mobile.addEventListener('focusout', checkPhoneNum)

// 아이디
function checkId() {
  var idPattern = /^[a-zA-Z0-9_-]{5,20}$/;
  console.log(idPattern.test(id.value))
  if (id.value === "") {
    error[0].innerHTML = "필수 정보입니다."
    // 자바스크립트에서 css 사용법
    error[0].style.display = "block";
    error[0].style.color = "#f00"
  } else if (!idPattern.test(id.value)) {
    error[0].innerHTML = "5~20자의 영문 소문자,대문자,숫자와 특수기호(_),(-)만 사용 가능합니다."
    // 자바스크립트에서 css 사용법
    error[0].style.display = "block";
    error[0].style.color = "#f00"
  } else {
    error[0].innerHTML = "멋진 아이디네요!"
    error[0].style.color = "#08a600";
    error[0].style.display = "block";
  }

}
// 비밀번호
function checkPw() {
  let pwPattern = /^[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}$/;
  console.log(pwPattern.test(pw1.value))
  if (pw1.value === "") {
    error[1].innerHTML = "필수 정보입니다."
    error[1].style.display = "block";
    pwImg1.src = "img/m_icon_not_use.png"
    pwMsg.style.display = "none"

  } else if (!pwPattern.test(pw1.value)) {
    pwImg1.src = "img/m_icon_not_use.png"
    error[1].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
    error[1].style.display = "block";
    pwMsg.style.display = "block";
    pwMsg.innerHTML = "사용불가"
    pwMsg.style.color = "#f00" //빨강
  } else {
    pwImg1.src = "img/m_icon_safe.png"
    pwMsg.innerHTML = "안전"
    pwMsg.style.color = "#03c75a" //초록
    pwMsg.style.display = "block"
    error[1].style.display = "none"
  }
}
// 비밀번호 재확인
function comparePw() {
  // pw2와 pw1의 값이 같고, 값이 비어있지 않을 때
  if (pw2.value == pw1.value && pw2.value != "") {
    pwImg2.src = "img/m_icon_check_enable.png"
    error[2].style.display = "none"
  } else if (pw2.value !== pw1.value) {
    pwImg2.src = "img/m_icon_check_disable.png"
    error[2].style.display = "block"
    error[2].innerHTML = "비밀번호가 일치하지 않습니다"
  }
  if (pw2.value == "") {
    error[2].innerHTML = "필수 정보입니다"
    error[2].style.display = "block"
  }
}
// 이름
function checkname() {
  var namePattern = /^[가-힣a-zA-Z]*$/;

  if (username.value === "") {
    error[3].innerHTML = "필수 정보입니다."
    error[3].style.display = "block"
    error[3].style.color = "#f00"
  } else if (!namePattern.test(username.value) || username.value.indexOf("  ") > -1) {
    // 맞게 적지 않았거나, "공백"이 있을 때
    error[3].innerHTML = "한글과 영문 대 소문자를 사용하세요.(특수기호, 공백 사용 불가)"
    error[3].style.color = "#f00"
    error[3].style.display = "block"
  } else {
    error[3].style.display = "none"
  }
}
// 생년월일
function isBirthCompleted() {
  let yearPattern = /[0-9]{4}/;
  if (!yearPattern.test(yy.value) || yy.value === "") {
    error[4].innerHTML = "태어난 년도 4자리를 정확하게 입력하세요."
    error[4].style.display = "block"

  } else {
    error[4].style.display = "none"
    // 년도가 맞다면 월을 체크
    isDateCompleted();
  }
}

function isDateCompleted() {
  console.log(mm.value)
  if (mm.value === "월") {
    error[4].innerHTML = "태어난 월을 선택하세요."
    error[4].style.display = "block"
  } else {
    // 월을 제대로 입력했다면 생일로 체크
    isMonCompleted();
  }
}

function isMonCompleted() {
  if (dd.value === "") {
    error[4].innerHTML = "태어난 일(날짜) 2자리를 정확하게 입력하세요."
    error[4].style.display = "block"
  } else {
    // 생일날짜를 1~31일 사이에 오도록 체크
    isBirthRight();
  }
}

function isBirthRight() {
  let datePattern = /\d{1,2}/;
  console.log(typeof (dd.value))
  if (!datePattern.test(dd.value) || Number(dd.value) < 1 || Number(dd.value) > 31) {
    // 정규식을 맞지 않게 적었다면 또는 value값이 1보다 작거나 31보다 크다면
    error[4].innerHTML = "생년월일을 다시 확인해주세요"
    error[4].style.display = "block"

  } else {
    checkAge();
  }
}

function checkAge() {
  if (Number(yy.value) < 1920) {
    error[4].innerHTML = "년도를 다시 입력하세요"
    error[4].style.display = "block"
  } else if (Number(yy.value) > 2023) {
    error[4].innerHTML = "년도를 다시 입력하세요"
    error[4].style.display = "block"
  } else {
    error[4].style.display = "none"
  }
  if (Number(yy.value) > 2010 && Number(yy.value) > 2023) {
    error[4].innerHTML = "만 14세 미만의 어린이는 보호자 동의가 필요합니다."
    error[4].style.display = "block"
  }
}
// 성별


//이메일
function checkEmail() {
  // {2,} : 두자리 이상
  var emailPattern = /[a-zA-Z0-9_]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/;
  if (email.value === "") {
    error[6].style.display = "none";
  } else if (!emailPattern.test(email.value)) {
    error[6].style.display = "block";
    /* 적다가 잘못 입력하면 다시 원상복구 */
    email.value = null;
    email.focus();
  } else {
    error[6].style.display = "none";
  }
}

// 전화번호
function checkPhoneNum() {
  let isPhoneNum = /^([01]{2})([01679]{1})([0-9]{3,4})([0-9]{4})$/;
  if (mobile.value === "") {
    error[7].innerHTML="필수 정보입니다."
    error[7].style.display = "block"
  } else if (!isPhoneNum.test(mobile.value)) {
    error[7].style.display="block"
    error[7].innerHTML="형식에 맞지 않는 번호입니다."
  } else {
    error[7].style.display="none"
  }
}
