let cols, rows;
let mazeWidth = 40;

function setup() {
    console.log("Setting up...")

    // Perform setup
    createCanvas(500, 500);
    cols = floor(width / mazeWidth);
    rows = floor(height / mazeWidth);

    console.log("Setup done")
}

function draw() {
    background(64);
}