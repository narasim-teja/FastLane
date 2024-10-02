// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../contracts/TempleRunObstacle.sol";

contract FastlaneTest is Test {
    Fastlane public fastlane;
    address public owner;
    address public player1;
    address public player2;

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
}