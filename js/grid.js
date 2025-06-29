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
    // 繪製格線
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
    // 繪製Grid上所有的方塊
    drawPiece() {
        this.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    let piecePos = {
                        x: x * this.cellSize,
                        y: y * this.cellSize,
                    };
                    gridCtx.fillStyle = "red";
                    gridCtx.fillRect(
                        piecePos.x,
                        piecePos.y,
                        this.cellSize,
                        this.cellSize
                    );
                    this.redrawGrid(piecePos.x, piecePos.y);
                }
            });
        });
    }
    // 建立 20x12的 Matrix
    createMatrix() {
        let matrix = Array.from({ length: this.rows }, () =>
            Array(this.columns).fill(0)
        );
        this.matrix = matrix;
        // console.table(matrix);
    }
    // 重繪指定位置的格線
    redrawGrid(x, y) {
        gridCtx.lineWidth = 1;
        gridCtx.strokeRect(x, y, this.cellSize, this.cellSize);
    }
    // 合併 gridMatrix 與 pieceMatrix
    merge(piece) {
        let gridMatrix = this.matrix;
        let pieceMatrix = piece.matrix["T"];
        let [offsetX, offsetY] = Object.values(piece.offset);
        /**
         * y + offsetY 是 pieceMatrix 在 gridMatrix 上的row索引值
         * x + offsetX 是 pieceMatrix 在 gridMatrix 上的 column索引值
         *
         * 將不等於0的值賦值給gridMatrix相對應的位置
         */
        pieceMatrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    gridMatrix[y + offsetY][x + offsetX] = pieceMatrix[y][x];
                }
            });
        });
        console.table(gridMatrix);
    }
    // 檢查每一方塊是否發生碰撞
    checkCollision(piece) {
        let gridMatrix = this.matrix;
        let pieceMatrix = piece.matrix["T"];
        let [offsetX, offsetY] = Object.values(piece.offset);
        let value;
        // console.table(gridMatrix);
        for (let y = 0; y < pieceMatrix.length; y++) {
            for (let x = 0; x < pieceMatrix[y].length; x++) {
                value = pieceMatrix[y][x];
                if (
                    value !== 0 &&
                    (gridMatrix[y + offsetY] &&
                        gridMatrix[y + offsetY][x + offsetX]) !== 0
                ) {
                    return true;
                }
            }
        }
        return false;
    }
}
