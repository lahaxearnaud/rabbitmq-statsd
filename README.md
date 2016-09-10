# rabbitmq-statsd

> ## Example

![Alt text](https://github.com/lahaxearnaud/rabbitmq-statsd/blob/master/data/queues.png?raw=true "Queues keys")

![Alt text](https://github.com/lahaxearnaud/rabbitmq-statsd/blob/master/data/stats.png?raw=true "Stats keys")

> ## Configuration

In the [config.json](https://github.com/lahaxearnaud/rabbitmq-statsd/blob/master/config.json) file you will find all the application configuration

```js
{
	"collectInterval": 30000, // collect interval time in ms
	"amqp": {
		"username": "AMQP_USERNAME",
		"password": "AMQP_PASSWORD",
		"host": "AMQP_HOSTNAME:15672", // might be something like heroku.srs.rabbitmq.com/rabbitmq/foobar
		"protocol": "HTTP_OR_HTTPS"
	},
	"statsd": {
		"host": "STATSD_HOSTNAME",
		"port": "8125", // port of your statsd
		"prefix": "STATSD_PREFIX" // prefix for your stats ex rabbit.prod / rabbit.dev
	},
	"logPath": "rabbit.log"
}
```

> ## Install

Clone the remository

```sh
$ git clone https://github.com/lahaxearnaud/rabbitmq-statsd
```

## Run with docker on arm architecture (based on armbuild/alpine)

Docker images: 47MB

- Build the image
```sh
$ make build
```
```
docker build -t rabbitmq-collector /home/pirate/domotique-rabbitmq-statsd
Sending build context to Docker daemon 2.842 MB
Step 1 : FROM resin/armhf-alpine-node:slim
 ---> 3e890d09a3d8
Step 2 : RUN npm install forever -g
 ---> Using cache
 ---> a8ee4752aca3
Successfully built a8ee4752aca3

```
- Start the container
```sh
$ make up
```
```
docker rm rabbitmq-collector-container | true
docker run --name rabbitmq-collector-container -v /home/pirate/domotique-rabbitmq-statsd:/var/app -d rabbitmq-collector forever /var/app/app.js
4645aa2efcc4946924be0faa8237e4163ba5a2771ef9b72d488ff4e22e79e610
```

- Access container logs
```sh
$ make tail
```
```
docker logs -f rabbitmq-collector-container
warn:    --minUptime not set. Defaulting to: 1000ms
warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
info: Rabbit monitoring starting

```

- Stop the container
```sh
$ make down

docker kill rabbitmq-collector-container | true

```

- Remove the image
```sh
$ make rm
```
```
docker kill rabbitmq-collector-container | true
Error response from daemon: Cannot kill container rabbitmq-collector-container: Container 4645aa2efcc4946924be0faa8237e4163ba5a2771ef9b72d488ff4e22e79e610 is not running
docker rmi rabbitmq-collector
Untagged: rabbitmq-collector:latest

```

## Run without docker with forever

```sh
$ forver start app.js

```

## Run without docker and without forever

```sh
$ npm run app

```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/lahaxearnaud/rabbitmq-statsd/issues)

## Author

**LAHAXE Arnaud**

* [github/lahaxearnaud](https://github.com/lahaxearnaud)
* [twitter/arnaud_lahaxe](http://twitter.com/arnaud_lahaxe)

## License

Copyright © 2016 [LAHAXE Arnaud]()
Licensed under the MIT license.

***
