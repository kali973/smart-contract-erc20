// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Token.sol"; // Importation du contrat Token.sol

contract Solarix {
    uint256 private power; // Puissance de la centrale solaire (en kW)
    uint256 private efficiency; // Efficacité de la centrale solaire (en %)
    uint256 private quantity; // Quantité de panneaux solaires dans la centrale
    uint256 private surface; // Surface de la centrale solaire (en m²)
    string private manufacturer; // Nom du fabricant de la centrale solaire
    string private model; // Modèle de la centrale solaire
    address private tokenAddress; // Adresse du contrat Token
    uint256 private energyProduction; // Production d'énergie actuelle de la centrale solaire (en kWh)
    uint256 private productionLimit; // Limite de production d'énergie de la centrale solaire (en kWh)
    address private producer; // Adresse du propriétaire de la centrale solaire
    string private geoLocation; // Coordonnées géographiques de la centrale solaire

    constructor(
        uint256 _power,
        uint256 _efficiency,
        uint256 _quantity,
        uint256 _surface,
        string memory _manufacturer,
        string memory _model,
        address _tokenAddress,
        string memory _geoLocation // Ajout du paramètre pour la géolocalisation
    ) {
        power = _power;
        efficiency = _efficiency;
        quantity = _quantity;
        surface = _surface;
        manufacturer = _manufacturer;
        model = _model;
        tokenAddress = _tokenAddress;
        geoLocation = _geoLocation;
        // Initialisation de la géolocalisation
        energyProduction = 0;
        // Initialisation de la production d'énergie à 0
        productionLimit = _power * _efficiency * _quantity * _surface;
        // Calcul de la limite de production d'énergie
        producer = msg.sender;
        // Le propriétaire de la centrale est l'adresse qui a déployé le contrat
    }

    // Fonction pour ajouter de la production d'énergie
    function addEnergyProduction(uint256 _productionToAdd, uint256 _newProductionLimit) external {
        require(energyProduction + _productionToAdd <= productionLimit, "Production limit exceeded.");
        // Vérifie que la production ajoutée ne dépasse pas la limite de production
        energyProduction += _productionToAdd;
        // Ajoute la production d'énergie
        productionLimit = _newProductionLimit;
        // Met à jour la limite de production
    }

    function getTokenBalance() public view returns (uint256) {
        Token token = Token(tokenAddress);
        return token.balanceOf(address(this));
    }

    // Fonctions pour récupérer les différentes informations de la centrale solaire
    function getPower() public view returns (uint256) {
        return power;
    }

    function getEfficiency() public view returns (uint256) {
        return efficiency;
    }

    function getQuantity() public view returns (uint256) {
        return quantity;
    }

    function getSurface() public view returns (uint256) {
        return surface;
    }

    function getManufacturer() public view returns (string memory) {
        return manufacturer;
    }

    function getModel() public view returns (string memory) {
        return model;
    }

    function getTokenAddress() public view returns (address) {
        return tokenAddress;
    }

    function getEnergyProduction() public view returns (uint256) {
        return energyProduction;
    }

    function getProductionLimit() public view returns (uint256) {
        return productionLimit;
    }

    function getProducer() public view returns (address) {
        return producer;
    }
    // Fonction pour récupérer la géolocalisation de la centrale solaire
    function getGeoLocation() public view returns (string memory) {
        return geoLocation;
    }

    // Fonction pour mettre à jour la géolocalisation de la centrale solaire
    function setGeoLocation(string memory _newGeoLocation) external {
        geoLocation = _newGeoLocation;
    }

    function setPower(uint256 _newPower) external {
        power = _newPower;
    }

    function setEfficiency(uint256 _newEfficiency) external {
        efficiency = _newEfficiency;
    }

    function setQuantity(uint256 _newQuantity) external {
        quantity = _newQuantity;
    }

    function setSurface(uint256 _newSurface) external {
        surface = _newSurface;
    }

    function setManufacturer(string memory _newManufacturer) external {
        manufacturer = _newManufacturer;
    }

    function setModel(string memory _newModel) external {
        model = _newModel;
    }

    function setTokenAddress(address _newTokenAddress) external {
        tokenAddress = _newTokenAddress;
    }

    function setProductionLimit(uint256 _newProductionLimit) external {
        productionLimit = _newProductionLimit;
    }

    function setProducer(address _newProducer) external {
        producer = _newProducer;
    }

}
