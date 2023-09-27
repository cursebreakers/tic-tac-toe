

// Event listener for page-load
window.addEventListener("load", (event) => {
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
    
    // Check if the startButton element exists
    if (startButton) {
        startButton.addEventListener("click", initGame);
    } else {
        console.error("startButton element not found");
    }

    function initGame() {
        if (message) {
            message.textContent = "Loading...";
        }

        // Report game engine status
        console.log('Engine: Initializing...');  
        
        if (startButton) {
            startButton.textContent = "Restart Engine";
        }
        
        const board = document.getElementById("board");
        if (board) {
            board.innerHTML = '';
        }

        const createCharacterButton = document.createElement("button");
        createCharacterButton.textContent = "Create Character";
        createCharacterButton.addEventListener("click", createChar);
        board.appendChild(createCharacterButton);


        if (message) {
        message.textContent = "Game Engine: Loaded. Create your character to continue"
        // Report game engine status
        console.log('Engine: Initialized');  
    }

    function createChar() {
        // Report game engine status
        console.log('Engine: Running character creation...'); 
        
        message.textContent = "Profile: Player 1"
        createCharacterButton.textContent = "Reset Character";
    }

        // Report game engine status
        console.log('Engine: Loading board logic...');

        // Report game engine status
        console.log('Engine: Nominal');          
    }  
}



