// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PackageShipping {
    struct Package {
        address sender;
        address recipient;
        uint weight;
        uint shippingCost;
        string status;
    }

    mapping(bytes32 => Package) packages;

    event PackageCreated(bytes32 packageId, address sender, address recipient, uint weight, uint shippingCost, string status);
    event PackageUpdated(bytes32 packageId, string status);

    function createPackage(bytes32 packageId, address recipient, uint weight, uint shippingCost, string memory status) public {
        packages[packageId] = Package(msg.sender, recipient, weight, shippingCost, status);
        emit PackageCreated(packageId, msg.sender, recipient, weight, shippingCost, status);
    }

    function updatePackageStatus(bytes32 packageId, string memory status) public {
        packages[packageId].status = status;
        emit PackageUpdated(packageId, status);
    }

    function getPackageInfo(bytes32 packageId) public view returns (address, address, uint, uint, string memory) {
        Package memory package = packages[packageId];
        return (package.sender, package.recipient, package.weight, package.shippingCost, package.status);
    }

    function generateQRCode(bytes32 packageId) public view returns (string memory) {
        string memory url = string(abi.encodePacked(
            "https://mycontract.com/updatePackageStatus?packageId=",packageId, "&status=Delivered"
        ));

        return url;
    }
}
