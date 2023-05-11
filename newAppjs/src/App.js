import "./App.css";
import React, { useEffect, useState } from "react";
import WalletConnect from "./Login";
import NewPackage from "./NewPackage";
import PackageDetails from "./PackageInfo";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoggedIn, setIsWalletConnected] = useState(false);
  const [showNewPackage, setShowNewPackage] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const packageIds = [1, 2, 3]; // Replace with your package IDs

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("No ETH wallet connected!");
        return;
      } else {
        console.log("ETH detected", ethereum);
      }

      // Pulls array of accounts
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        setIsWalletConnected(true); // Update the state to indicate that the wallet is connected
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Allows to connect an auth'd wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Need an ETH wallet to connect to!");
        return;
      }

      // Makes request to connect to ETH account (Metamask wallet)
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);

      // Set the currAccount state within this component to know the address of the account
      setCurrentAccount(accounts[0]);
      setIsWalletConnected(true); // Update the state to indicate that the wallet is connected
    } catch (error) {
      console.log(error);
    }
  };

  function handleNewPackageClick() {
    setShowNewPackage(true);
  }

  function handlePackageDetailsClick(packageId) {
    setSelectedPackageId(packageId);
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shipping DApp</h1>
        <p>Connect your wallet to get started!</p>
        {isLoggedIn ? (
          <div>
            <p>Wallet address: {currentAccount}</p>

            <button onClick={handleNewPackageClick}  style={{ 
    fontSize: '1.2em', // increase font size by 50%
    backgroundColor: 'azure', // set background color to azure
    color: 'black', // set font color to white for better visibility
    padding: '0.5em', // add some padding for better spacing
    borderRadius: '5px', // add some border radius for better aesthetics
  }}>New Package</button>
            {showNewPackage && <NewPackage />}
          </div>
        ) : (
          <WalletConnect connectWallet={connectWallet} />
        )}
        <div>
          <h1>Package Information</h1>
          {packageIds.map((packageId) => {
            return (
              <button key={packageId} onClick={() => handlePackageDetailsClick(packageId)}
              style={{ 
                fontSize: '1.2em', // increase font size by 50%
                backgroundColor: 'azure', // set background color to azure
                color: 'black', // set font color to white for better visibility
                padding: '0.5em', // add some padding for better spacing
                borderRadius: '5px', // add some border radius for better aesthetics
              }}>
                Package {packageId}
              </button>
            );
          })}
          {selectedPackageId && <PackageDetails packageId={selectedPackageId} />}
        </div>
      </header>
    </div>
  );
}

export default App;

