import { useState } from "react";
import { ether } from "ethers";
import Shipping from "./utils/Shipping.json";

function PackageDetails({ packageId }) {
  const [packageData, setPackageData] = useState(null);

  async function getPackageDetails() {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("No ETH wallet connected!");
        return;
      }

      
      const provider = new ether.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const shippingContract = new ether.Contract(
                "0xe6D11B4fC069cC80D5B7dF196aC428C385CF1d69",
        Shipping.abi,
        signer
      );

      const packageDetails = await shippingContract.getPackageById(packageId);
      setPackageData(packageDetails);
    } catch (error) {
      console.log(error);
    }
  }

  if (!packageData) {
    return (
      <div>
        <p>Loading package details...</p>
        <button onClick={getPackageDetails}  style={{ 
    fontSize: '1.2em', // increase font size by 50%
    backgroundColor: 'azure', // set background color to azure
    color: 'black', // set font color to white for better visibility
    padding: '0.5em', // add some padding for better spacing
    borderRadius: '5px', // add some border radius for better aesthetics
  }}>Get Package Details</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Package {packageId} Details</h2>
      <ul>
        <li>Name: {packageData.name}</li>
        <li>Email: {packageData.email}</li>
        <li>Receiving Address: {packageData.receiving_address}</li>
        <li>Phone: {packageData.phone}</li>
        <li>Weight: {packageData.weight}</li>
        <li>Package Type: {packageData.packageType}</li>
        <li>Price: {packageData.price}</li>
        <li>Description: {packageData.description}</li>
        <li>Location: {packageData.location}</li>
        <li>Destination: {packageData.destination}</li>
        <li>Status: {packageData.status}</li>
      </ul>
    </div>
  );
}

export default PackageDetails;
