package com.ethereum.smartcontract;

import com.ethereum.smartcontract.processus.SmartContractDeployment;
import com.ethereum.smartcontract.processus.SmartContractFetchBalance;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigInteger;

import static com.ethereum.smartcontract.services.ReadActiveMQ.ReadMessageFromActiveMQ;

@SpringBootApplication
public class SmartContractDeploymentApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SmartContractDeploymentApplication.class, args);

        String[] message = ReadMessageFromActiveMQ();
        String privateKey = message[0];
        BigInteger defaultSupply = new BigInteger(message[1]);

        // Appel à la fonction SmartContractDeployment
        String nodeUrl = "http://localhost:8545";
        SmartContractDeployment.deployContract(nodeUrl, privateKey, defaultSupply);

        // Appel à la fonction SmartContractFetchBalance
        String contractAddress = "0x123456789abcdef";
        String walletAddress = "0x987654321fedcba";
        String nodeUrl2 = "http://localhost:8545";
        SmartContractFetchBalance.fetchBalance(contractAddress, walletAddress, nodeUrl2, privateKey);

    }

}
