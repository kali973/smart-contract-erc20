package com.ethereum.smartcontract.services;

import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;
import java.util.Date;

public class ReadActiveMQ {

    public static void ReadMessageFromActiveMQ() {
        ConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        Connection connection = null;
        try {
            connection = connectionFactory.createConnection();
            connection.start();

            Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            Destination destination = session.createQueue("solarix-activemq-queue");
            MessageConsumer consumer = session.createConsumer(destination);

            Message message = consumer.receive();
            if (message instanceof TextMessage) {
                TextMessage textMessage = (TextMessage) message;
                String messageDetails = "Received TextMessage with contents: " + textMessage.getText() +
                        ", JMSMessageID: " + textMessage.getJMSMessageID() +
                        ", JMSTimestamp: " + new Date(textMessage.getJMSTimestamp()).toString() +
                        ", JMSExpiration: " + textMessage.getJMSExpiration();
                System.out.println(messageDetails);
            } else {
                System.out.println("Received message: " + message);
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
    }
}
