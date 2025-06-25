export const nextShapeCanvas = document.getElementById("nextShape");
export const nextShapeCtx = nextShapeCanvas.getContext("2d");

export class Preview {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;

        nextShapeCanvas.width = nextShapeCanvas.offsetWidth;
        nextShapeCanvas.height = nextShapeCanvas.offsetHeight;

        this.cellSize = nextShapeCanvas.width / rows;
    }

    drawGrid() {
        nextShapeCtx.lineWidth = 3;
        nextShapeCtx.beginPath();
        nextShapeCtx.strokeRect(
            0,
            0,
            nextShapeCanvas.width,
            nextShapeCanvas.height
        );
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
}
