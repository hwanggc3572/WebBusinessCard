var num1 = Math.ceil(Math.random() * 9);
var num2 = Math.ceil(Math.random() * 9);
var res = num1 * num2;

var d_body = document.body;
var word = document.createElement('div');
word.textContent = String(num1) + ' X ' + String(num2) + ' = ?';
document.body.append(word);

var form_tag = document.createElement('form');
document.body.append(form_tag);
var input_screen = document.createElement('input');
form_tag.append(input_screen);
var register_button = document.createElement('button');
register_button.textContent = "register!";
form_tag.append(register_button);
var result_screen = document.createElement('div');
document.body.append(result_screen);

form_tag.addEventListener('submit', function(e) {
  e.preventDefault();
  if(res === Number(input_screen.value))
  {
    result_screen.textContent = "Great!";
    num1 = Math.ceil(Math.random() * 9);
    num2 = Math.ceil(Math.random() * 9);
    res = num1 * num2;
    word.textContent = String(num1) + ' X ' + String(num2) + ' = ?';
    
    input_screen.value = '';
    input_screen.focus();
  } else
  {
    result_screen.textContent = "Wrong!";
    input_screen.value = '';
    input_screen.focus();
  }
});




// var random_x = Math.floor(Math.random() * 9) + 1;
// var random_y = Math.floor(Math.random() * 9) + 1;
// var answer = random_x * random_y;
//
// var fail_count = 0;
// var total_chance = 5;
//
// while(fail_count < total_chance)
// {
//   var my_answer = prompt(random_x + ' X ' + random_y + ' = ?');
//   if(Number(my_answer) === answer)
//   {
//     alert('Great!');
//     random_x = Math.floor(Math.random() * 9) + 1;
//     random_y = Math.floor(Math.random() * 9) + 1;
//     answer = random_x * random_y;
//   }
//   else
//   {
//     fail_count++;
//     alert('Wrong answer :/\nYou have ' + (total_chance - fail_count) + ' chance(s).');
//   }
// }
// alert('Game Over');
