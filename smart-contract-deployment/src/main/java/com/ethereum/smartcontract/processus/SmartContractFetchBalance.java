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
            //populate your node URL
            Web3j web3j = Web3j.build(new HttpService(nodeUrl));

            //populate your private key
            Credentials credentials = Credentials.create(privateKey);

            EthBlock block = web3j.ethGetBlockByNumber(
                    DefaultBlockParameterName.LATEST,
                    false
            ).send();

            ContractGasProvider contractGasProvider = new StaticGasProvider(
                    web3j.ethGasPrice().send().getGasPrice(),
                    block.getBlock().getGasLimit()
            );

            //connect to the deployed SmartContract using load function
            Token token = Token.load(
                    contractAddress,
                    web3j,
                    credentials,
                    contractGasProvider
            );

            System.out.println("Connected to Smart Contract deployed @" + token.getContractAddress());

            BigInteger balance = token.balanceOf(walletAddress).send();
            System.out.println("Smart Contract balance " + balance);
        } catch (ClientConnectionException e) {
            System.err.println("Could not connect to node at " + nodeUrl);
            e.printStackTrace();
        } catch (Exception e) {
            System.err.println("Failed to fetch balance: " + e.getMessage());
        }
    }
}
