// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OasisObstacle {
    // Mapping to keep track of the owners and obstacles for each chain
    mapping(address => bool) public owners;
    mapping(uint256 => uint256[]) public chainObstacles;
    uint256 constant COLUMNS = 5;

    // Modifier to restrict certain functions to only the owner of the contract
    modifier onlyOwner() {
        require(owners[msg.sender], "Caller is not an owner");
        _;
    }

    // Constructor sets the initial owner to the creator of the contract
    constructor() {
        owners[msg.sender] = true;
    }

    // Function to add a new segment of obstacles to the chain
    function addSegment(uint256 chainId, uint256[] memory obstacleIds) public {
    require(obstacleIds.length == 50, "Incorrect number of obstacle IDs provided."); // Ensure there are exactly 40 obstacles (8 rows * 5 columns)

    for (uint256 i = 0; i < obstacleIds.length; i += 5) {
        uint256[] memory row = new uint256[](5);
        for (uint256 j = 0; j < 5; j++) {
            row[j] = obstacleIds[i + j];
        }
        addRow(chainId, row);
    }
}


    // Helper function to add a row of obstacles to the chain's obstacle list
    function addRow(uint256 chainId, uint256[] memory obstacleIds) public {
        for (uint i = 0; i < obstacleIds.length; i++) {
            addObstacle(chainId, obstacleIds[i]);
        }
    }

    // Function to add a single obstacle to the list for a chain
    function addObstacle(uint256 chainId, uint256 obstacleId) public {
        chainObstacles[chainId].push(obstacleId);
    }

    // Function to add a new owner to the contract
    function addOwner(address newOwner) public {
        owners[newOwner] = true;
    }

    // Function to get the number of rows of obstacles stored for a chain
    function getRowCount(uint256 chainId) public view returns (uint256) {
        uint256 length = chainObstacles[chainId].length;
        return (length + COLUMNS - 1) / COLUMNS; // Rounds up to account for partial rows
    }

    // Function to remove an owner from the contract (cannot remove oneself)
    function removeOwner(address ownerToRemove) public {
        require(msg.sender != ownerToRemove, "Cannot remove self as owner");
        owners[ownerToRemove] = false;
    }

    // Function to retrieve obstacles in a specific row for a chain
    function getObstaclesInRow(uint256 chainId, uint256 rowIndex) public view onlyOwner returns (uint256[] memory) {
        require(rowIndex < getRowCount(chainId) * COLUMNS, "Row index out of bounds");
        uint256[] memory obstaclesInRow = new uint256[](COLUMNS);
        for(uint i = 0; i < COLUMNS; i++) {
            obstaclesInRow[i] = chainObstacles[chainId][rowIndex * COLUMNS + i];
        }
        return obstaclesInRow;
    }
}
