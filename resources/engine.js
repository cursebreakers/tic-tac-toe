
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

    // Create character objects for both players

    let player1Name;
    let player1Piece;
    let player2Name;
    let player2Piece;

    const player1 = {
        name: player1Name,
        piece: player1Piece,
    };
                
    const player2 = {
        name: player2Name,
        piece: player2Piece,
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
        }
    }    

    function setupPlayers() {
        // Report game engine status
        console.log('Engine: Running player creation...'); 
        // Create a div to contain player inputs
        const playerInputsDiv = document.createElement("div");

        // Get the gamePanel div by its ID
        const gamePanel = document.getElementById("gamePanel");

        // Create input elements for player names and choices
        const player1NameIn = document.createElement("input");
        player1NameIn.placeholder = "Player 1";
        const player1Choice = document.createElement("select");
        player1Choice.innerHTML = '<option value="x">X</option><option value="o">O</option>';

        const player2NameIn = document.createElement("input");
        player2NameIn.placeholder = "Player 2";
        const player2Choice = document.createElement("select");
        player2Choice.innerHTML = '<option value="x">X</option><option value="o" selected>O</option>';

        // Add the input elements to the playerInputsDiv
        playerInputsDiv.appendChild(player1NameIn);
        playerInputsDiv.appendChild(player1Choice);
        playerInputsDiv.appendChild(player2NameIn);
        playerInputsDiv.appendChild(player2Choice);
        
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
                alert("Enter player name.");
                return;
            }
                // Now you have player names and choices, continue with the game setup
                gameState.player1 = { name: player1Name, piece: player1Piece };
                gameState.player2 = { name: player2Name, piece: player2Piece };
                                
                if (player1Piece === 'x') {
                    gameState.currentPlayer = 1; // Player 1 (X) goes first
                } else {
                    gameState.currentPlayer = 2; // Player 2 (O) goes first
                }
                gameState.boardState = initializeBoard();
                gameState.gameEnded = false;

                // Hide the player inputs div
                playerInputsDiv.style.display = "none";
                playButton.style.display = "none";
                message.textContent = "Players confirmed"

                runGame(player1Name, player1Piece, player2Name, player2Piece);
            });

        // Add the playerInputsDiv and playButton to the gamePanel
        if (gamePanel) {
            gamePanel.appendChild(playerInputsDiv);
            gamePanel.appendChild(playButton);
            message.textContent = "Player select"

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


    // Game starting logic
    function runGame(player1Name, player1Piece, player2Name, player2Piece) {
        console.log("player1Piece:", player1Piece);
        console.log("player1Name:", player1Name);
        console.log("player2Piece:", player2Piece);
        console.log("player2Name:", player2Name);  
        // Update game message
        if (message) {
            message.textContent = `Move: ${gameState.player1.piece} ${gameState.player1.name}`;
        }
        
        if (board) {
            // Clear the board and create a grid of cells
            board.innerHTML = '';
            createBoard();
        };

        if (player2Name === "AI" && gameState.currentPlayer === 2) {
            // It's the AI's turn
            console.log("AI starts");
            setTimeout(() => {
                aiMove(gameState.player1, gameState.player2, player1Piece, player2Piece);
            }, 1000); // Provide player1 and player2 objects // Provide player1 and player2 objects
        };
    }

    // AI logic
    function aiMove(player1, player2, player1Piece, player2Piece) {
        console.log('AI move initialized');

        // First, check for a win opportunity for the AI
        const winMove = findWinningMove(gameState.boardState, player2.piece);
        if (winMove) {
            const { row, col } = winMove;
            makeMove(row, col);
            return;
        }
    
        // If no winning move, check for a blocking move for the player 1
        const blockMove = findWinningMove(gameState.boardState, player1.piece);
        if (blockMove) {
            const { row, col } = blockMove;
            makeMove(row, col);
            return;
        }
    
        // If no winning or blocking move, choose a random empty cell
        const emptyCells = findEmptyCells(gameState.boardState);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const { row, col } = emptyCells[randomIndex];
            makeMove(row, col);
        }
    }

    function findWinningMove(board, piece) {
        console.log('AI applying strategy...')
        // Check for a winning move in rows, columns, and diagonals
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (board[i][j] === null) {
                    board[i][j] = piece;
                    if (checkWin(2, i, j)) {
                        board[i][j] = null; // Reset the board state
                        return { row: i, col: j };
                    }
                    board[i][j] = null; // Reset the board state
                }
            }
        }
        return null;
    }
    
    function makeMove(row, col) {
        console.log('AI moving...')
        // Simulate a click on the chosen cell
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        handleCellClick({ target: cell });
    }

    function findEmptyCells(board) {
        console.log('AI scanning...')
        
        const emptyCells = [];

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (board[row][col] === null) {
                    emptyCells.push({ row, col });
                }
            }
        }

        return emptyCells;
    }

    function handleCellClick(event) {
        console.log('clicking cell...');
        console.log("player1Piece:", gameState.player1.piece);
        console.log("player1Name:", gameState.player1.name);
        console.log("player2Piece:", gameState.player2.piece);
        console.log("player2Name:", gameState.player2.name);  

        const cell = event.target;
        const row = cell.dataset.row;
        const col = cell.dataset.col;

        // Check if the game has ended
        if (gameState.gameEnded) {
            return;
        }
        
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

        console.log('Before switching turn. gameState.currentPlayer:', gameState.currentPlayer);

        // Switch to the next player's turn
        gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
        message.textContent = `Move: ${gameState.currentPlayer === 1 ? gameState.player1.piece : gameState.player2.piece} ${gameState.currentPlayer === 1 ? gameState.player1.name : gameState.player2.name}`;

        console.log('After switching turn. gameState.currentPlayer:', gameState.currentPlayer);
        console.log("player1Piece:", gameState.player1.piece);
        console.log("player1Name:", gameState.player1.name);
        console.log("player2Piece:", gameState.player2.piece);
        console.log("player2Name:", gameState.player2.name);

        if (gameState.player2.name === "AI" && gameState.currentPlayer === 2) {
            // It's the AI's turn
            console.log("AI's turn")
            setTimeout(() => {
                aiMove(gameState.player1, gameState.player2, gameState.player1.piece, gameState.player2.piece);
            }, 1000); // Provide player1 and player2 objects
        }
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

