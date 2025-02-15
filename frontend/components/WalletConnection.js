import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

export default function WalletConnection({ onConnect }) {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      setWalletConnected(true);
      onConnect(signer);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
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
        <p className="text-green-500 text-center">Wallet Connected!</p>
      )}
    </div>
  );
} 