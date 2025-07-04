// import { ROWS,COLUMNS } from "./const";
export const gridCanvas = document.getElementById("grid");
export const gridCtx = gridCanvas.getContext("2d");

import { COLOR } from "./piece.js";

export class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;

        gridCanvas.width = gridCanvas.offsetWidth;
        gridCanvas.height = gridCanvas.offsetHeight;

        this.cellSize = gridCanvas.height / rows;

        gridCtx.fillStyle = "black";

        this.line = 0;
    }
    // 繪製格線
    drawGrid() {
        this.drawOutLine();
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
                let piecePos = {
                    x: x * this.cellSize,
                    y: y * this.cellSize,
                };
                if (value !== 0) {
                    gridCtx.fillStyle = COLOR[value];
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
        let pieceMatrix = piece.currentMatrix;
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
        // console.table(gridMatrix);
    }
    // 檢查每一方塊是否發生碰撞
    checkCollision(piece) {
        let gridMatrix = this.matrix;
        let pieceMatrix = piece.currentMatrix;
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
    // 初始化
    init() {
        this.createMatrix();
        this.drawGrid();
    }
    //繪製外框線
    drawOutLine() {
        gridCtx.beginPath();
        gridCtx.lineWidth = 3;
        gridCtx.strokeRect(0, 0, gridCanvas.width, gridCanvas.height);
    }
    // 清除列
    clearLine() {
        let clearCount = 0;
        for (let y = this.rows - 1; y >= 0; y--) {
            /**
             * 檢查每一列的每一個值是否大於 0
             * 若每一個值 大於0 則回傳true 表示要清除列
             * 只要有一個值 <= 0 則回傳 false 表示不要清除列
             */
            let isClear = this.matrix[y].every(function (value) {
                return value > 0;
            });
            if (isClear) {
                clearCount++;
                this.line++;
                // 移除元素
                this.matrix.splice(y, 1);
                // 新增元素到陣列的第一個位置
                this.matrix.unshift(Array(this.columns).fill(0));
                // 清除列
                gridCtx.clearRect(
                    0,
                    0 + this.cellSize * y,
                    this.cellSize * this.columns,
                    this.cellSize
                );
                // 重新繪製格線
                gridCtx.lineWidth = 1;
                for (let x = 0; x < this.matrix[y].length; x++) {
                    gridCtx.strokeRect(
                        0 + this.cellSize * x,
                        0 + this.cellSize * y,
                        this.cellSize,
                        this.cellSize
                    );
                }
                // 更新畫面
                for (let i = y; i >= 0; i--) {
                    for (let j = 0; j < this.columns; j++) {
                        let value = this.matrix[i][j];
                        if (value === 0) {
                            gridCtx.clearRect(
                                j * this.cellSize,
                                i * this.cellSize,
                                this.cellSize,
                                this.cellSize
                            );
                            this.redrawGrid(
                                j * this.cellSize,
                                i * this.cellSize
                            );
                        }
                    }
                }
                y++;
                // 重新繪製外框線
                this.drawOutLine();
                // console.log(this.matrix);
            }
        }
        return clearCount;
    }
}
