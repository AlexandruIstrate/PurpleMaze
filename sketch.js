// sketch.js
//
// Coded by Alexandru Istrate
//
// Maze generation logic by Daniel Shiffman
// https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_010_Maze_DFS/P5

let cols, rows;
let mazeWidth = 30;
let grid = [];
let current;
let stack = [];

function setup() {
    console.log("Setting up...")

    // Perform setup
    createCanvas(600, 600);
    cols = floor(width / mazeWidth);
    rows = floor(height / mazeWidth);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    current = grid[0];

    console.log("Setup done")
}

function draw() {
    background(51);

    // Display the cells
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight();

    // STEP 1: Check the node's neighbours
    let next = current.checkNeighbors();

    if (next) {
        // STEP 1.5: Mark the node as visited
        next.visited = true;

        // STEP 2: Store the current node so that we can return to it
        stack.push(current);

        // STEP 3: Clear the walls to connect with the other parts of the maze
        removeWalls(current, next);

        // STEP 4: Advance the iterator
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }
}

function index(i, j) {
    if (i < 0 || j < 0) {
        return -1;
    }

    if (i > cols - 1 || j > rows - 1)  {
        return -1;
    }

    return i + j * cols;
}

function removeWalls(a, b) {
    let x = a.i - b.i;

    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    let y = a.j - b.j;

    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}