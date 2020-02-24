module.exports = {
  apps : [{
    name: 'alice',
    script: __dirname + '/dist/server.js',
    instances: 1,
    autorestart: true,
    cron_restart: "* * */1 * *",
    watch: false,
    // max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    error_file: __dirname + '/logs/err.log',
    out_file: __dirname + '/logs/out.log',
    pid_file: __dirname +'/logs/pid.log',
  }],
};

console.log(__dirname + '/logs/XXXerr.log');
