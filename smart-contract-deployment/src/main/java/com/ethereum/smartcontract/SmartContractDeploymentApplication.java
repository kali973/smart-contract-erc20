package com.ethereum.smartcontract;

import com.ethereum.smartcontract.processus.SmartContractDeployment;
import com.ethereum.smartcontract.processus.SmartContractFetchBalance;
import com.ethereum.smartcontract.services.WriteActiveMQ;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigInteger;

import static com.ethereum.smartcontract.services.ReadActiveMQ.ReadMessageFromActiveMQ;

@SpringBootApplication
public class SmartContractDeploymentApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SmartContractDeploymentApplication.class, args);
        //WriteActiveMQ.WriteMessageToActiveMQ("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", "100L");

        String[] message = ReadMessageFromActiveMQ();
        String privateKey = message[0];
        BigInteger defaultSupply = new BigInteger(message[1]);

        // Appel à la fonction SmartContractDeployment
        String nodeUrl = "http://localhost:8545";
        SmartContractDeployment.deployContract(nodeUrl, privateKey, defaultSupply);

        // Appel à la fonction SmartContractFetchBalance
        String contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
        String walletAddress = "0xf39fd6e51aad188f6f4ce6ab8827279cfffb92266";
        String nodeUrl2 = "http://localhost:8545";
        SmartContractFetchBalance.fetchBalance(contractAddress, walletAddress, nodeUrl2, privateKey);

    }

}
