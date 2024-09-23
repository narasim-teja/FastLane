### 1. Compile the Smart Contract

To compile the Minesweeper smart contract, run:

```bash
bun hardhat compile
```

This will compile the Solidity contract and generate the necessary ABI files.

### 2. Deploy the Smart Contract

To deploy the contract to the Oasis Sapphire testnet, use the following command:

```bash
bun hardhat run "Path"/scripts/deploy.js --network sapphire-testnet
```

After successful deployment, the console will output the contract address. Copy this address and update your `.env` file:

### 3. Interacting with the Contract

Now that your contract is deployed, you can start interacting with it using various scripts.

#### 3.1 Start a Game

To start a new game, run the `startGame.ts` script:

```bash
bun hardhat run "Path"/scripts/startGame.js --network sapphire-testnet
```

#### 3.2 Get Game State

To start a new game, run the `getGameState.ts` script:

```bash
bun hardhat run "Path"/scripts/getGameState.js --network sapphire-testnet
```
