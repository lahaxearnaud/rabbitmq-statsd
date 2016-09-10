var AMQPStats = require('amqp-stats'),
    logger = require('winston'),
    config = require('./config.json'),
    SDC = require('statsd-client'),
    statsdClient = new SDC(config.statsd),
    // stasd client creation
    stats = new AMQPStats({
        username: config.amqp.username,
        password: config.amqp.password,
        hostname: config.amqp.host,
        protocol: config.amqp.protocol
    });


// config winston
logger.add(logger.transports.File, {
    filename: config.logPath
});

logger.info('Rabbit monitoring starting');
logger.debug(config);

var collectQueuesStats = function() {

    // fetch stats on all server queues
    stats.queues(function(err, res, data) {
        if (err) {
            logger.error(err);
            return false;
        }

        for (var i = 0; i < data.length; i++) {
            var queue = data[i];
            // this name will be prefix by statsd.prefix configuration
            var queueNamespace = 'queues.' + queue.name + '.';
            statsdClient.gauge(queueNamespace + 'memory', queue.memory);

            // this key is here only if at least one message was send to the queue
            if (queue.message_stats) {
                statsdClient.gauge(queueNamespace + 'ack', queue.message_stats.ack);
                statsdClient.gauge(queueNamespace + 'deliver', queue.message_stats.deliver);
                statsdClient.gauge(queueNamespace + 'publish', queue.message_stats.publish);
                statsdClient.gauge(queueNamespace + 'redeliver', queue.message_stats.redeliver);
                statsdClient.gauge(queueNamespace + 'consumers', queue.message_stats.consumers);
            }

            statsdClient.gauge(queueNamespace + 'messages', queue.messages);
            statsdClient.gauge(queueNamespace + 'messagesReady', queue.messages_ready);
            statsdClient.gauge(queueNamespace + 'messagesUnacknowledged', queue.messages_unacknowledged);
        }
    });
};


// collect data now
collectQueuesStats();

// start interval
setInterval(collectQueuesStats, config.collectInterval);