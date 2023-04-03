/*
  NodeJS Connect to Redis with docker-compose

  (1)
  - npm install nodemon redis 
    > redis: to get node-redis

  (2)
  - package.json:
    > "start": "node index.js"

  (3)
  - Dockerfile: 
    > NodeJS

  (4) 
  - docker-compose.yaml: 
    > redis 
    > api

  (5)
  - docker-compose down
  - docker-compose up --build 

*/

const keys = require('./keys')
const redis = require('redis')

// (i)
const redisClient = redis.createClient({
  url: 'redis://redis:6379',
})

// (iii)
redisClient.on('error', (err) => console.log('Redis Client Error', err))
redisClient.on('ready', () => console.log('Connected to Redis DB'))

// (ii)
;(async () => {
  try {
    // (a)
    await redisClient.connect()

    // (b)
    await redisClient.set('key', 'testing value')
    const value1 = await redisClient.get('key')
    console.log(value1)

    // (c)
    await redisClient.hSet('values', 99, 'Nothing yet!')
    const value2 = await redisClient.hGetAll('values')
    console.log(value2)
  } catch (error) {
    console.log(error)
  }
})()
