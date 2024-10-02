// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Fastlane is Ownable{
    // Constants
    uint256 constant COLUMNS = 5;
    uint256 public ENTRY_FEE = 1 ether;
    uint256 public SESSION_DURATION = 1200 seconds;

    // State variables
    uint256[] private chainObstacles;
    mapping(uint256 => address) public checkpointNumberOwner;
    mapping(address => uint256[]) public senderCheckpointNumbers;
    mapping(address => uint256) public playerCurrentCheckpoint;
    mapping(address => uint256) public sessionStartTime;
    mapping(address => bool) public activeSessions;
    uint256 public checkpointCounter;
    address public currentLatestCheckpointOwner;

    // Events
    event CheckpointCreated(address indexed creator, uint256 checkpointNumber);
    event PlayerCheckpointUpdated(address indexed player, uint256 checkpointNumber);
    event GameStarted(address indexed player, uint256 startTime);
    event EntryFeePaid(address indexed player, uint256 amount);
    event GameEnded(address indexed player, uint256 endTime);

    error InvalidRow();

    // Modifiers
   /*modifier onlyCheckpointOwner() {
        require(
            senderCheckpointNumbers[msg.sender].length > 0,
            "Caller is not a checkpoint owner"
        );
        _;
    }*/

    modifier noSuccessiveCheckpoints() {
        if (senderCheckpointNumbers[msg.sender].length > 0) {
            require(
                senderCheckpointNumbers[msg.sender][
                    senderCheckpointNumbers[msg.sender].length - 1
                ] != checkpointCounter - 1,
                "Cannot create two successive checkpoints"
            );
        }
        _;
    }

    modifier onlyDuringSession() {
        require(activeSessions[msg.sender], "No active session");
        require(
            block.timestamp <= sessionStartTime[msg.sender] + SESSION_DURATION,
            "Session has expired"
        );
        _;
    }

    constructor() Ownable(msg.sender) {
        checkpointCounter = 0;
        currentLatestCheckpointOwner = msg.sender;
    }

    // Function to start a game session
    function startGame() public payable returns(uint256) {
        require(msg.value == ENTRY_FEE, "Incorrect entry fee");
        if(activeSessions[msg.sender]){
            require(
            block.timestamp <= sessionStartTime[msg.sender] + SESSION_DURATION,
            "Session has expired"
            );
        }
        // Initialize session
        sessionStartTime[msg.sender] = block.timestamp;
        activeSessions[msg.sender] = true;

        // Transfer the entry fee to the current latest checkpoint owner
        payable(currentLatestCheckpointOwner).transfer(msg.value);

        emit GameStarted(msg.sender, block.timestamp);
        emit EntryFeePaid(msg.sender, msg.value);
        return playerCurrentCheckpoint[msg.sender];
    }

    // Function to add a new segment of obstacles to the chain with checkpoint ownership
    function addSegment(uint256[] memory obstacleIds)
        noSuccessiveCheckpoints()
        onlyDuringSession()
        public
    {
        require(
            obstacleIds.length == 50,
            "Incorrect number of obstacle IDs provided."
        );
        require(playerCurrentCheckpoint[msg.sender] == checkpointCounter, "Player didn't reach the final check point yet!");

        for (uint256 i = 0; i < obstacleIds.length; i += 5) {
            uint256[] memory row = new uint256[](5);
            for (uint256 j = 0; j < 5; j++) {
                row[j] = obstacleIds[i + j];
            }
            _addRow(row);
        }

        // Assign checkpoint ownership
        checkpointNumberOwner[checkpointCounter] = msg.sender;
        senderCheckpointNumbers[msg.sender].push(checkpointCounter);
        currentLatestCheckpointOwner = msg.sender;
        checkpointCounter++;

        emit CheckpointCreated(msg.sender, checkpointCounter);
    }

    // Internal function to add a row of obstacles to the chain's obstacle list
    function _addRow(uint256[] memory obstacleIds) internal {
        for (uint256 i = 0; i < obstacleIds.length; i++) {
            _addObstacle(obstacleIds[i]);
        }
    }

    // Internal function to add a single obstacle to the list for a chain
    function _addObstacle(uint256 obstacleId) internal {
        chainObstacles.push(obstacleId);
    }

    // Function to allow players to view obstacles (requires view call authentication)
    function getObstaclesInRow(uint256 rowIndex)
        public
        view
        onlyDuringSession
        returns (uint256[] memory)
    {
        require(rowIndex < getRowCount(), "Row index out of bounds");
        uint256[] memory obstaclesInRow = new uint256[](COLUMNS);
        for (uint256 i = 0; i < COLUMNS; i++) {
            uint256 index = rowIndex * COLUMNS + i;
            if (index < chainObstacles.length) {
                obstaclesInRow[i] = chainObstacles[index];
            } else {
               revert InvalidRow();
            }
        }
        return obstaclesInRow;
    }

    // Function to update the player's current checkpoint
    function updatePlayerCheckpoint(address player, uint256 checkpointNumber)
        external
        onlyOwner
    {
        require(checkpointNumber <= checkpointCounter, "Invalid checkpoint number");
        require(playerCurrentCheckpoint[player] == checkpointNumber - 1, "Checkpoints mismatch");
        require(checkpointCounter > 0, "No checkpoints created yet!");

        playerCurrentCheckpoint[player] = checkpointNumber;
        emit PlayerCheckpointUpdated(player, checkpointNumber);
    }

    // Function to get the number of rows of obstacles stored for a chain
    function getRowCount() public view returns (uint256) {
        uint256 length = chainObstacles.length;
        return (length + COLUMNS - 1) / COLUMNS;
    }

    // Function to end the game session for a player
    function endGame() public onlyDuringSession() returns(bool) {
        activeSessions[msg.sender] = false;
        emit GameEnded(msg.sender, block.timestamp); // Emit event when a game session ends
        return true;
    }

     // Function to get the game state for a player
    function getGameState(address player)
        public
        view
        returns (
            bool isActive,
            uint256 timeRemaining
        )
    {
        isActive = activeSessions[player];
        if (isActive) {
            uint256 elapsedTime = block.timestamp - sessionStartTime[player];
            if (elapsedTime < SESSION_DURATION) {
                timeRemaining = SESSION_DURATION - elapsedTime;
            } else {
                timeRemaining = 0;
            }
        } else {
            timeRemaining = 0;
        }
    }

    function setEntryFee(uint256 newFee) external onlyOwner {
        ENTRY_FEE = newFee;
    }

    // New function to update SESSION_DURATION
    function setSessionDuration(uint256 newDuration) external onlyOwner {
        SESSION_DURATION = newDuration;
    }

 /*   // Function to add a new owner to the contract
    function addOwner(address newOwner) public onlyCheckpointOwner {
        owners[newOwner] = true;
    }

    // Function to remove an owner from the contract (cannot remove oneself)
    function removeOwner(address ownerToRemove) public onlyCheckpointOwner {
        require(msg.sender != ownerToRemove, "Cannot remove self as owner");
        owners[ownerToRemove] = false;
    }
*/
}
