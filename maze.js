function Maze(width, height, mazeWidth) {
    this.mazeWidth = mazeWidth;
    this.cols = floor(width / this.mazeWidth);
    this.rows = floor(height / this.mazeWidth);
    this.grid = [];
    this.current = null;
    this.stack = [];

    this.isDone = false;
    this.isGameOver = false;

    this.lastVisited = [];

    this.setup = function () {
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                var cell = new Cell(i, j);
                this.grid.push(cell);
            }
        }

        this.current = this.grid[0];

        this.lastVisited = this.grid;

        // Set the start
        this.grid[0].isStart = true;
    };

    this.draw = function () {
        background(51);

        // Display the cells
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i].show();
        }

        this.current.visited = true;
        this.current.highlight();

        if (this.isDone) {
            return;
        }

        // STEP 1: Check the node's neighbours
        let next = this.current.checkNeighbors(this.grid, this.rows, this.cols);

        if (next) {
            // STEP 1.5: Mark the node as visited
            next.visited = true;

            // STEP 2: Store the current node so that we can return to it
            this.stack.push(this.current);

            // STEP 3: Clear the walls to connect with the other parts of the maze
            removeWalls(this.current, next);

            if (this.lastVisited.length > 1) {
                this.lastVisited = this.lastVisited.filter(w => !w.visited);
            } else {
                this.lastVisited[0].isEnd = true;
            }

            // STEP 4: Advance the iterator
            this.current = next;
        } else if (this.stack.length > 0) {
            this.current = this.stack.pop();
        } else {
            this.isDone = true
        }
    };

    this.moveCursor = function (direction) {
        switch (direction) {
            case LEFT_ARROW:
                if (!this.current.walls[3]) {
                    // console.log("Left");
                    this.current = this.grid[index(this.current.i - 1, this.current.j, this.rows, this.cols)]
                }
                break;

            case RIGHT_ARROW:
                if (!this.current.walls[1]) {
                    // console.log("Right");
                    this.current = this.grid[index(this.current.i + 1, this.current.j, this.rows, this.cols)]
                }
                break;

            case UP_ARROW:
                if (!this.current.walls[0]) {
                    // console.log("Up");
                    this.current = this.grid[index(this.current.i, this.current.j - 1, this.rows, this.cols)]
                }
                break;

            case DOWN_ARROW:
                if (!this.current.walls[2]) {
                    // console.log("Down");
                    this.current = this.grid[index(this.current.i, this.current.j + 1, this.rows, this.cols)]
                }
                break;

            default:
                return false;
        }

        if (this.current.isEnd) {
            this.isGameOver = true;
        }
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
    };
}