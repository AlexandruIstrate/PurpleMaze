// sketch.js
//
// Coded by Alexandru Istrate
//
// Maze generation logic by Daniel Shiffman
// https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_010_Maze_DFS/P5

let mazeWidth = 40;
let grid = [];
let current;
let stack = [];

let maze;

function setup() {
    console.log("Setting up...")

    // Perform setup
    createCanvas(600, 600);

    maze = new Maze(600, 600, mazeWidth)
    maze.setup();

    console.log("Setup done")
}

function draw() {
    maze.draw();
}

function keyPressed() {
    if (maze.isDone) {
        maze.moveCursor(keyCode)
    }
}

function index(i, j, cols, rows) {
    if (i < 0 || j < 0) {
        return -1;
    }

    if (i > cols - 1 || j > rows - 1)  {
        return -1;
    }

    return i + j * cols;
}
