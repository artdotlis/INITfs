#!/bin/bash

CONF="/etc/nginx/conf.d/upstream.conf"

echo "starting nginx - $CONF"

touch $CONF

echo "upstream $NGINX_BALANCER {" >"$CONF"
echo "server $NODE_HOST:$NODE_PORT;" >>"$CONF"
for cnt in $(seq 1 $((PM2_WORKER - 1))); do
    echo "server $NODE_HOST:$((NODE_PORT + cnt));" >>"$CONF"
done
echo "}" >>"$CONF"
echo "running docker $(ls -al /docker-entrypoint.sh)"

echo "Adding tmp cache folder"
mkdir -p "/tmp/ipx_cache"

sh "/docker-entrypoint.sh" nginx -g "daemon off;"
