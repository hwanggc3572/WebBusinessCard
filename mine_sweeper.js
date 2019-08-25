var tbody = document.querySelector('#table tbody');
var dataset = [];
var stop_flag = false;
var opened_cell = 0;

var codetable = {
  open: -1,
  questionmark: -2,
  flag: -3,
  flagmine: -4,
  questionmine: -5,
  mine: 1,
  normal: 0
};

document.querySelector('#exec').addEventListener('click', function() {
  tbody.innerHTML = '';
  dataset = [];
  document.querySelector('#result').textContent = '';
  stop_flag = false;
  opened_cell = 0;
  var hor = parseInt(document.querySelector('#hor').value);
  var ver = parseInt(document.querySelector('#ver').value);
  var mine = parseInt(document.querySelector('#mine').value);

  // pick up the locations of mines
  var mineset = Array(hor * ver)
      .fill()
      .map(function (element, index) {
        return index;
      });
  var shuffle = [];
  while (mineset.length > hor*ver - mine) {
    var movedValue = mineset.splice(Math.floor(Math.random() * mineset.length), 1)[0];
    shuffle.push(movedValue);
  }

  // make the mine table
  for (var i=0; i<ver; i++) {
    var arr = [];
    var tr = document.createElement('tr');
    dataset.push(arr);
    for (var j=0; j<hor; j++) {
      arr.push(codetable.normal);
      var td = document.createElement('td');
      td.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        if(stop_flag) {
          return;
        }
        var parentTr = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var col = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
        var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
          e.currentTarget.textContent = '!';
          e.currentTarget.classList.add('flag');
          if(dataset[row][col] === codetable.mine) {
            dataset[row][col] = codetable.flagmine;
          } else {
            dataset[row][col] = codetable.flag;
          }
        } else if (e.currentTarget.textContent === '!') {
          e.currentTarget.textContent = '?';
          e.currentTarget.classList.remove('flag');
          e.currentTarget.classList.add('question');
          if(dataset[row][col] === codetable.flagmine) {
            dataset[row][col] = codetable.questionmine;
          } else {
            dataset[row][col] = codetable.questionmark;
          }
        } else if (e.currentTarget.textContent === '?') {
          e.currentTarget.classList.remove('question');
          if(dataset[row][col] === codetable.questionmine) {
            e.currentTarget.textContent = 'X';
            dataset[row][col] = codetable.mine;
          } else {
            e.currentTarget.textContent = '';
            dataset[row][col] = codetable.normal;
          }
        }
      });

      td.addEventListener('click', function(e) {
        if(stop_flag) {
          return;
        }
        var parentTr = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var col = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
        var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if([codetable.open, codetable.flag, codetable.flagmine, codetable.questionmine, codetable.questionmark].includes(dataset[row][col])) {
          return;
        }

        e.currentTarget.classList.add('opened');
        opened_cell++;
        if(dataset[row][col] === codetable.mine) {
          e.currentTarget.textContent = '펑';
          document.querySelector('#result').textContent = "Game Over";
          stop_flag = true;
        } else {

          var sides = [
            dataset[row][col-1],                        dataset[row][col+1]
            ];
          if(dataset[row-1]) {
            sides = sides.concat(dataset[row-1][col-1],dataset[row-1][col],dataset[row-1][col+1]);
          }
          if(dataset[row+1]) {
            sides = sides.concat(dataset[row+1][col-1],dataset[row+1][col],dataset[row+1][col+1]);
          }

          var num_mines = sides.filter(function(v) {
            return [codetable.mine, codetable.flagmine, codetable.questionmine].includes(v);
          }).length;

          e.currentTarget.textContent = num_mines || '';
          dataset[row][col] = codetable.open;

          if(num_mines === 0) {
            // adjacent 8 cells open (recursive)
            var side_cells = [];
            if(tbody.children[row-1]) {
              side_cells = side_cells.concat([
                tbody.children[row-1].children[col-1],
                tbody.children[row-1].children[col],
                tbody.children[row-1].children[col+1]
              ]);
            }
            side_cells = side_cells.concat([
              tbody.children[row].children[col-1],
              tbody.children[row].children[col+1]
            ]);
            if(tbody.children[row+1]) {
              side_cells = side_cells.concat([
                tbody.children[row+1].children[col-1],
                tbody.children[row+1].children[col],
                tbody.children[row+1].children[col+1]
              ]);
            }
            side_cells.filter(function (v) {return !!v }).forEach(function (next_cell) {
              var parentTr = e.currentTarget.parentNode;
              var parentTbody = e.currentTarget.parentNode.parentNode;
              var next_col = Array.prototype.indexOf.call(parentTr.children, next_cell);
              var next_row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
              if(dataset[next_row][next_col] !== codetable.open) {
                next_cell.click();
              }
            });
          }
        }
        if(opened_cell === hor*ver - mine) {
          stop_flag = true;
          document.querySelector('#result').textContent = 'You win!';
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  // insert mines into the table
  for(var k=0; k<shuffle.length; k++) {
    var vertical = Math.floor(shuffle[k] / ver);
    var horizontal = shuffle[k] % ver;
    tbody.children[vertical].children[horizontal].textContent = 'X';
    dataset[vertical][horizontal] = codetable.mine;
  }
});
