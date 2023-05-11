import React, { useState } from "react";
import Web3 from "web3";



function WalletConnect({ onConnect }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("No ETH wallet detected!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log(`Connected to wallet: ${account}`);
        onConnect(account); 
        setIsWalletConnected(true); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!isWalletConnected ? (
        <button onClick={handleConnectWallet}  style={{ 
          fontSize: '1.3em', // increase font size by 30%
          backgroundColor: 'azure', // set background color to azure
          color: 'black', // set font color to white for better visibility  
          padding: '0.5em', // add some padding for better spacing
          borderRadius: '5px', // add some border radius for better aesthetics
        }}
      >Connect Wallet</button>
      ) : (
        <p>Wallet Connected</p>
      )}
    </div>
  );
}

export default WalletConnect;

