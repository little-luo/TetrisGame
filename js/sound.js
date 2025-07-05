let soundsPath = {
    drop: "./sounds/sounds_drop.wav",
    gameOver: "./sounds/game_over.wav",
    rotate: "./sounds/sounds_rotate.wav",
    clearLine: "./sounds/sounds_clear.wav",
};

export let dropSound = new Audio(soundsPath.drop);
export let gameOverSound = new Audio(soundsPath.gameOver);
export let rotateSound = new Audio(soundsPath.rotate);
export let clearLineSound = new Audio(soundsPath.clearLine);
