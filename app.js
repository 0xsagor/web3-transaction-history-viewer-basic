import { connectWallet, getHistory } from "./history.js";

document.getElementById("connectBtn").onclick = async () => {
  const address = await connectWallet();
  const history = await getHistory(address);

  const list = document.getElementById("list");
  list.innerHTML = "";

  history.forEach(tx => {
    const item = document.createElement("li");
    item.innerText = tx.hash + " | " + tx.value;
    list.appendChild(item);
  });
};
