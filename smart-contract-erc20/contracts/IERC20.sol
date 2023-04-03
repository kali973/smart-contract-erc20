// SPDX-License-Identifier: AFL-2.0

pragma solidity ^0.8.0;

interface IERC20 {
    // Retourne le total de jetons en circulation
    function totalSupply() external view returns (uint256);

    // Retourne le solde d'un compte spécifique
    function balanceOf(address account) external view returns (uint256);

    // Retourne le montant de jetons qu'un propriétaire a autorisé un délégué à dépenser pour lui
    function allowance(address owner, address spender)
    external
    view
    returns (uint256);

    // Transfère un certain montant de jetons à l'adresse du destinataire spécifiée
    function transfer(address recipient, uint256 amount)
    external
    returns (bool);

    // Autorise un délégué à dépenser un certain montant de jetons en son nom
    function approve(address spender, uint256 amount) external returns (bool);

    // Transfère un certain montant de jetons du compte du propriétaire à celui du destinataire
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    // Déclenché lorsqu'un transfert de jetons a eu lieu
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Déclenché lorsqu'un propriétaire autorise un délégué à dépenser des jetons en son nom
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}
