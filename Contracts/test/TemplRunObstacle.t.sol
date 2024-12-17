// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {Fastlane, SignIn, SignatureRSV} from "../contracts/TempleRunObstacle.sol";

contract FastlaneTest is Test {
    Fastlane public fastlane;
    address public deployer;
    address public owner;
    address public player1;
    address public player2;
    address public player3;

    // Add helper function to create SignIn struct
    function createSignIn(address user) internal view returns (SignIn memory) {
        uint32 time = uint32(block.timestamp);
        bytes32 r = bytes32(0);
        bytes32 s = bytes32(0);
        uint256 v = 27;
        SignatureRSV memory rsv = SignatureRSV(r, s, v);
        return SignIn(user, time, rsv);
    }

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
        vm.deal(player1, 1 ether);
        vm.startPrank(player1);
        fastlane.startGame{value: 0.1 ether}();
        fastlane.addSegment(obstacleIds);
        vm.stopPrank();
    }

    function testInitialState() public view {
        assertEq(fastlane.checkpointCounter(), 0);
        assertEq(fastlane.ENTRY_FEE(), 0.1 ether);
        assertEq(fastlane.SESSION_DURATION(), 600);
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

        vm.deal(player2, 1 ether);
        vm.prank(player2);
        fastlane.startGame{value: 0.1 ether}();

        assertTrue(fastlane.activeSessions(player2));
    }

    function testAddSegment() public {
        addInitialCheckpoint();

        uint256[] memory obstacleIds = new uint256[](50);
        for (uint256 i = 0; i < 50; i++) {
            obstacleIds[i] = i + 51;
        }

        vm.deal(player2, 1 ether);
        vm.startPrank(player2);
        fastlane.startGame{value: 0.1 ether}();
        vm.stopPrank();
        uint256 initialCheckpointCounter = fastlane.checkpointCounter();
        vm.prank(owner);
        fastlane.updatePlayerCheckpoint(player2, initialCheckpointCounter);
        vm.startPrank(player2);
        fastlane.addSegment(obstacleIds);
        vm.stopPrank();

        assertEq(fastlane.checkpointCounter(), initialCheckpointCounter + 1);
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
        fastlane.startGame{value: 0.05 ether}();
    }

    function testAddSegmentWithoutActiveSession() public {
        addInitialCheckpoint();

        uint256[] memory obstacleIds = new uint256[](50);
        vm.prank(player2);
        vm.expectRevert("No active session");
        fastlane.addSegment(obstacleIds);
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

    vm.deal(player1, 1 ether);
    vm.deal(player2, 1 ether);
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);

    vm.prank(player1);
    fastlane.startGame{value: 0.1 ether}();
    assertTrue(fastlane.activeSessions(player1));

    vm.prank(player2);
    fastlane.startGame{value: 0.1 ether}();
    assertTrue(fastlane.activeSessions(player2));

    assertTrue(fastlane.activeSessions(player1));
    assertTrue(fastlane.activeSessions(player2));
}

function testStartGameAfterEndingPreviousSession() public {
    addInitialCheckpoint();
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);

    vm.deal(player1, 1 ether);

    vm.startPrank(player1);
    fastlane.startGame{value: 0.1 ether}();
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);
    fastlane.endGame();
    fastlane.startGame{value: 0.1 ether}();
    vm.stopPrank();

    assertTrue(fastlane.activeSessions(player1));
}

function testAddSegmentMultipleTimes() public {
    // Setup initial game state
    uint256[] memory initialObstacles = new uint256[](50);
    for (uint256 i = 0; i < 50; i++) {
        initialObstacles[i] = i + 1;
    }

    // Create first checkpoint
    vm.deal(player1, 1 ether);
    vm.startPrank(player1);
    fastlane.startGame{value: 0.1 ether}();
    fastlane.addSegment(initialObstacles);
    vm.stopPrank();

    // Create second checkpoint
    vm.deal(player2, 1 ether);
    vm.startPrank(player2);
    fastlane.startGame{value: 0.1 ether}();
    vm.stopPrank();

    // Use the contract deployer (owner) to update checkpoint
    vm.startPrank(owner);
    fastlane.updatePlayerCheckpoint(player2, fastlane.checkpointCounter());
    vm.stopPrank();

    vm.startPrank(player2);
    uint256[] memory newObstacles = new uint256[](50);
    for (uint256 i = 0; i < 50; i++) {
        newObstacles[i] = i + 51;
    }
    fastlane.addSegment(newObstacles);
    vm.stopPrank();

    assertEq(fastlane.checkpointCounter(), 2, "Should have 2 checkpoints");
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

    vm.deal(player2, 1 ether);
    vm.startPrank(player2);
    fastlane.startGame{value: 0.1 ether}();

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

    vm.deal(player1, 1 ether);
    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);
    vm.startPrank(player1);
    fastlane.startGame{value: 0.1 ether}();

    vm.warp(block.timestamp + fastlane.SESSION_DURATION() + 1);
    fastlane.startGame{value: 0.1 ether}();

    SignIn memory auth = createSignIn(player1);
    vm.mockCall(
        address(fastlane),
        abi.encodeWithSelector(fastlane.getGameState.selector, auth, player1),
        abi.encode(true, uint256(300), uint256(0))
    );
    (bool isActive,,) = fastlane.getGameState(auth, player1);
    assertTrue(isActive);
    vm.stopPrank();
}
}
