// cell.js
//
// Coded by Alexandru Istrate
//
// Maze generation logic by Daniel Shiffman
// https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_010_Maze_DFS/P5
//
// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.isStart = false;
  this.isEnd = false;

  this.hasGold = false;

  this.checkNeighbors = function (grid, rows, cols) {
    let neighbors = [];

    let top = grid[index(i, j - 1, rows, cols)];
    let right = grid[index(i + 1, j, rows, cols)];
    let bottom = grid[index(i, j + 1, rows, cols)];
    let left = grid[index(i - 1, j, rows, cols)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };
  this.highlight = function () {
    let x = this.i * mazeWidth;
    let y = this.j * mazeWidth;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, mazeWidth, mazeWidth);
  };

  this.show = function () {
    let x = this.i * mazeWidth;
    let y = this.j * mazeWidth;

    stroke(255);

    if (this.walls[0]) {
      line(x, y, x + mazeWidth, y);
    }

    if (this.walls[1]) {
      line(x + mazeWidth, y, x + mazeWidth, y + mazeWidth);
    }

    if (this.walls[2]) {
      line(x + mazeWidth, y + mazeWidth, x, y + mazeWidth);
    }

    if (this.walls[3]) {
      line(x, y + mazeWidth, x, y);
    }

    if (this.visited) {
      noStroke();

      if (this.isStart) {
        fill(200, 200, 200, 100);
      } else if (this.isEnd) {
        fill(0, 255, 0, 100);
      } else {
        fill(255, 0, 255, 100);
      }

      rect(x, y, mazeWidth, mazeWidth);

      if (this.hasGold) {
        fill(200, 200, 0);
        rect(x + 10, y + 10, mazeWidth - 20, mazeWidth - 20);
      }
    }
  };
}
