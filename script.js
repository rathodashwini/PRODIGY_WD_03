document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll('.box');
    const resultInfo = document.getElementById('result-info');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return gameBoard.includes('') ? null : 'T'; // Tie if no winner and no empty cells
    };

    const handleBoxClick = (index) => {
        if (!gameActive || gameBoard[index] !== '') {
            return;
        }

        gameBoard[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        const winner = checkWinner();

        if (winner) {
            gameActive = false;
            if (winner === 'T') {
                resultInfo.innerText = 'It\'s a Tie!';
            } else {
                resultInfo.innerText = `Player ${winner} wins!`;
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => handleBoxClick(index));
    });
});
