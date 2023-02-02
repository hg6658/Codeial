const kue = require('kue');

module.exports.setReddisQue= function(req,res,next){
    if(!req.queue){
      console.log('REDIS CONNECTED');
      req.queue = kue.createQueue({
        prefix: 'q',
        redis: {
          port: 15868,
          host: process.env.REDIS_ENDPOINT_URL,
          auth: process.env.REDIS_PASSWORD, // if provided select a non-default redis db
          options: {
            // see https://github.com/mranney/node_redis#rediscreateclient
          }
        }
      });
    }
    next();
  }
