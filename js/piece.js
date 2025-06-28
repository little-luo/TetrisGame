import { gridCtx } from "./grid.js";

export class Piece {
    offset = {
        x: 5,
        y: 0,
    };
    constructor() {
        this.matrix = {
            T: [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ],
        };
    }
    draw(grid) {
        const cellSize = grid.cellSize;
        this.matrix["T"].forEach((rows, y) => {
            rows.forEach((value, x) => {
                if (value !== 0) {
                    gridCtx.fillStyle = "red";
                    gridCtx.fillRect(
                        x * cellSize + this.offset.x * cellSize,
                        y * cellSize + this.offset.y * cellSize,
                        cellSize,
                        cellSize
                    );
                    grid.redrawGrid(
                        x * cellSize + this.offset.x * cellSize,
                        y * cellSize + this.offset.y * cellSize
                    );
                }
            });
        });
    }
    clear(grid) {
        const cellSize = grid.cellSize;
        this.matrix["T"].forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    gridCtx.clearRect(
                        x * cellSize + this.offset.x * cellSize,
                        y * cellSize + this.offset.y * cellSize,
                        cellSize,
                        cellSize
                    );
                    grid.redrawGrid(
                        x * cellSize + this.offset.x * cellSize,
                        y * cellSize + this.offset.y * cellSize
                    );
                }
            });
        });
    }
    move(dir, grid) {
        switch (dir) {
            case "down": {
                this.clear(grid);
                this.offset.y += 1;
                this.draw(grid);
                break;
            }
            case "left": {
                this.clear(grid);
                this.offset.x -= 1;
                this.draw(grid);
                break;
            }
            case "right": {
                this.clear(grid);
                this.offset.x += 1;
                this.draw(grid);
                break;
            }
        }
    }
}
