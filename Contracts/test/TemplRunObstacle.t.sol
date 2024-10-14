// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import "../contracts/TempleRunObstacle.sol";

contract FastlaneTest is Test {
    Fastlane public fastlane;
    address public deployer;
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

function testAddSegmentMultipleTimes() public {
    // Setup initial game state
    uint256[] memory initialObstacles = new uint256[](50);
    for (uint256 i = 0; i < 50; i++) {
        initialObstacles[i] = i + 1;
    }

    // Create 2 initial checkpoints
    for (uint256 i = 0; i < 2; i++) {
        address checkpointCreator = vm.addr(i + 3);
        vm.deal(checkpointCreator, 2 ether);
        
        vm.prank(checkpointCreator);
        fastlane.startGame{value: 1 ether}();
        
        vm.prank(fastlane.owner());
        fastlane.updatePlayerCheckpoint(checkpointCreator, fastlane.checkpointCounter());
        
        vm.prank(checkpointCreator);
        fastlane.addSegment(initialObstacles);
        
        vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);
    }

    uint256 initialCheckpointCount = fastlane.checkpointCounter();
    assertEq(initialCheckpointCount, 2, "Should have 2 initial checkpoints");

    // Test for first user (player1)
    vm.deal(player1, 5 ether);
    vm.startPrank(player1);
    fastlane.startGame{value: 1 ether}();

    // Simulate crossing all checkpoints for player1
    for (uint256 i = 1; i <= initialCheckpointCount; i++) {
        vm.stopPrank();
        vm.prank(fastlane.owner());
        fastlane.updatePlayerCheckpoint(player1, i);
        
        vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);
        vm.startPrank(player1);
        if (i < initialCheckpointCount) {
            fastlane.startGame{value: 1 ether}();
        }
    }

    // Add new segment (3rd checkpoint) for player1
    uint256[] memory newObstacles1 = new uint256[](50);
    for (uint256 i = 0; i < 50; i++) {
        newObstacles1[i] = i + 101;
    }
    fastlane.addSegment(newObstacles1);
    vm.stopPrank();

    assertEq(fastlane.checkpointCounter(), initialCheckpointCount + 1, "Should have added one new checkpoint for player1");

    // Test for second user (player2)
    vm.deal(player2, 5 ether);
    vm.startPrank(player2);
    fastlane.startGame{value: 1 ether}();

    // Simulate crossing all checkpoints for player2
    for (uint256 i = 1; i <= fastlane.checkpointCounter(); i++) {
        vm.stopPrank();
        vm.prank(fastlane.owner());
        fastlane.updatePlayerCheckpoint(player2, i);
        
        vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);
        vm.startPrank(player2);
        if (i < fastlane.checkpointCounter()) {
            fastlane.startGame{value: 1 ether}();
        }
    }

    // Add new segment (4th checkpoint) for player2
    uint256[] memory newObstacles2 = new uint256[](50);
    for (uint256 i = 0; i < 50; i++) {
        newObstacles2[i] = i + 201;
    }
    fastlane.addSegment(newObstacles2);
    vm.stopPrank();

    assertEq(fastlane.checkpointCounter(), initialCheckpointCount + 2, "Should have added two new checkpoints in total");

    // Verify the new obstacles for both players
    vm.prank(player1);
    uint256[] memory obstacles1 = fastlane.getObstaclesInRow(20); // 3rd checkpoint starts at row 20
    assertEq(obstacles1[0], 101, "First obstacle of player1's new checkpoint should be 101");

    vm.prank(player2);
    uint256[] memory obstacles2 = fastlane.getObstaclesInRow(30); // 4th checkpoint starts at row 30
    assertEq(obstacles2[0], 201, "First obstacle of player2's new checkpoint should be 201");
}

function testSuccessiveCheckPoints() public {
    addInitialCheckpoint();

    uint256[] memory obstacleIds = new uint256[](50);
    for (uint256 i = 0; i < 50; i++) {
        obstacleIds[i] = i + 51;
    }

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
    console.log('player2Checkpoint:  ,',fastlane.checkpointNumberOwner(0));
    console.log(player2);
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);

    vm.prank(player2);
    fastlane.endGame();

    assertFalse(fastlane.activeSessions(player2));
    assertEq(fastlane.checkpointNumberOwner(player2Checkpoint), player2);
}

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