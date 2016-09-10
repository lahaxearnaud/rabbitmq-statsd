IMAGE_NAME = rabbitmq-collector
CONTAINER_NAME = rabbitmq-collector-container
PWD=$(shell pwd)

rm: down
	docker rmi $(IMAGE_NAME)

build :
	docker build -t $(IMAGE_NAME) $(PWD)

up :
	docker rm $(CONTAINER_NAME) | true
	docker run --name $(CONTAINER_NAME) -v $(PWD):/var/app -d $(IMAGE_NAME) forever /var/app/app.js
	
down :
	docker kill $(CONTAINER_NAME) | true

tail :
	docker logs -f $(CONTAINER_NAME)
