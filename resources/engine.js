

// Event listener for page-load
window.addEventListener("load", (event) => {
    // Report game engine status
    console.log('Engine: Initializing...');  
      loadEngine()
});

// Game loader function
function loadEngine() {
    console.log('Engine: Online')

    const gameTray = document.getElementById("gameTray");
    
    if (!gameTray) {
        console.error("gameTray element not found");
        return; // Exit the function if gameTray is not found
    }

    const startButton = document.getElementById("startButton");
    const message = document.getElementById("message");
    const board = document.getElementById("board");

    
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
            message.textContent = "Loading...";
        }
        //Clear game board
        if (board) {
            board.innerHTML = '';
        }
        // Reset Button
        if (startButton) {
            startButton.textContent = "Reset Engine";
        }

        // Report game engine status
        console.log('Engine: Running character creation...'); 

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
            if (board) {
                board.appendChild(player1NameIn);
                board.appendChild(player1Choice);
                board.appendChild(player2NameIn);
                board.appendChild(player2Choice);
        
                // Add a button to start the game after collecting inputs
                const playButton = document.createElement("button");
                playButton.textContent = "Play!";
                playButton.addEventListener("click", () => {
                    const player1Name = player1NameIn.value;
                    const player1Piece = player1Choice.value;
                    const player2Name = player2NameIn.value;
                    const player2Piece = player2Choice.value;
        
                    // Check if inputs are valid (you can add validation logic here)
        
                    // Now you have player names and choices, continue with the game setup
                        runGame(player1Name, player1Piece, player2Name, player2Piece);
                    });
        
                    board.appendChild(playButton);
                }

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

    function handleCellClick(event) {
        const cell = event.target;
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        // Implement your logic for handling the player's move here
        // You can update the cell's content with the player's piece (x or o)
        // Check for a win or a draw and update the message accordingly
        }
          // Report game engine status
          console.log('Engine: Nominal'); 
        }
         
    }
}



