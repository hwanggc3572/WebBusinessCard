var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');

function 결과체크(몇줄, 몇칸) {
  // 세칸 다 채워졌나?
  var 다참 = false;
  // 가로줄 검사
  if(칸들[몇줄][0].textContent === 턴 &&
     칸들[몇줄][1].textContent === 턴 &&
     칸들[몇줄][2].textContent === 턴)
  {
    다참 = true;
  }
  // 세로줄 검사
  if(칸들[0][몇칸].textContent === 턴 &&
     칸들[1][몇칸].textContent === 턴 &&
     칸들[2][몇칸].textContent === 턴)
  {
    다참 = true;
  }
  // 대각선 검사

  if(칸들[0][0].textContent === 턴 &&
    칸들[1][1].textContent === 턴 &&
    칸들[2][2].textContent === 턴)
  {
    다참 = true;
  }

  if(칸들[0][2].textContent === 턴 &&
    칸들[1][1].textContent === 턴 &&
    칸들[2][0].textContent === 턴)
  {
    다참 = true;
  }

  return 다참;
};

function 초기화(무승부) {
  if(무승부) {
    결과.textContent = '무승부';
  } else {
    결과.textContent = 턴 + '님이 승리!';
  }
  바디.append(결과);
  setTimeout(function () {
    결과.textContent = '';
    칸들.forEach(function (줄) {
      줄.forEach(function (칸) {
        칸.textContent = '';
      });
    });
    턴 = 'X';
  }, 1000);
};

// 칸을 클릭했을 때
var 비동기콜백 = function(e) {
  // console.log(이벤트.target); // 칸
  // console.log(이벤트.target.parentNode); // 줄
  // console.log(이벤트.target.parentNode.parentNode); // 테이블
  if(턴 === 'O') {
    return;
  }
  var 몇줄 = 줄들.indexOf(e.target.parentNode);
  var 몇칸 = 칸들[몇줄].indexOf(e.target);

  if(칸들[몇줄][몇칸].textContent !== '') { // 칸이 이미 채워져 있는가?
    console.log('빈칸 아닙니다.');
  } else {
    e.target.textContent = 턴;
    console.log('빈칸입니다.');

    // if(턴 === 'X') {
    //   칸들[몇줄][몇칸].style.backgroundColor = "pink";
    // } else if (턴 === 'O') {
    //   칸들[몇줄][몇칸].style.backgroundColor = "yellow"
    // }

    var 승리여부 = 결과체크(몇줄, 몇칸);


    // 모든 칸이 다 찼는지 검사
    var 후보칸 = [];
    칸들.forEach(function (줄) {
      줄.forEach(function (칸) {
        후보칸.push(칸);
      });
    });

    // 컴퓨터가 빈 칸 중 하나를 고른다
    후보칸 = 후보칸.filter(function(칸) { return 칸.textContent === '' });
    // 승리여부
    if(승리여부) {
      초기화();
    } else if(후보칸.length === 0) {
      초기화(true);
    } else { // 다 안찼으면
      if(턴 === 'X') {
        턴 = 'O';
      }
      setTimeout(function () { // opponent turn
        var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
        선택칸.textContent = 턴;

        // 컴퓨터가 승리했는지 체크
        var 몇줄 = 줄들.indexOf(선택칸.parentNode);
        var 몇칸 = 칸들[몇줄].indexOf(선택칸);
        var 승리여부 = 결과체크(몇줄, 몇칸);

        // 다 찼으면
        if(승리여부) {
          console.log(턴 + '님이 승리!');
          결과.textContent = 턴 + '님이 승리!';
          초기화();
        } else {
          // 턴을 나한테 넘긴다
          턴 = 'X';
        }
      }, 1000);
    }
  }
};

for(var i=0; i<3; i++)
{
  var 줄 = document.createElement('tr');
  줄들.push(줄);
  칸들.push([]);
  for(var j=0; j<3; j++)
  {
    var 칸 = document.createElement('td');
    칸.addEventListener('click', 비동기콜백);
    칸들[i].push(칸);
    줄.appendChild(칸);
  }
  테이블.appendChild(줄);
}

바디.appendChild(테이블);
