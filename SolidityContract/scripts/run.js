const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const shippingContractFactory = await hre.ethers.getContractFactory("Shipping");
  const shippingContract = await shippingContractFactory.deploy();
  await shippingContract.deployed();
  
  console.log("Contract deployed to:", shippingContract.address);
  console.log("Contract deployed by:", owner.address);
  
  let packageCount;
  packageCount = await shippingContract.packageCount();
  
  // User input
  const name = "John Doe";
  const email = "johndoe@example.com";
  const receivingAddress = "123 Main St, Anytown, USA";
  const phone = "123-456-7890";
  const weight = 10;
  const packageType = "Box";
  const price = 50;
  const description = "A package for testing";
  const location = "Baltimore, MD";
  const destination = "Los Angeles, CA";
  const image = "https://example.com/package_image.jpg";

  let packageTxn = await shippingContract.createPackage(
    name,
    email,
    receivingAddress,
    phone,
    weight,
    packageType,
    price,
    description,
    location,
    destination,
    image
  );

  await packageTxn.wait();
  packageCount = await shippingContract.packageCount();
  console.log("Package created with ID:", packageCount);

  // Get package by ID
  const packageId = 1; // change this to the ID of the package you want to retrieve
  const packageInfo = await shippingContract.getPackageById(packageId);
  console.log("Package information for package ID:", packageId);
  console.log(packageInfo);

  packageTxn = await shippingContract.updatePackageStatus(1, "shipped");
  await packageTxn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

