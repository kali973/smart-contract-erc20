package com.ethereum.smartcontract.services;

import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;

public class WriteActiveMQ {

    public static void WriteMessageToActiveMQ(String privateKey, String defaultSupply) {
        ConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        Connection connection = null;
        try {
            connection = connectionFactory.createConnection();
            connection.start();

            Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            Destination destination = session.createQueue("solarix-activemq-queue");
            MessageProducer producer = session.createProducer(destination);

            String messageContent = "Private Key: " + privateKey + ", Default Supply: " + defaultSupply;
            TextMessage message = session.createTextMessage(messageContent);
            producer.send(message);

            producer.close();
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
    }
}
