package com.ethereum.smartcontract.processus;

import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthBlock;
import org.web3j.protocol.http.HttpService;
import org.web3j.token.Token;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

import java.math.BigInteger;

public class SmartContractDeployment {

    public static void deployContract(String nodeUrl, String privateKey, BigInteger defaultSupply) {
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

            //populate the default supply
            Token token = Token.deploy(
                    web3j,
                    credentials,
                    contractGasProvider,
                    defaultSupply
            ).send();

            System.out.println("Smart Contract deployed @" + token.getContractAddress());
        } catch (Exception e) {
            System.err.println("Failed to deploy smart contract: " + e.getMessage());
        }
    }
}

