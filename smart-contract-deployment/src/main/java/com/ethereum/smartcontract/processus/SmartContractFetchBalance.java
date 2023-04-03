package com.ethereum.smartcontract.processus;

import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthBlock;
import org.web3j.protocol.exceptions.ClientConnectionException;
import org.web3j.protocol.http.HttpService;
import org.web3j.token.Token;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

import java.math.BigInteger;

public class SmartContractFetchBalance {

    public static void fetchBalance(String contractAddress, String walletAddress, String nodeUrl, String privateKey) {
        try {
            // spécifier l'URL du noeud Ethereum
            Web3j web3j = Web3j.build(new HttpService(nodeUrl));

            // spécifier la clé privée
            Credentials credentials = Credentials.create(privateKey);

            // récupérer le bloc le plus récent pour obtenir la limite de gaz et le prix du gaz
            EthBlock block = web3j.ethGetBlockByNumber(
                    DefaultBlockParameterName.LATEST,
                    false
            ).send();

            ContractGasProvider contractGasProvider = new StaticGasProvider(
                    web3j.ethGasPrice().send().getGasPrice(),
                    block.getBlock().getGasLimit()
            );

            // se connecter au smart contract déployé en utilisant la fonction load
            Token token = Token.load(
                    contractAddress,
                    web3j,
                    credentials,
                    contractGasProvider
            );

            System.out.println("Connecté au smart contract déployé @" + token.getContractAddress());

            // récupérer le solde pour l'adresse de portefeuille donnée
            BigInteger balance = token.balanceOf(walletAddress).send();

            System.out.println("Solde du smart contract " + balance);

        } catch (ClientConnectionException e) {
            System.err.println("Impossible de se connecter au nœud à l'adresse " + nodeUrl + ": " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Échec de la récupération du solde: " + e.getMessage());
        }
    }

}
