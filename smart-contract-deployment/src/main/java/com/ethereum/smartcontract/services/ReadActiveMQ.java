package com.ethereum.smartcontract.services;

import com.ethereum.smartcontract.processus.SmartContractDeployment;
import com.ethereum.smartcontract.processus.SmartContractFetchBalance;
import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;
import java.math.BigInteger;

public class ReadActiveMQ {

    public static String[] readMessagesFromActiveMQ(String nodeUrl, String contractAddress, String walletAddress) {
        ConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        Connection connection = null;
        String[] result = new String[2];
        try {
            connection = connectionFactory.createConnection();
            ((ActiveMQConnectionFactory) connectionFactory).setUserName("admin");
            ((ActiveMQConnectionFactory) connectionFactory).setPassword("admin");
            connection.start();

            Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            Destination destination = session.createQueue("solarix-activemq-queue");
            MessageConsumer consumer = session.createConsumer(destination);

            boolean hasMessage = true;
            while (hasMessage) {
                Message message = consumer.receive(1000); // Wait for 1 second for a message
                if (message == null) {
                    hasMessage = false; // No more messages
                } else if (message instanceof TextMessage) {
                    TextMessage textMessage = (TextMessage) message;
                    String payload = textMessage.getText();
                    String[] tokens = payload.split(",\\s*");
                    String privateKeyToken = tokens[0].trim();
                    String defaultSupplyToken = tokens[1].trim();
                    String privateKey = privateKeyToken.split(":\\s*")[1].trim();
                    BigInteger defaultSupply = new BigInteger(defaultSupplyToken.split(":\\s*")[1].trim().replace("L", ""));

                    System.out.println("Private Key: " + privateKey);
                    System.out.println("Default Supply: " + defaultSupply);

                    result[0] = privateKey;
                    result[1] = String.valueOf(defaultSupply);

                    // Appel à la fonction SmartContractDeployment
                    SmartContractDeployment.deployContract(nodeUrl, privateKey, defaultSupply);

                    // Appel à la fonction SmartContractFetchBalance
                    SmartContractFetchBalance.fetchBalance(contractAddress, walletAddress, nodeUrl, privateKey);

                } else {
                    System.out.println("Message reçu: " + message);
                }
            }

            consumer.close();
            session.close();
            connection.close();
        } catch (JMSException e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (JMSException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }
}
