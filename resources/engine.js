
// Event listener for page-load
window.addEventListener("load", (event) => {
      loadEngine()
});

// Game loader function
function loadEngine() {
    console.log('Engine: Online')
    
    // Define game elements
    const gameTray = document.getElementById("gameTray");
    const startButton = document.getElementById("startButton");
    const message = document.getElementById("message");
    const board = document.getElementById("board");
    const tray = document.getElementById('gameTray')

    // Game settings
    const gridSize = 3;
    let currentPlayer = 1; // Player 1 starts

    // Game state object to store relevant data
    const gameState = {
        player1: {},
        player2: {},
        currentPlayer: 1,
        boardState: [],
        gameEnded: false,
    };
    
    if (!gameTray) {
        console.error("gameTray element not found");
        return; // Exit the function if gameTray is not found
    }

    // Check if the startButton element exists
    if (startButton) {
        startButton.addEventListener("click", initGame);
    } else {
        console.error("startButton element not found");
    }

    function initGame() {
        // Report game engine status
        console.log('Engine: Initializing...');

        //Clear game board
        if (board) {
            board.innerHTML = '';
        }
        // Reset Button
        if (startButton) {
            startButton.textContent = "Reboot";
            startButton.addEventListener("click", () => {
                location.reload(); // Reload the page when the button is clicked
            });
            
            setupPlayers();
            createBoard();            
        }
    }    

    function setupPlayers() {
        // Report game engine status
        console.log('Engine: Running player creation...'); 

        // Create input elements for player names and choices
        const player1NameIn = document.createElement("input");
        player1NameIn.placeholder = "Enter Player 1's name";
        const player1Choice = document.createElement("select");
        player1Choice.innerHTML = '<option value="x">X</option><option value="o">O</option>';

        const player2NameIn = document.createElement("input");
        player2NameIn.placeholder = "Enter Player 2's name";
        const player2Choice = document.createElement("select");
        player2Choice.innerHTML = '<option value="x">X</option><option value="o" selected>O</option>';
            
        // Add the input elements to the board
        if (tray) {
            tray.appendChild(player1NameIn);
            tray.appendChild(player1Choice);
            tray.appendChild(player2NameIn);
            tray.appendChild(player2Choice);
        
            // Add a button to start the game after collecting inputs
            const playButton = document.createElement("button");
            playButton.textContent = "Play!";
            playButton.addEventListener("click", () => {
                const player1Name = player1NameIn.value;
                const player1Piece = player1Choice.value;
                const player2Name = player2NameIn.value;
                const player2Piece = player2Choice.value;
        
                // Check if inputs are valid
                if (!player1Name || !player2Name) {
                    alert("Both players must enter their names.");
                    return;
                }

                // Now you have player names and choices, continue with the game setup
                gameState.player1 = { name: player1Name, piece: player1Piece };
                gameState.player2 = { name: player2Name, piece: player2Piece };
                gameState.currentPlayer = 1;
                gameState.boardState = initializeBoard();
                gameState.gameEnded = false;

                runGame();
            });

            tray.appendChild(playButton);
        }
    }

            
    // Initialize the game board
    function createBoard() {
        // Report game engine status
        console.log('Engine: Loading board...');
        for (let row = 0; row < gridSize; row++) {
            const rowArray = [];
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", handleCellClick);
                board.appendChild(cell);
                rowArray.push(null);
            }
            gameState.boardState.push(rowArray);
        }
    }

    function initializeBoard() {
        const boardState = [];
        for (let row = 0; row < gridSize; row++) {
            const rowArray = [];
            for (let col = 0; col < gridSize; col++) {
                rowArray.push(null);
            }
            boardState.push(rowArray);
        }
        return boardState;
    }


    // Game logic
    function runGame(player1Name, player1Piece, player2Name, player2Piece) {
        console.log(player1Piece, player1Name)
        console.log(player2Piece, player2Name)  
        // Update game message
        if (message) {
            message.textContent = `Move: ${gameState.player1.piece} ${gameState.player1.name}`;
        }

        // Create character objects for both players
        const player1 = {
            name: player1Name,
            piece: player1Piece,
        };
                    
        const player2 = {
            name: player2Name,
            piece: player2Piece,
        };
        
        if (board) {
            // Clear the board and create a grid of cells
            board.innerHTML = '';
            createBoard();
        }

        if (message) {
        message.textContent = "Move:" + " " + player1Piece + " " + player1Name
        }
        console.log('Game ready')
    }


    function handleCellClick(event) {
        console.log('clicking cell...')

        // Check if the game has ended
        if (gameState.gameEnded) {
            return;
        }
        
        const cell = event.target;
        const row = cell.dataset.row;
        const col = cell.dataset.col;

        // Check if the cell is already occupied
        if (gameState.boardState[row][col] !== null) {
            return; // Cell is already occupied, do nothing
        }
        
        // Mark the cell with the current player's piece
        cell.textContent = gameState.currentPlayer === 1 ? gameState.player1.piece : gameState.player2.piece;

        // Update the board state
        gameState.boardState[row][col] = gameState.currentPlayer;

        // Check if the current player has won
        if (checkWin(gameState.currentPlayer, row, col)) {
            message.textContent = `Player ${gameState.currentPlayer} (${gameState.currentPlayer === 1 ? gameState.player1.piece : gameState.player2.piece}) wins!`;
            gameState.gameEnded = true;
            return;
        }

        // Check if the game is a draw
        if (checkDraw()) {
            message.textContent = "It's a draw!";
            gameState.gameEnded = true;
            return;
        }

        // Switch to the next player's turn
        gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
        message.textContent = `Move: ${gameState.currentPlayer === 1 ? gameState.player1.piece : gameState.player2.piece} ${gameState.currentPlayer === 1 ? gameState.player1.name : gameState.player2.name}`;
    }

        function checkWin(player, row, col) {
            console.log('Checking for win...')

            // Check for a win in the row
        for (let i = 0; i < gridSize; i++) {
            if (gameState.boardState[row][i] !== player) {
                break; // If a cell in the row doesn't match, no win in this row
            }
            if (i === gridSize - 1) {
                return true; // All cells in the row match, player wins
            }
        } 
        
        // Check for a win in the column
        for (let i = 0; i < gridSize; i++) {
            if (gameState.boardState[i][col] !== player) {
                break; // If a cell in the column doesn't match, no win in this column
            }
            if (i === gridSize - 1) {
                return true; // All cells in the column match, player wins
            }
        }
        
        // Check for a win in the main diagonal
        if (row === col) {
            for (let i = 0; i < gridSize; i++) {
                if (gameState.boardState[i][i] !== player) {
                    break; // If a cell in the diagonal doesn't match, no win in this diagonal
                }
                if (i === gridSize - 1) {
                    return true; // All cells in the diagonal match, player wins
                }
            }
        }

        // Check for a win in the anti-diagonal (from top-right to bottom-left)
        if (row + col === gridSize - 1) {
            for (let i = 0; i < gridSize; i++) {
                if (gameState.boardState[i][gridSize - 1 - i] !== player) {
                    break; // If a cell in the anti-diagonal doesn't match, no win in this anti-diagonal
                }
                if (i === gridSize - 1) {
                    return true; // All cells in the anti-diagonal match, player wins
                }
            }
        }    

        return false; // No win condition found
    }

    function checkDraw() {
        console.log('Checking for draw...')
        // Check if all cells are occupied
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (gameState.boardState[row][col] === null) {
                    return false; // At least one cell is empty, game is not a draw
                }
            }
        }
        
        return true; // All cells are occupied, game is a draw
    }

        // Report game engine status
        console.log('Engine: Nominal'); 
    }

// Status check 1
console.log('Engine: Boot...')

