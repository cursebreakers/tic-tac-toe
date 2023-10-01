

// Event listener for page-load
window.addEventListener("load", (event) => {
    // Report game engine status
    console.log('Engine: Initializing...');  
      loadEngine()
});

// Game loader function
function loadEngine() {
    console.log('Engine: Waiting...')

    const gameTray = document.getElementById("gameTray");
    
    if (!gameTray) {
        console.error("gameTray element not found");
        return; // Exit the function if gameTray is not found
    }

    const startButton = document.getElementById("startButton");
    const message = document.getElementById("message");
    const board = document.getElementById("board");
    const tray = document.getElementById('gameTray')

    // Check if the startButton element exists
    if (startButton) {
        startButton.addEventListener("click", initGame);
    } else {
        console.error("startButton element not found");
    }

    function initGame() {
        // Report game engine status
        console.log('Engine: Initialized');  
        // Update game message
        if (message) {
            message.textContent = "Player select";
        }
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
                    runGame(player1Name, player1Piece, player2Name, player2Piece);
                        
                        // Remove the player select inputs from the tray
                        if (tray) {
                            tray.removeChild(player1NameIn);
                            tray.removeChild(player1Choice);
                            tray.removeChild(player2NameIn);
                            tray.removeChild(player2Choice);
                            tray.removeChild(playButton);
                        }
                        
                    });
                            tray.appendChild(playButton);
                }
            }

        setupPlayers()           

    function runGame(player1Name, player1Piece, player2Name, player2Piece) {
        console.log(player1Piece, player1Name)
        console.log(player2Piece, player2Name)   
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
    }
      
    function createBoard() {
        // Report game engine status
        console.log('Engine: Loading board logic...');
        const gridSize = 3; // You can change this to modify the size of the grid
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", handleCellClick);
                board.appendChild(cell);
            }
        }
    }

    let currentPlayer = 1; // Player 1 starts


    function handleCellClick(event) {
        console.log('clicking cell...')
        const cell = event.target;
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        
        // Check if the cell is already occupied
        if (cell.textContent !== '') {
            return; // Cell is already occupied, do nothing
        }
        
        // Mark the cell with the current player's piece
        cell.textContent = currentPlayer === 1 ? 'X' : 'O';

        // Check if the current player has won
        if (checkWin(currentPlayer === 1 ? 'X' : 'O', row, col)) {
            message.textContent = `Player ${currentPlayer} (${currentPlayer === 1 ? 'X' : 'O'}) wins!`;
            // You can add code here to end the game or reset the board.
            return;
        }

        // Check if the game is a draw
        if (checkDraw()) {
            message.textContent = 'It\'s a draw!';
            // You can add code here to end the game or reset the board.
            return;
        }

        // Switch to the next player's turn
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        message.textContent = `Move: ${currentPlayer === 1 ? 'X' : 'O'} Player ${currentPlayer}`;
    }

    function checkWin(piece, row, col) {
        console.log('Checking for win...')
        // Implement your win condition logic here
        // You need to check rows, columns, and diagonals to see if they contain the same piece.
        // Return true if the current player has won, otherwise return false.
        // You can use nested for loops to check rows, columns, and diagonals.
        // Example win conditions:
        // - Horizontal: [X, X, X] or [O, O, O]
        // - Vertical: [X, X, X] or [O, O, O]
        // - Diagonal: [X, X, X] or [O, O, O]
    
        // You can implement this logic as a separate function and call it from handleCellClick.
    }

    function checkDraw() {
        console.log('Checking for draw...')
        // Implement your draw condition logic here
        // Check if all cells are occupied and no player has won.
        // Return true if it's a draw, otherwise return false.
        // You can use nested for loops to iterate through all cells.
    
        // You can implement this logic as a separate function and call it from handleCellClick.
    }
    

    }
          // Report game engine status
          console.log('Engine: Nominal'); 

}


