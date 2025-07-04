let scoreCanvas = document.getElementById("score");
let scoreCtx = scoreCanvas.getContext("2d");

scoreCanvas.width = scoreCanvas.offsetWidth;
scoreCanvas.height = scoreCanvas.offsetHeight;

export class Score {
    constructor() {
        this.currentScore = 0;
        this.line = 0;
    }

    drawOutLine() {
        scoreCtx.beginPath();
        scoreCtx.strokeStyle = "black";
        scoreCtx.lineWidth = 3;
        scoreCtx.strokeRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    }
    init(grid) {
        this.grid = grid;
        this.displayScore();
    }

    displayScore() {
        scoreCtx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
        this.line = this.grid.line;
        this.currentScore = this.line * 10;
        scoreCtx.font = "30px serif";
        scoreCtx.fillText(`SCORE : ${this.currentScore}`, 10, 30);
        scoreCtx.fillText(`LINE : ${this.line}`, 10, 60);
        this.drawOutLine();
    }
}
