// sketch.js
//
// Coded by Alexandru Istrate
//

let mazeWidth = 40;
let canvasWidth = 600;
let canvasHeight = 600;
let maze;

function setup() {
    console.log("Setting up...")

    // Perform setup
    createCanvas(canvasWidth, canvasHeight);

    maze = new Maze(canvasWidth, canvasHeight, mazeWidth)
    maze.setup();

    console.log("Setup done")
}

function draw() {
    maze.draw();

    if (!maze.isDone) {
        presentText("Generating Maze...");
    } else if (maze.isGameOver) {
        presentText("You Won!");
    }
}

function keyPressed() {
    if (maze.isDone) {
        if (!maze.isGameOver) {
            maze.moveCursor(keyCode)
        }
    }
}

function index(i, j, cols, rows) {
    if (i < 0 || j < 0) {
        return -1;
    }

    if (i > cols - 1 || j > rows - 1) {
        return -1;
    }

    return i + j * cols;
}

function presentText(displayText) {
    // Set a blurred background
    fill(255, 255, 255, 100);
    rect(0, 0, canvasWidth, canvasHeight)

    // Write the text that tells you to wait
    textSize(32);
    textAlign(CENTER);
    fill(255);
    text(displayText, canvasWidth / 2, canvasHeight / 2);
}
