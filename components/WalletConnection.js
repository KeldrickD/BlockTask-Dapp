import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

export default function WalletConnection() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, TASK_ABI, signer);
    const balance = await contract.taskToken.balanceOf(await signer.getAddress());
    setTokenBalance(ethers.utils.formatUnits(balance, 18));
    setWalletConnected(true);
  };

  return (
    <div className="mb-6">
      {!walletConnected ? (
        <button
          onClick={connectWallet}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-green-500 text-center">
          Wallet Connected! Balance: {tokenBalance} TASK
        </p>
      )}
    </div>
  );
}