#!/bin/sh

echo "starting server - in /var/www/$APP_WEB_ROOT"
cd "/var/www/$APP_WEB_ROOT" || exit 1

for cnt in $(seq 0 $((PM2_WORKER - 1))); do
    NODE_ENV=production HOST="$NODE_HOST" PORT="$((NODE_PORT + cnt))" \
        pm2 start --interpreter bun "$APP_SERVER_ROOT" -n "server-$cnt"
done

pm2 logs
