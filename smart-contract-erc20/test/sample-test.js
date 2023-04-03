const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Interface IERC20", function () {
  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await Token.deploy(100);
    await token.deployed();
  });

  it("devrait retourner le bon solde du propriétaire", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(100);
  });

  it("devrait transferer des jetons correctement", async function () {
    await token.transfer(addr1.address, 50);
    const ownerBalance = await token.balanceOf(owner.address);
    const addr1Balance = await token.balanceOf(addr1.address);
    expect(ownerBalance).to.equal(50);
    expect(addr1Balance).to.equal(50);
  });

  it("devrait échouer si l'expéditeur n'a pas suffisamment de jetons", async function () {
    const initialOwnerBalance = await token.balanceOf(owner.address);
    const transferAmount = initialOwnerBalance.add(1);
    await expect(
      token.transfer(addr1.address, transferAmount)
    ).to.be.revertedWith("Balance is less than available.");
  });

  it("devrait mettre à jour les soldes après transferFrom", async function () {
    await token.approve(addr1.address, 50);
    await token.connect(addr1).transferFrom(owner.address, addr2.address, 50);
    const ownerBalance = await token.balanceOf(owner.address);
    const addr2Balance = await token.balanceOf(addr2.address);

    expect(ownerBalance).to.equal(50);
    expect(addr2Balance).to.equal(50);
  });

  it("devrait échouer si le bénéficiaire n'est pas autorisé à suffisamment de jetons", async function () {
    await token.approve(addr1.address, 49);
    await expect(
      token.connect(addr1).transferFrom(owner.address, addr2.address, 50)
    ).to.be.revertedWith("Qty is less than allowance");
  });

  it("devrait mettre à jour l'autorisation après approval", async function () {
    await token.approve(addr1.address, 50);
    expect(await token.allowance(owner.address, addr1.address)).to.equal(50);
  });

  it("devrait émettre un événement Approval lorsqu'un propriétaire approuve un délégué", async function () {
    await expect(token.approve(addr1.address, 50))
      .to.emit(token, "Approval")
      .withArgs(owner.address, addr1.address, 50);
  });

  it("devrait émettre un événement Transfer lorsqu'un propriétaire transfère des jetons", async function () {
    await expect(token.transfer(addr1.address, 50))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, 50);
  });
});

describe("Token Contract", function () {
  let Token;
  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await Token.deploy(100);
    await token.deployed();
  });

  it("should return the correct total supply", async function () {
    expect(await token.totalSupply()).to.equal(100);
  });

  it("should transfer tokens correctly", async function () {
    await token.transfer(addr1.address, 50);
    expect(await token.balanceOf(owner.address)).to.equal(50);
    expect(await token.balanceOf(addr1.address)).to.equal(50);
  });

  it("should fail if sender does not have enough tokens", async function () {
    const initialBalance = await token.balanceOf(owner.address);
    const transferAmount = initialBalance.add(1);
    await expect(
      token.transfer(addr1.address, transferAmount)
    ).to.be.revertedWith("Balance is less than available.");
  });

  it("should update balances after transferFrom", async function () {
    await token.approve(addr1.address, 50);
    await token.connect(addr1).transferFrom(owner.address, addr2.address, 50);
    expect(await token.balanceOf(owner.address)).to.equal(50);
    expect(await token.balanceOf(addr2.address)).to.equal(50);
  });

  it("should fail if spender is not allowed enough tokens", async function () {
    await token.approve(addr1.address, 49);
    await expect(
      token.connect(addr1).transferFrom(owner.address, addr2.address, 50)
    ).to.be.revertedWith("Qty is less than allowance");
  });

  it("should update allowance after approve", async function () {
    await token.approve(addr1.address, 50);
    expect(await token.allowance(owner.address, addr1.address)).to.equal(50);
  });

  it("should return the correct total supply", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(100);
    await token.deployed();
    expect(await token.totalSupply()).to.equal(100);
  });

  it("should fail if owner tries to approve themselves", async function () {
    await expect(token.approve(owner.address, 50))
      .to.emit(token, "Approval")
      .withArgs(owner.address, owner.address, 50);
  });
});

// eslint-disable-next-line node/no-extraneous-require
const { Client } = require("pg");
describe("Solarix Contract", function () {
  it("should add energy production and get all information correctly", async function () {
    this.timeout(10000);
    // Deploy Token contract
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(100);
    await token.deployed();

    // Deploy Solarix contract
    const Solarix = await ethers.getContractFactory("Solarix");
    const solarix = await Solarix.deploy(
      100, // power
      800, // efficiency
      100, // quantity
      500, // surface
      "Solar Manufacturer", // manufacturer
      "STP250S-20/WdB", // model
      token.address, // tokenAddress
      "46.2276, 2.2137" // geoLocation
    );
    await solarix.deployed();

    // Test adding energy production
    const productionToAdd = 500;
    const newProductionLimit = 200000;
    await solarix.addEnergyProduction(productionToAdd, newProductionLimit);

    // Check if energy production and production limit are updated correctly
    expect(await solarix.getEnergyProduction()).to.equal(productionToAdd);
    expect(await solarix.getProductionLimit()).to.equal(newProductionLimit);

    // Check if all other information is correct
    expect(await solarix.getPower()).to.equal(100);
    expect(await solarix.getEfficiency()).to.equal(800);
    expect(await solarix.getQuantity()).to.equal(100);
    expect(await solarix.getSurface()).to.equal(500);
    expect(await solarix.getManufacturer()).to.equal("Solar Manufacturer");
    expect(await solarix.getModel()).to.equal("STP250S-20/WdB");
    expect(await solarix.getTokenAddress()).to.equal(token.address);
    expect(await solarix.getProducer()).to.equal(
      await ethers.provider.getSigner(0).getAddress()
    );

    // Insert data into the actif table
    const client = new Client({
      user: "postgres",
      host: "localhost",
      database: "blockchain",
      password: "solarix",
      port: 5432,
    });
    await client.connect();

    const insertValuesBlocks = [
      // values for first insertion
      [
        "0x" + Math.random().toString(16).substr(2, 64), // hash
        1, // number
        "0x" + Math.random().toString(16).substr(2, 64), // parent_hash
        new Date().toISOString(), // timestamp
        Math.floor(Math.random() * 1000000), // nonce
      ],
      // values for second insertion
      [
        "0x" + Math.random().toString(16).substr(2, 64), // hash
        2, // number
        "0x" + Math.random().toString(16).substr(2, 64), // parent_hash
        new Date().toISOString(), // timestamp
        Math.floor(Math.random() * 1000000), // nonce
      ],
      // values for third insertion
      [
        "0x" + Math.random().toString(16).substr(2, 64), // hash
        3, // number
        "0x" + Math.random().toString(16).substr(2, 64), // parent_hash
        new Date().toISOString(), // timestamp
        Math.floor(Math.random() * 1000000), // nonce
      ],
    ];

    for (const values of insertValuesBlocks) {
      const res = await client.query(
        `INSERT INTO blocks (hash, number, parent_hash, timestamp, nonce)
                 VALUES ($1, $2, $3, $4, $5)`,
        values
      );
      expect(res.rowCount).to.equal(1);
    }

    const insertValuesAddress = [
      ["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"],
      ["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"],
      ["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"],
    ];

    for (const values of insertValuesAddress) {
      const res = await client.query(
        `INSERT INTO addresses (address)
                 VALUES ($1)`,
        values
      );
      expect(res.rowCount).to.equal(1);
    }

    const blockId = 1; // l'ID du block correspondant
    const addresses = ["0x123", "0x456", "0x789"]; // exemple d'adresses
    const tokens = ["ETH", "DAI", "USDC"]; // exemple de tokens
    const gasPrice = 1000000000; // gas price de base en wei
    const gasLimit = 21000; // gas limit de base
    const values = [1, 2, 3]; // valeurs à transférer

    const crypto = require("crypto");

    for (let i = 0; i < addresses.length; i++) {
      for (let j = 0; j < addresses.length; j++) {
        if (i !== j) {
          const nonce = Math.floor(Math.random() * 1000); // nonce aléatoire
          const fromAddress = addresses[i];
          const toAddress = addresses[j];
          const token = tokens[Math.floor(Math.random() * tokens.length)]; // token aléatoire
          const hash = crypto
            .createHash("sha3-256")
            .update(
              `${blockId}${nonce}${fromAddress}${toAddress}${values[i]}${token}`
            )
            .digest("hex"); // calcul du hash

          const res = await client.query(
            `INSERT INTO transactions (hash, block_id, nonce, from_address, to_address, value, gas_limit,
                                                   gas_price, input, token)
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [
              hash,
              blockId,
              nonce,
              fromAddress,
              toAddress,
              values[i],
              gasLimit,
              gasPrice,
              "",
              token,
            ]
          );
          expect(res.rowCount).to.equal(1);
        }
      }
    }

    // eslint-disable-next-line no-use-before-define
    const insertValuesActif = [
      // values for first insertion
      [
        100, // power
        800, // efficiency
        100, // quantity
        500, // surface
        "Solar Manufacturer", // manufacturer
        "STP250S-20/WdB", // model
        await ethers.getContractFactory("Token"), // token
        token.address, // tokenaddress
        "46.2276, 2.2137", // geolocation
        productionToAdd, // energyproduction
        newProductionLimit, // productionlimit
        await ethers.provider.getSigner(0).getAddress(), // producer
      ],
      // values for second insertion
      [
        100, // power
        800, // efficiency
        100, // quantity
        500, // surface
        "Solar Manufacturer", // manufacturer
        "STP250S-20/WdB", // model
        await ethers.getContractFactory("Token"), // token
        token.address, // tokenaddress
        "46.2276, 2.2137", // geolocation
        productionToAdd, // energyproduction
        newProductionLimit, // productionlimit
        await ethers.provider.getSigner(0).getAddress(), // producer
      ],
      // values for third insertion
      [
        100, // power
        800, // efficiency
        100, // quantity
        500, // surface
        "Solar Manufacturer", // manufacturer
        "STP250S-20/WdB", // model
        await ethers.getContractFactory("Token"), // token
        token.address, // tokenaddress
        "46.2276, 2.2137", // geolocation
        productionToAdd, // energyproduction
        newProductionLimit, // productionlimit
        await ethers.provider.getSigner(0).getAddress(), // producer
      ],
    ];

    // eslint-disable-next-line no-use-before-define
    for (const values of insertValuesActif) {
      const res = await client.query(
        `INSERT INTO actif (power, efficiency, quantity, surface, manufacturer, model, token, tokenaddress,
                                    geolocation, energyproduction, productionlimit, producer)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        values
      );
      expect(res.rowCount).to.equal(1);
    }

    const insertValuesTransactions = [
      [
        "0x" + Math.random().toString(16).substr(2, 64), // hash
        1, // block_id
        Math.floor(Math.random() * 1000000), // nonce
        "0x" + Math.random().toString(16).substr(2, 40), // from_address
        "0x" + Math.random().toString(16).substr(2, 40), // to_address
        Math.random() * 1000, // value
        Math.floor(Math.random() * 1000000), // gas_limit
        Math.random() * 10, // gas_price
        "0x" + Math.random().toString(16).substr(2, 128), // input
        "0x" + Math.random().toString(16).substr(2, 40), // token
      ],
      [
        "0x" + Math.random().toString(16).substr(2, 64), // hash
        2, // block_id
        Math.floor(Math.random() * 1000000), // nonce
        "0x" + Math.random().toString(16).substr(2, 40), // from_address
        "0x" + Math.random().toString(16).substr(2, 40), // to_address
        Math.random() * 1000, // value
        Math.floor(Math.random() * 1000000), // gas_limit
        Math.random() * 10, // gas_price
        "0x" + Math.random().toString(16).substr(2, 128), // input
        "0x" + Math.random().toString(16).substr(2, 40), // token
      ],
      [
        "0x" + Math.random().toString(16).substr(2, 64), // hash
        3, // block_id
        Math.floor(Math.random() * 1000000), // nonce
        "0x" + Math.random().toString(16).substr(2, 40), // from_address
        "0x" + Math.random().toString(16).substr(2, 40), // to_address
        Math.random() * 1000, // value
        Math.floor(Math.random() * 1000000), // gas_limit
        Math.random() * 10, // gas_price
        "0x" + Math.random().toString(16).substr(2, 128), // input
        "0x" + Math.random().toString(16).substr(2, 40), // token
      ],
      [
        "0x" + Math.random().toString(16).substr(2, 64), // hash
        4, // block_id
        Math.floor(Math.random() * 1000000), // nonce
        "0x" + Math.random().toString(16).substr(2, 40), // from_address
        "0x" + Math.random().toString(16).substr(2, 40), // to_address
        Math.random() * 1000, // value
        Math.floor(Math.random() * 1000000), // gas_limit
        Math.random() * 10, // gas_price
        "0x" + Math.random().toString(16).substr(2, 128), // input
        "0x" + Math.random().toString(16).substr(2, 40), // token
      ],
    ];

    for (const values of insertValuesTransactions) {
      const res = await client.query(
        `INSERT INTO transactions (hash, block_id, nonce, from_address, to_address, value, gas_limit, gas_price,
                                           input, token)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        values
      );
      expect(res.rowCount).to.equal(1);
    }

    const insertValuesProprietaires = [
      [
        "Dupont",
        "Jean",
        "10 rue de la Paix, Paris",
        "06 12 34 56 78",
        "jean.dupont@gmail.com",
        "1980-03-01",
        "Avocat",
        80000,
        "Marié",
        2,
        "2021-01-05",
        250000,
        "Assurance tous risques",
        "2025-01-05",
        "Bon état général",
        "Aucune remarque",
      ],
      [
        "Lefebvre",
        "Sophie",
        "1 avenue des Lilas, Lyon",
        "06 23 45 67 89",
        "sophie.lefebvre@yahoo.fr",
        "1992-08-12",
        "Ingénieur",
        65000,
        "Célibataire",
        0,
        "2020-09-15",
        150000,
        "Garantie limitée",
        "2023-09-15",
        "Besoin de réparations",
        "Fenêtre du salon cassée",
      ],
      [
        "Martinez",
        "Pierre",
        "5 rue du Château, Marseille",
        "06 34 56 78 90",
        "pierre.martinez@orange.fr",
        "1975-05-20",
        "Comptable",
        70000,
        "Marié",
        1,
        "2018-06-30",
        180000,
        "Assurance incendie",
        "2023-06-30",
        "Excellent état",
        "Aucune remarque",
      ],
    ];

    for (const values of insertValuesProprietaires) {
      const res = await client.query(
        `INSERT INTO proprietaires (nom, prenom, adresse, telephone, email, date_naissance, profession, revenu_annuel, statut_marital, nb_enfants, date_achat, cout_achat, garantie, fin_garantie, etat, autre_info) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        values
      );
      expect(res.rowCount).to.equal(1);
    }

    const insertValuesBalances = [
      [
        1, // address_id
        Math.random() * 1000, // balance
      ],
      [
        2, // address_id
        Math.random() * 1000, // balance
      ],
    ];

    for (const values of insertValuesBalances) {
      const res = await client.query(
        `INSERT INTO balances (address_id, balance) VALUES ($1, $2)`,
        values
      );
      expect(res.rowCount).to.equal(1);
    }
  });
});
