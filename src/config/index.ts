export default () => ({
    environment: process.env.NODE_ENV || 'development',
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6380,
        username: process.env.REDIS_USERNAME || 'redis',
        password: process.env.REDIS_PASSWORD || 'redispassword',
    }
})