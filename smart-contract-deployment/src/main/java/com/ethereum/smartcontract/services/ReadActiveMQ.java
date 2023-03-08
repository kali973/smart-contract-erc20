package com.ethereum.smartcontract.services;

import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;

public class ReadActiveMQ {

    public static String[] ReadMessageFromActiveMQ() {
        ConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        Connection connection = null;
        String[] result = new String[2];
        try {
            connection = connectionFactory.createConnection();
            connection.start();

            Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            Destination destination = session.createQueue("solarix-activemq-queue");
            MessageConsumer consumer = session.createConsumer(destination);

            Message message = consumer.receive();
            if (message instanceof TextMessage) {
                TextMessage textMessage = (TextMessage) message;
                String payload = textMessage.getText();
                String[] tokens = payload.split(",\\s*");
                String privateKeyToken = tokens[0].trim();
                String defaultSupplyToken = tokens[1].trim();
                String privateKey = privateKeyToken.split(":\\s*")[1].trim();
                long defaultSupply = Long.parseLong(defaultSupplyToken.split(":\\s*")[1].trim().replace("L", ""));

                System.out.println("Private Key: " + privateKey);
                System.out.println("Default Supply: " + defaultSupply);

                result[0] = privateKey;
                result[1] = String.valueOf(defaultSupply);

            } else {
                System.out.println("Message reçu: " + message);
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
