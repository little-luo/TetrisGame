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
                        x * cellSize + this.offset.x * cellSize + 0.5,
                        y * cellSize + this.offset.y * cellSize + 0.5,
                        cellSize - 1,
                        cellSize - 1
                    );
                }
            });
        });
    }
}
