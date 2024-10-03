// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import "../contracts/TempleRunObstacle.sol";

contract FastlaneTest is Test {
    Fastlane public fastlane;
    address public owner;
    address public player1;
    address public player2;
    address public player3;

    function setUp() public {
        owner = vm.addr(1);
        player1 = vm.addr(2);
        player2 = vm.addr(3);
        vm.prank(owner);
        fastlane = new Fastlane();
    }

    function addInitialCheckpoint() internal {
        uint256[] memory obstacleIds = new uint256[](50);
        for (uint256 i = 0; i < 50; i++) {
            obstacleIds[i] = i + 1;
        }
        vm.deal(player1, 2 ether);
        vm.startPrank(player1);
        fastlane.startGame{value: 1 ether}();
        fastlane.addSegment(obstacleIds);
        vm.stopPrank();
    }

    function testInitialState() public {
        assertEq(fastlane.checkpointCounter(), 0);
        assertEq(fastlane.ENTRY_FEE(), 1 ether);
        assertEq(fastlane.SESSION_DURATION(), 1200);
        assertEq(fastlane.owner(), owner);
    }

    function testSetEntryFee() public {
        vm.prank(owner);
        fastlane.setEntryFee(2 ether);
        assertEq(fastlane.ENTRY_FEE(), 2 ether);
    }

    function testSetSessionDuration() public {
        vm.prank(owner);
        fastlane.setSessionDuration(1800);
        assertEq(fastlane.SESSION_DURATION(), 1800);
    }

    function testStartGame() public {
        addInitialCheckpoint();

        vm.deal(player2, 2 ether);
        vm.prank(player2);
        fastlane.startGame{value: 1 ether}();
        
        assertTrue(fastlane.activeSessions(player2));
    }

    function testAddSegment() public {
        addInitialCheckpoint();

        uint256[] memory obstacleIds = new uint256[](50);
        for (uint256 i = 0; i < 50; i++) {
            obstacleIds[i] = i + 51;
        }
        
        vm.deal(player2, 2 ether);
        vm.startPrank(player2);
        fastlane.startGame{value: 1 ether}();
        vm.stopPrank();
        uint256 initialCheckpointCounter = fastlane.checkpointCounter();
        vm.prank(owner);
        fastlane.updatePlayerCheckpoint(player2, initialCheckpointCounter);
        vm.startPrank(player2);
        fastlane.addSegment(obstacleIds);
        vm.stopPrank();
        
        assertEq(fastlane.checkpointCounter(), initialCheckpointCounter + 1);
    }

    function testGetObstaclesInRow() public {
        addInitialCheckpoint();

        vm.prank(player1);
        uint256[] memory obstacles = fastlane.getObstaclesInRow(0);

        assertEq(obstacles.length, 5);
        assertEq(obstacles[0], 1);
        assertEq(obstacles[4], 5);
    }

    function testUpdatePlayerCheckpoint() public {
        addInitialCheckpoint();

        vm.prank(owner);
        fastlane.updatePlayerCheckpoint(player1, 1);
        assertEq(fastlane.playerCurrentCheckpoint(player1), 1);
    }

    function testGetRowCount() public {
        addInitialCheckpoint();

        assertEq(fastlane.getRowCount(), 10);
    }

    function testEndGame() public {
        addInitialCheckpoint();

        vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);

        vm.prank(player1);
        bool result = fastlane.endGame();

        assertTrue(result);
        assertFalse(fastlane.activeSessions(player1));
    }

    function testGetGameState() public {
        addInitialCheckpoint();

        (bool isActive, uint256 timeRemaining) = fastlane.getGameState(player1);
        assertTrue(isActive);
        assertGt(timeRemaining, 0);
    }

    function testFailStartGameWithoutCheckpoint() public {
        vm.deal(player1, 2 ether);
        vm.prank(player1);
        vm.expectRevert("No checkpoints created yet!");
        fastlane.startGame{value: 1 ether}();
    }

    function testFailStartGameWithoutSufficientFunds() public {
        addInitialCheckpoint();

        vm.prank(player2);
        vm.expectRevert("Incorrect entry fee");
        fastlane.startGame{value: 0.5 ether}();
    }

    function testAddSegmentWithoutActiveSession() public {
        addInitialCheckpoint();

        uint256[] memory obstacleIds = new uint256[](50);
        vm.prank(player2);
        vm.expectRevert("No active session");
        fastlane.addSegment(obstacleIds);
    }

    function testGetObstaclesInRowOutOfBounds() public {
        addInitialCheckpoint();

        vm.prank(player1);
        vm.expectRevert("Row index out of bounds");
        fastlane.getObstaclesInRow(10);
    }

    function testFailUpdatePlayerCheckpointNonOwner() public {
        vm.prank(player1);
        vm.expectRevert("Ownable: caller is not the owner");
        fastlane.updatePlayerCheckpoint(player2, 1);
    }

    function testEndGameWithoutActiveSession() public {
        vm.prank(player1);
        vm.expectRevert("No active session");
        fastlane.endGame();
    }

    //more sophisticated tests:


    // Add these new test functions to your existing FastlaneTest contract

function testStartGameMultiplePlayers() public {
    addInitialCheckpoint();

    vm.deal(player1, 3 ether);
    vm.deal(player2, 3 ether);
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);

    vm.prank(player1);
    fastlane.startGame{value: 1 ether}();
    assertTrue(fastlane.activeSessions(player1));

    vm.prank(player2);
    fastlane.startGame{value: 1 ether}();
    assertTrue(fastlane.activeSessions(player2));

    (bool isActivePlayer1, ) = fastlane.getGameState(player1);
    (bool isActivePlayer2, ) = fastlane.getGameState(player2);
    assertTrue(isActivePlayer1);
    assertTrue(isActivePlayer2);
}

function testStartGameAfterEndingPreviousSession() public {
    addInitialCheckpoint();
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);

    vm.deal(player1, 3 ether);

    vm.startPrank(player1);
    fastlane.startGame{value: 1 ether}();
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);
    fastlane.endGame();
    fastlane.startGame{value: 1 ether}();
    vm.stopPrank();

    assertTrue(fastlane.activeSessions(player1));
}

//There is a problem when there are only 2 checkpoints
function testAddSegmentMultipleTimes() public {
    // Add initial checkpoints
    for (uint256 i = 0; i < 4; i++) {
        addCheckpoint(vm.addr(i+3));
    }

    uint256 initialCheckpointCounter = fastlane.checkpointCounter();
    assertEq(initialCheckpointCounter, 4, "Should have 4 initial checkpoints");

    address player = vm.addr(7);
    vm.deal(player, 5 ether);

    vm.startPrank(player);
    fastlane.startGame{value: 1 ether}();
    vm.stopPrank();

    // Player needs to cross all existing checkpoints
    for (uint256 i = 1; i <= initialCheckpointCounter; i++) {
        vm.prank(owner);
        fastlane.updatePlayerCheckpoint(player, i);
        
        // Simulate session expiry and start a new game for each checkpoint
        vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);
        vm.prank(player);
        fastlane.startGame{value: 1 ether}();
    }

    // Now player should be able to add a new segment (5th checkpoint)
    uint256[] memory obstacleIds = new uint256[](50);
    for (uint256 i = 0; i < 50; i++) {
        obstacleIds[i] = i + 201;
    }
    vm.prank(player);
    fastlane.addSegment(obstacleIds);

    assertEq(fastlane.checkpointCounter(), initialCheckpointCounter + 1, "Should have added one new checkpoint");

    // Verify the new obstacles
    vm.prank(player);
    uint256[] memory obstacles = fastlane.getObstaclesInRow(40); // 8 rows per checkpoint, so 5th checkpoint starts at row 40
    assertEq(obstacles[0], 201, "First obstacle of new checkpoint should be 201");
}

function addCheckpoint(address checkpointCreator) internal {
    vm.deal(checkpointCreator, 2 ether);
    vm.prank(checkpointCreator);
    fastlane.startGame{value: 1 ether}();
    
    uint256[] memory obstacleIds = new uint256[](50);
    for (uint256 i = 0; i < 50; i++) {
        obstacleIds[i] = i + 1 + (fastlane.checkpointCounter() * 50);
    }
    
    vm.prank(owner);
    fastlane.updatePlayerCheckpoint(checkpointCreator, fastlane.checkpointCounter());
    
    vm.prank(checkpointCreator);
    fastlane.addSegment(obstacleIds);

    // Simulate session expiry
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);
}

function testSuccessiveCheckPoints() public {
    addInitialCheckpoint();

    uint256[] memory obstacleIds = new uint256[](50);
    for (uint256 i = 0; i < 50; i++) {
        obstacleIds[i] = i + 51;
    }

    //vm.deal(player1, 3 ether);
    //vm.startPrank(player1);
    //fastlane.startGame{value: 1 ether}();
    //vm.stopPrank();

    vm.prank(owner);
    fastlane.updatePlayerCheckpoint(player1, 1);

    vm.prank(player1);
    vm.expectRevert("Cannot create two successive checkpoints");
    fastlane.addSegment(obstacleIds);
}

function testAddSegmentAfterSessionExpiry() public {
    addInitialCheckpoint();

    uint256[] memory obstacleIds = new uint256[](50);
    for (uint256 i = 0; i < 50; i++) {
        obstacleIds[i] = i + 51;
    }

   vm.prank(owner);
    fastlane.updatePlayerCheckpoint(player1, 1);
    console.log('blocktimestaml1:  ',block.timestamp);

    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);
    console.log('blocktimestaml2:  ',block.timestamp);

    vm.prank(player1);
    vm.expectRevert("Session has expired");
    fastlane.addSegment(obstacleIds);
}

/*
function testEndGameAndCheckpointOwnership() public {
    addInitialCheckpoint();

    vm.deal(player2, 3 ether);
    vm.startPrank(player2);
    fastlane.startGame{value: 1 ether}();

    uint256[] memory obstacleIds = new uint256[](50);
    for (uint256 i = 0; i < 50; i++) {
        obstacleIds[i] = i + 51;
    }

    vm.stopPrank();

    vm.prank(owner);
    fastlane.updatePlayerCheckpoint(player2, 1);

    vm.prank(player2);
    fastlane.addSegment(obstacleIds);

    uint256 player2Checkpoint = fastlane.checkpointCounter();
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);

    vm.prank(player2);
    fastlane.endGame();

    assertFalse(fastlane.activeSessions(player2));
    assertEq(fastlane.checkpointNumberOwner(player2Checkpoint), player2);
}
*/

function testStartGameAfterSessionExpiry() public {
    addInitialCheckpoint();

    vm.deal(player1, 3 ether);
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);
    vm.startPrank(player1);
    fastlane.startGame{value: 1 ether}();

    // Fast forward time to expire the session
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);

    // Try to start a new game
    fastlane.startGame{value: 1 ether}();

    (bool isActive, ) = fastlane.getGameState(player1);
    assertTrue(isActive);
    vm.stopPrank();
}
}