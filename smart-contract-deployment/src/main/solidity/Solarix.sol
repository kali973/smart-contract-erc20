pragma solidity ^0.8.0;

contract Solarix {
    address public producer;
    uint256 public energyProduced;
    uint256 public price;
    uint256 public power;
    uint256 public efficiency;
    uint256 public numOfPanels;
    uint256 public totalArea;
    string public manufacturer;
    string public model;

    constructor(
        uint256 _energyProduced,
        uint256 _price,
        uint256 _power,
        uint256 _efficiency,
        uint256 _numOfPanels,
        uint256 _totalArea,
        string memory _manufacturer,
        string memory _model
    ) {
        producer = msg.sender;
        energyProduced = _energyProduced;
        price = _price;
        power = _power;
        efficiency = _efficiency;
        numOfPanels = _numOfPanels;
        totalArea = _totalArea;
        manufacturer = _manufacturer;
        model = _model;
    }

    function buyEnergy() public payable {
        require(msg.value == price, "Incorrect payment amount");
        payable(producer).transfer(msg.value);
    }

    function getEnergyDetails() public view returns (uint256, uint256, uint256, uint256, uint256, uint256, string memory, string memory) {
        return (energyProduced, price, power, efficiency, numOfPanels, totalArea, manufacturer, model);
    }
}
