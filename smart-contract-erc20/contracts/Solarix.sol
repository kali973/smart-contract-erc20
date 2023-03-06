// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Solarix {
    address public producer;
    uint public energyProduction;
    uint public energyPrice;
    uint public energySold;

    struct SolarPanel {
        uint power;
        uint efficiency;
        uint quantity;
        uint surface;
        string manufacturer;
        string model;
    }

    SolarPanel public solarPanel;

    constructor(uint _power, uint _efficiency, uint _quantity, uint _surface, string memory _manufacturer, string memory _model) {
        producer = msg.sender;
        solarPanel = SolarPanel(_power, _efficiency, _quantity, _surface, _manufacturer, _model);
    }

    function sellEnergy(uint quantity) public payable {
        require(msg.value == quantity * energyPrice, "Invalid payment amount.");
        require(quantity <= energyProduction - energySold, "Not enough energy available for sale.");

        energySold += quantity;
        payable(producer).transfer(msg.value);
    }

    function setEnergyPrice(uint price) public {
        require(msg.sender == producer, "Only the producer can set the energy price.");
        energyPrice = price;
    }

    function addEnergyProduction(uint production) public {
        require(msg.sender == producer, "Only the producer can add energy production.");
        energyProduction += production;
    }

    function setSolarPanel(uint _power, uint _efficiency, uint _quantity, uint _surface, string memory _manufacturer, string memory _model) public {
        require(msg.sender == producer, "Only the producer can set the solar panel information.");
        solarPanel = SolarPanel(_power, _efficiency, _quantity, _surface, _manufacturer, _model);
    }

    function getSolarPanel() public view returns (uint, uint, uint, uint, string memory, string memory) {
        return (solarPanel.power, solarPanel.efficiency, solarPanel.quantity, solarPanel.surface, solarPanel.manufacturer, solarPanel.model);
    }
}
