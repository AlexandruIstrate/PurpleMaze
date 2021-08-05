// sketch.js
//
// Coded by Alexandru Istrate
//

let mazeWidth = 40;
let canvasWidth = 600;
let canvasHeight = 600;
let maze;

let timerInitialValue = 10
var timerValue = timerInitialValue

function setup() {
    console.log("Setting up...")

    // Perform setup
    createCanvas(canvasWidth, canvasHeight);

    maze = new Maze(canvasWidth, canvasHeight, mazeWidth)
    maze.setup();

    var resetButton = createButton("Reset");
    resetButton.mousePressed(resetSketch);

    // Configure timer
    setInterval(timerInterval, 1000);

    console.log("Setup done")
}

function draw() {
    maze.draw();

    if (!maze.isDone) {
        presentText("Generating Maze...");
    } else if (maze.isGameOver) {
        if (maze.won) {
            presentText("You Won!");
        } else {
            presentText("You Lost!");
        }
    }

    // Draw timer
    fill(0, 255, 0);
    rect(0, canvasHeight - 5, canvasWidth * timerValue / timerInitialValue, 5)
}

function keyPressed() {
    if (maze.isDone) {
        if (!maze.isGameOver) {
            maze.moveCursor(keyCode)
        }
    }
}

function resetSketch() {
    maze = new Maze(canvasWidth, canvasHeight, mazeWidth)
    maze.setup();

    // Reset the timer
    timerValue = timerInitialValue;
}

function timerInterval() {
    if (maze.isDone) {
        if (!maze.isGameOver) {
            if (timerValue > 0) {
                timerValue--;
            } else {
                maze.isGameOver = true;
                maze.won = false;
            }
        }
    }
}

function gotGold() {
    // Reset the timer when we pick up gold
    timerValue = timerInitialValue;
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
