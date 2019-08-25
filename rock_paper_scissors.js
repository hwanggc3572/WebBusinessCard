document.querySelector('#computer').style.background =
  'url(https://data.ac-illust.com/data/thumbnails/4f/4f63b32d7d43ea2cb231c0724200cf8e_w.jpeg) 0 0';

var 이미지좌표 = '0';
var 가위바위보 = {
  바위: '0',
  가위: '-240px',
  보: '-480px'
};

function 컴퓨터의선택(이미지좌표) {
  return Object.entries(가위바위보).find(function(v) {
    return v[1] === 이미지좌표;
  })[0];
};

var 인터벌;
function 인터벌메이커() {
  인터벌 = setInterval(function() {
    if(이미지좌표===가위바위보.바위) {
      이미지좌표 = 가위바위보.가위;
    } else if (이미지좌표 === 가위바위보.가위) {
      이미지좌표 = 가위바위보.보;
    } else {
      이미지좌표 = 가위바위보.바위;
    }
    document.querySelector('#computer').style.background =
      'url(https://data.ac-illust.com/data/thumbnails/4f/4f63b32d7d43ea2cb231c0724200cf8e_w.jpeg) ' + 이미지좌표 +' 0';
  }, 100);
};

인터벌메이커();

var 점수표 = {
  가위: 1,
  바위: 0,
  보: -1
};


document.querySelectorAll('.btn').forEach(function (btn) {
  btn.addEventListener('click', function() {
    clearInterval(인터벌);
    setTimeout(function () {
      인터벌메이커();
    }, 1000);
    var 나의선택 = this.textContent;
    var 나의점수 = 점수표[나의선택];
    var 컴퓨터점수 = 점수표[컴퓨터의선택(이미지좌표)];
    console.log('나의 선택: ', 나의선택,
                ',컴퓨터의 선택: ', 컴퓨터의선택(이미지좌표));

    if(나의점수 - 컴퓨터점수 === 0) {
      console.log('비겼습니다.');
    } else if ([-1,2].includes(나의점수 - 컴퓨터점수)) {
      console.log('이겼습니다.');
    } else {
      console.log('졌습니다.');
    }

    // if (나의선택 === '가위') {
    //   if(컴퓨터의선택(이미지좌표) === '가위') {
    //     console.log('비겼습니다.');
    //   } else if (컴퓨터의선택(이미지좌표) === '바위') {
    //     console.log('졌습니다.');
    //   } else {
    //     console.log('이겼습니다.');
    //   }
    // } else if (나의선택 === '바위') {
    //   if(컴퓨터의선택(이미지좌표) === '가위') {
    //     console.log('이겼습니다.');
    //   } else if (컴퓨터의선택(이미지좌표) === '바위') {
    //     console.log('비겼습니다.');
    //   } else {
    //     console.log('졌습니다.');
    //   }
    // } else {
    //   if(컴퓨터의선택(이미지좌표) === '가위') {
    //     console.log('졌습니다.');
    //   } else if (컴퓨터의선택(이미지좌표) === '바위') {
    //     console.log('이겼습니다.');
    //   } else {
    //     console.log('비겼습니다.');
    //   }
    // }
  });
});
