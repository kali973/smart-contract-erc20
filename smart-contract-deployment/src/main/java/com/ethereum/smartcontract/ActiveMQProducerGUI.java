package com.ethereum.smartcontract;

import com.ethereum.smartcontract.services.WriteActiveMQ;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

class ActiveMQProducerGUI extends JFrame implements ActionListener {

    private JTextField privateKeyTextField, defaultSupplyTextField;
    private JButton sendButton;

    public ActiveMQProducerGUI() {
        super("ActiveMQ Producer");

        JPanel panel = new JPanel(new GridLayout(3, 2));
        panel.add(new JLabel("Private Key:"));
        privateKeyTextField = new JTextField("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
        panel.add(privateKeyTextField);
        panel.add(new JLabel("Default Supply:"));
        defaultSupplyTextField = new JTextField("50");
        panel.add(defaultSupplyTextField);
        sendButton = new JButton("Send");
        sendButton.addActionListener(this);
        panel.add(sendButton);

        add(panel, BorderLayout.CENTER);
        pack();
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocation(100, 100); // Centre la fenêtre au milieu de l'écran
        setVisible(true);
    }

    public static void main(String[] args) {
        ActiveMQProducerGUI gui = new ActiveMQProducerGUI();
        gui.resizeWindow(900, 100); // agrandir la fenêtre à 500 pixels de large et 300 pixels de haut
    }

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == sendButton) {
            String privateKey = privateKeyTextField.getText();
            String defaultSupply = defaultSupplyTextField.getText();
            WriteActiveMQ.WriteMessageToActiveMQ(privateKey, defaultSupply);
        }
    }

    // méthode pour agrandir la fenêtre
    private void resizeWindow(int width, int height) {
        Dimension newSize = new Dimension(width, height);
        setPreferredSize(newSize);
        setSize(newSize);
        revalidate();
    }
}
