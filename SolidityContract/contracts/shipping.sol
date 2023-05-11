// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Shipping {
    struct Package {
        string name;
        string email;
        string receiving_address;
        string phone;
        uint256 weight;
        string packageType;
        uint256 price;
        string description;
        string location;
        string destination;
        string image;
        string status;
    }
    
    mapping(uint256 => Package) public packages;
    uint256 public packageCount = 0;
    
    event PackageCreated(
        uint256 indexed id,
        string name,
        string email,
        string receiving_address,
        string phone,
        uint256 weight,
        string packageType,
        uint256 price,
        string description,
        string location,
        string destination,
        string image,
        string status
    );

    event PackageStatusUpdated(
        uint256 indexed id,
        string status
    );
    
    function createPackage(
        string memory _name,
        string memory _email,
        string memory _receiving_address,
        string memory _phone,
        uint256 _weight,
        string memory _packageType,
        uint256 _price,
        string memory _description,
        string memory _location,
        string memory _destination,
        string memory _image
    ) public {
        packageCount++;
        packages[packageCount] = Package(
            _name,
            _email,
            _receiving_address,
            _phone,
            _weight,
            _packageType,
            _price,
            _description,
            _location,
            _destination,
            _image,
            "pending"
        );
        
        emit PackageCreated(
            packageCount,
            _name,
            _email,
            _receiving_address,
            _phone,
            _weight,
            _packageType,
            _price,
            _description,
            _location,
            _destination,
            _image,
            "pending"
        );
    }
    
    function updatePackageStatus(uint256 _id, string memory _status) public {
        require(_id <= packageCount, "Package does not exist");
        Package storage package = packages[_id];
        package.status = _status;
        emit PackageStatusUpdated(_id, _status);
    }

    function getPackageById(uint256 _id) public view returns (Package memory) {
    require(_id <= packageCount, "Package does not exist");
    return packages[_id];
}

}
