const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Solarix Contract", function () {
  it("Should withdraw funds from Solarix contract", async function () {
    this.timeout(5000);

    // Deploy Solarix contract
    const Solarix = await ethers.getContractFactory("Solarix");
    const solarix = await Solarix.deploy(
      1000, // Valeur uint256 pour _power
      800, // Valeur uint256 pour _efficiency
      100, // Valeur uint256 pour _quantity
      200, // Valeur uint256 pour _surface
      "Suntech", // Valeur string pour _manufacturer
      "STP250S-20/WdB", // Valeur string pour _model
      "0x1234567890123456789012345678901234567890" // Adresse de contrat ERC20 pour _tokenAddress
    );
    await solarix.deployed();

    // Deploy Token contract
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(100);
    await token.deployed();

    // Transfer tokens to Solarix contract
    await token.transfer(solarix.address, 50);

    // Call withdrawFunds function
    const initialBalance = await ethers.provider.getBalance(solarix.address);
    console.log("Initial balance:", initialBalance.toString());

    // Increase energy production limit
    await expect(solarix.addEnergyProduction(1000, 500)).to.be.revertedWith(
      "Production limit exceeded."
    );

    // Add energy production
    await solarix.addEnergyProduction(1, 1000);

    const finalBalance = await ethers.provider.getBalance(solarix.address);
    console.log("Final balance:", finalBalance.toString());

    // Check that balance has decreased
    expect(finalBalance).to.be.lt(initialBalance);

    // Call sellEnergy function
    const energyPrice = 100;
    const initialTokenBalance = await token.balanceOf(solarix.address);
    console.log("Initial token balance:", initialTokenBalance.toString());
    await solarix.setEnergyPrice(energyPrice);
    await solarix.sellEnergy();
    const finalTokenBalance = await token.balanceOf(solarix.address);
    console.log("Final token balance:", finalTokenBalance.toString());

    // Check that token balance has decreased
    expect(finalTokenBalance).to.be.lt(initialTokenBalance);
  });
});
