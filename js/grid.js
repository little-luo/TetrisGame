// import { ROWS,COLUMNS } from "./const";
export const gridCanvas = document.getElementById("grid");
export const gridCtx = gridCanvas.getContext("2d");

export class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;

        gridCanvas.width = gridCanvas.offsetWidth;
        gridCanvas.height = gridCanvas.offsetHeight;

        this.cellSize = gridCanvas.height / rows;

        gridCtx.fillStyle = "black";
    }
    drawGrid() {
        // 繪製外框線
        gridCtx.beginPath();
        gridCtx.lineWidth = 3;
        gridCtx.strokeRect(0, 0, gridCanvas.width, gridCanvas.height);
        // 繪製 20x12個方格
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                gridCtx.lineWidth = 1;
                gridCtx.strokeRect(
                    0 + x * this.cellSize,
                    0 + y * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            }
        }
        gridCtx.closePath();
    }
    createMatrix() {
        let matrix = Array.from({ length: this.rows }, () =>
            Array(this.columns).fill(0)
        );
        this.matrix = matrix;
        // console.table(matrix);
    }
}
