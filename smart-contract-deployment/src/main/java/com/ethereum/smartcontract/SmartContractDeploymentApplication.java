package com.ethereum.smartcontract;

import com.ethereum.smartcontract.services.ReadActiveMQ;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartContractDeploymentApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SmartContractDeploymentApplication.class, args);

        String nodeUrl = "http://localhost:8545";
        String contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
        String walletAddress = "0xf39fd6e51aad188f6f4ce6ab8827279cfffb92266";

        while (true) {
            String[] message = ReadActiveMQ.readMessagesFromActiveMQ(nodeUrl, contractAddress, walletAddress);
            if (message == null) {
                // Si aucun message n'est disponible, on sort de la boucle
                break;
            }
        }
    }
}
