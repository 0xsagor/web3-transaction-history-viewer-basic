import { getProvider } from "./web3.js";

export async function connectWallet() {
  const provider = getProvider();
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
}

export async function getHistory(address) {
  const provider = getProvider();
  const blockNumber = await provider.getBlockNumber();
  const history = [];

  for (let i = blockNumber; i > blockNumber - 5; i--) {
    const block = await provider.getBlock(i);
    block.transactions.forEach(tx => {
      if (tx.from === address || tx.to === address) {
        history.push({
          hash: tx.hash,
          value: tx.value.toString()
        });
      }
    });
  }

  return history;
}
