package com.ethereum.smartcontract;

import com.ethereum.smartcontract.services.WriteActiveMQ;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import static com.ethereum.smartcontract.services.ReadActiveMQ.ReadMessageFromActiveMQ;

@SpringBootApplication
public class SmartContractDeploymentApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartContractDeploymentApplication.class, args);
        WriteActiveMQ.WriteMessageToActiveMQ("123456", "wallet.json");
        ReadMessageFromActiveMQ();
    }

}
