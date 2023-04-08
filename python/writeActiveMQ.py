import pika

class ActiveMQProducer(object):
    def __init__(self, host='localhost', port=8161, username='admin', password='admin'):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.parameters = pika.ConnectionParameters(self.host, self.port, '/', pika.PlainCredentials(self.username, self.password))
        self.connection = pika.BlockingConnection(self.parameters)
        self.channel = self.connection.channel()

    def send(self, queue_name, message):
        self.channel.queue_declare(queue=queue_name)
        self.channel.basic_publish(exchange='', routing_key=queue_name, body=message)

    def __del__(self):
        self.connection.close()

if __name__ == '__main__':
    privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    defaultSupply = "100L"
    messageContent = f'Private Key: {privateKey}, Default Supply: {defaultSupply}'
    producer = ActiveMQProducer()
    producer.send('solarix-activemq-queue', messageContent)
