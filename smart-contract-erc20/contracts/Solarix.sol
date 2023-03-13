pragma solidity ^0.8.0;

// Interface pour les ERC20 tokens
interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);
}

/**

    @title Solarix

    @dev Un contrat pour vendre de l'énergie solaire.
    */
contract Solarix {
    address public owner; // adresse du propriétaire du contrat
    address public producer; // adresse du producteur d'énergie
    uint256 public energyProduction; // quantité totale d'énergie produite
    uint256 public energyPrice; // prix de l'énergie par unité
    uint256 public energySold; // quantité d'énergie vendue
    uint256 public productionLimit; // limite de production d'énergie

    // structure pour stocker les informations sur le panneau solaire
    struct SolarPanel {
        uint256 power; // puissance en watts crête (Wc)
        uint256 efficiency; // efficacité en pourcentage (%)
        uint256 quantity; // quantité de panneaux solaires installés
        uint256 surface; // surface totale des panneaux solaires en mètres carrés (m²)
        string manufacturer; // nom du fabricant
        string model; // modèle du panneau solaire
    }

    SolarPanel public solarPanel; // informations sur le panneau solaire

    mapping(address => uint256) public solarPanelPower; // puissance des panneaux solaires pour chaque adresse de propriétaire

    IERC20 public token; // contrat ERC20 token

    constructor(
        uint256 _power,
        uint256 _efficiency,
        uint256 _quantity,
        uint256 _surface,
        string memory _manufacturer,
        string memory _model,
        address _token
    ) {
        solarPanel = SolarPanel(_power, _efficiency, _quantity, _surface, _manufacturer, _model);
        token = IERC20(_token);
        owner = msg.sender;
        producer = msg.sender;
    }

    function addPower(uint256 _additionalPower) external {
        require(msg.sender == producer, "Only the producer can add power.");
        solarPanel.power += _additionalPower;
    }

    function setEnergyPrice(uint256 _energyPrice) external {
        require(msg.sender == producer, "Only the producer can set the energy price.");
        energyPrice = _energyPrice;
    }

    function sellEnergy() external {
        require(msg.sender == producer, "Only the producer can sell energy.");
        require(energyPrice > 0, "Energy price has not been set yet.");
        energyProduction = solarPanel.power * solarPanel.efficiency * solarPanel.quantity * solarPanel.surface;
        uint256 revenue = energyProduction * energyPrice;
        token.transfer(msg.sender, revenue);
    }

    /**

        @dev Vendre de l'énergie et transférer les fonds au producteur.

        @param quantity La quantité d'énergie à vendre.
        */
    function sellEnergy(uint256 quantity) public payable {
        require(
            msg.value == quantity * energyPrice,
            "Montant de paiement invalide."
        );
        require(
            quantity <= energyProduction - energySold,
            "Energie non disponible."
        );

        energySold += quantity;
        payable(producer).transfer(msg.value);
    }

    /**
     * @dev Add energy production.
     * @param production The amount of energy to add.
     */
    function addEnergyProduction(uint256 production, uint256 newProductionLimit) public {
        require(
            msg.sender == producer,
            "Only the producer can add energy production."
        );
        require(production > 0, "Production must be greater than zero.");

        // Vérification de la limite de production
        require(energyProduction + production > newProductionLimit, "Production limit exceeded.");

        energyProduction = energyProduction + production;
        productionLimit = newProductionLimit;
    }

    function updateSolarPanel(
        uint256 _power,
        uint256 _efficiency,
        uint256 _quantity,
        uint256 _surface,
        string memory _manufacturer,
        string memory _model
    ) public {
        require(msg.sender == producer, "Only the producer can update the solar panel.");

        solarPanel.power = _power;
        solarPanel.efficiency = _efficiency;
        solarPanel.quantity = _quantity;
        solarPanel.surface = _surface;
        solarPanel.manufacturer = _manufacturer;
        solarPanel.model = _model;
    }

    function setSolarPanel(
        uint256 _power,
        uint256 _efficiency,
        uint256 _quantity,
        uint256 _surface,
        string memory _manufacturer,
        string memory _model
    ) public {
        require(
            msg.sender == producer,
            "Only the producer can set the solar panel information."
        );
        solarPanel = SolarPanel(
            _power,
            _efficiency,
            _quantity,
            _surface,
            _manufacturer,
            _model
        );
    }

    function getSolarPanel()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            string memory,
            string memory
        )
    {
        return (
            solarPanel.power,
            solarPanel.efficiency,
            solarPanel.quantity,
            solarPanel.surface,
            solarPanel.manufacturer,
            solarPanel.model
        );
    }

    function withdrawFunds() public {
        require(msg.sender == owner, "Only the contract owner can withdraw funds.");
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract balance is zero.");
        payable(owner).transfer(contractBalance);
    }


    function setProductionLimit(uint256 limit) public {
        require(
            msg.sender == producer,
            "Only the producer can set the production limit."
        );
        productionLimit = limit;
    }

    function getProductionLimit() public view returns (uint256) {
        return productionLimit;
    }

    function getCurrentProduction() public view returns (uint256) {
        return energyProduction - energySold;
    }

    function setProducer(address producerAddress) public {
        require(
            msg.sender == owner,
            "Only the owner can set the producer address."
        );
        producer = producerAddress;
    }

    function getProducer() public view returns (address) {
        return producer;
    }

    function kill() public {
        require(msg.sender == owner, "Only the owner can kill the contract.");
        selfdestruct(payable(owner));
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getOwnerSummary() public view returns (uint256, uint256) {
        uint256 tokenBalance = token.balanceOf(owner);
        uint256 etherBalance = address(this).balance;
        return (tokenBalance, etherBalance);
    }
}
