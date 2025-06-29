export const nextShapeCanvas = document.getElementById("nextShape");
export const nextShapeCtx = nextShapeCanvas.getContext("2d");

import { SHAPE, MATRIX, COLOR } from "./piece.js";

export class Preview {
    // 偏移
    offset = {
        x: 1,
        y: 1,
    };
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;

        nextShapeCanvas.width = nextShapeCanvas.offsetWidth;
        nextShapeCanvas.height = nextShapeCanvas.offsetHeight;

        this.cellSize = nextShapeCanvas.width / rows;

        this.nextMatrix =
            MATRIX[SHAPE[Math.floor(Math.random() * SHAPE.length)]];
    }

    drawGrid() {
        this.drawOutLine();
        // 繪製 5x5個方格
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                nextShapeCtx.lineWidth = 1;
                nextShapeCtx.beginPath();
                nextShapeCtx.strokeRect(
                    0 + x * this.cellSize,
                    0 + y * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            }
        }
        nextShapeCtx.closePath();
    }

    drawPiece() {
        // 指定位置上繪製方塊
        this.nextMatrix.forEach((row, y) => {
            row.forEach((value, x) => {
                nextShapeCtx.fillStyle = COLOR[value];
                if (value !== 0) {
                    let posPiece = {
                        x:
                            0 +
                            this.cellSize * x +
                            this.cellSize * this.offset.x,
                        y:
                            0 +
                            this.cellSize * y +
                            this.cellSize * this.offset.y,
                    };
                    nextShapeCtx.fillRect(
                        posPiece.x,
                        posPiece.y,
                        this.cellSize,
                        this.cellSize
                    );
                    this.redrawGrid(posPiece.x, posPiece.y);
                }
            });
        });
    }
    redrawGrid(x, y) {
        nextShapeCtx.lineWidth = 1;
        nextShapeCtx.strokeRect(x, y, this.cellSize, this.cellSize);
    }

    init() {
        this.drawGrid();
        this.drawPiece();
    }

    update() {
        this.clear();
        this.nextMatrix =
            MATRIX[SHAPE[Math.floor(Math.random() * SHAPE.length)]];
        // console.table(this.nextMatrix);
        this.drawPiece();
    }

    clear() {
        // 指定位置上繪製方塊
        this.nextMatrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    let posPiece = {
                        x:
                            0 +
                            this.cellSize * x +
                            this.cellSize * this.offset.x,
                        y:
                            0 +
                            this.cellSize * y +
                            this.cellSize * this.offset.y,
                    };
                    nextShapeCtx.clearRect(
                        posPiece.x,
                        posPiece.y,
                        this.cellSize,
                        this.cellSize
                    );
                    this.redrawGrid(posPiece.x, posPiece.y);
                }
            });
        });
        this.drawOutLine();
    }
    drawOutLine() {
        nextShapeCtx.lineWidth = 3;
        nextShapeCtx.beginPath();
        nextShapeCtx.strokeRect(
            0,
            0,
            nextShapeCanvas.width,
            nextShapeCanvas.height
        );
    }
}
