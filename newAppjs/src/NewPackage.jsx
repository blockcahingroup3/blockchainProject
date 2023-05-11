import React, { useState } from "react";
import Web3 from "web3";
import abi from "./utils/Shipping.json";


function NewPackage({ currentAccount }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    packageWeight: "",
    packageType: "",
    packagePrice: "",
    packageDescription: "",
    packageImage: "",
    packageLocation: "",
    packageDestination: "",
  });

  const contractAddress = "0xe6D11B4fC069cC80D5B7dF196aC428C385CF1d69";
  const contractABI = abi.abi;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  const createPackage = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Need an ETH wallet to connect to!");
        return;
      }

      const web3 = new Web3(ethereum);

      const shippingContract = new web3.eth.Contract(contractABI, contractAddress);

      const packageTxn = await shippingContract.methods.createPackage(
        formData.name,
        formData.email,
        formData.address,
        formData.phone,
        formData.packageWeight,
        formData.packageType,
        formData.packagePrice,
        formData.packageDescription,
        formData.packageLocation,
        formData.packageDestination
      ).send({ from: currentAccount });

      //show package info
      console.log(packageTxn);
      

      console.log("Mining...", packageTxn.hash);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <p>Fill out this form</p>
      <table>
        <tbody>
          <tr>
            <th>Name:</th>
            <td><input type="text" name="name" value={formData.name} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Email:</th>
            <td><input type="text" name="email" value={formData.email} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Address:</th>
            <td><input type="text" name="address" value={formData.address} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Phone:</th>
            <td><input type="text" name="phone" value={formData.phone} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Package Weight:</th>
            <td><input type="text" name="packageWeight" value={formData.packageWeight} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Package Type:</th>
            <td><input type="text" name="packageType" value={formData.packageType} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Package Price:</th>
            <td><input type="text" name="packagePrice" value={formData.packagePrice} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>Package Description:</th>
            <td><input type="text" name="packageDescription" value={formData.packageDescription} onChange={handleChange} /></td>
            </tr>
            <tr>
            <th>Package Image:</th>
            <td><input type="file" name="packageImage" onChange={handleFileUpload} /></td>
            </tr>
            <tr>
            <th>Package Location:</th>
            <td><input type="text" name="packageLocation" value={formData.packageLocation} onChange={handleChange} /></td>
            </tr>
            <tr>
            <th>Package Destination:</th>
            <td><input type="text" name="packageDestination" value={formData.packageDestination} onChange={handleChange} /></td>
            </tr>
        </tbody>
        </table>
        <button onClick={createPackage}>Create Package</button>
    </div>
    );
}

export default NewPackage;
