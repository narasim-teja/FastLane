const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fastlane", function () {
  let Fastlane;
  let fastlane;
  let owner;
  let player1;
  let player2;

  beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners();
    Fastlane = await ethers.getContractFactory("Fastlane");
    fastlane = await Fastlane.deploy();
    //await fastlane.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await fastlane.owner()).to.equal(owner.address);
    });

    it("Should set the correct initial values", async function () {
      expect(await fastlane.ENTRY_FEE()).to.equal(ethers.utils.parseEther("1"));
      expect(await fastlane.SESSION_DURATION()).to.equal(1200);
      expect(await fastlane.checkpointCounter()).to.equal(0);
    });
  });

  describe("Game Mechanics", function () {
    it("Should allow starting a game", async function () {
      // First, add a segment to create a checkpoint
      const obstacleIds = Array(50).fill().map((_, i) => i + 1);
      await fastlane.connect(player1).startGame({ value: ethers.utils.parseEther("1") });
      await fastlane.connect(player1).addSegment(obstacleIds);

      // Now start the game for player2
      await fastlane.connect(player2).startGame({ value: ethers.utils.parseEther("1") });
      
      const gameState = await fastlane.getGameState(player2.address);
      expect(gameState.isActive).to.be.true;
    });

    it("Should allow adding a segment", async function () {
      const obstacleIds = Array(50).fill().map((_, i) => i + 1);
      await fastlane.connect(player1).startGame({ value: ethers.utils.parseEther("1") });
      await fastlane.connect(player1).addSegment(obstacleIds);
      
      expect(await fastlane.checkpointCounter()).to.equal(1);
    });

    it("Should allow getting obstacles in a row", async function () {
      const obstacleIds = Array(50).fill().map((_, i) => i + 1);
      await fastlane.connect(player1).startGame({ value: ethers.utils.parseEther("1") });
      await fastlane.connect(player1).addSegment(obstacleIds);

      const obstacles = await fastlane.connect(player1).getObstaclesInRow(0);
      expect(obstacles.length).to.equal(5);
      expect(obstacles[0]).to.equal(1);
      expect(obstacles[4]).to.equal(5);
    });

    it("Should allow updating player checkpoint", async function () {
      await fastlane.updatePlayerCheckpoint(player1.address, 1);
      expect(await fastlane.playerCurrentCheckpoint(player1.address)).to.equal(1);
    });

    it("Should allow ending a game", async function () {
      await fastlane.connect(player1).startGame({ value: ethers.utils.parseEther("1") });
      await fastlane.connect(player1).endGame();
      
      const gameState = await fastlane.getGameState(player1.address);
      expect(gameState.isActive).to.be.false;
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to set entry fee", async function () {
      await fastlane.setEntryFee(ethers.utils.parseEther("2"));
      expect(await fastlane.ENTRY_FEE()).to.equal(ethers.utils.parseEther("2"));
    });

    it("Should allow owner to set session duration", async function () {
      await fastlane.setSessionDuration(1800);
      expect(await fastlane.SESSION_DURATION()).to.equal(1800);
    });

    it("Should not allow non-owner to set entry fee", async function () {
      await expect(fastlane.connect(player1).setEntryFee(ethers.utils.parseEther("2")))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Edge Cases", function () {
    it("Should not allow starting a game without sufficient funds", async function () {
      await expect(fastlane.connect(player1).startGame({ value: ethers.utils.parseEther("0.5") }))
        .to.be.revertedWith("Incorrect entry fee");
    });

    it("Should not allow adding segment without active session", async function () {
      const obstacleIds = Array(50).fill().map((_, i) => i + 1);
      await expect(fastlane.connect(player1).addSegment(obstacleIds))
        .to.be.revertedWith("No active session");
    });

    it("Should not allow getting obstacles from non-existent row", async function () {
      await fastlane.connect(player1).startGame({ value: ethers.utils.parseEther("1") });
      await expect(fastlane.connect(player1).getObstaclesInRow(100))
        .to.be.revertedWith("Row index out of bounds");
    });
  });
});