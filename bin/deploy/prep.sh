#!/bin/bash

CUR_DIR=$(dirname "$(realpath "$0")")
source "$CUR_DIR/../../.env"

echo "prep setup"
dnf clean all && rm -rf /var/cache/dnf
update-ca-trust enable
update-ca-trust
dnf upgrade -y
dnf -y install epel-release
dnf config-manager --set-enabled crb
crb enable
dnf -y install dnf-plugins-core
dnf upgrade --refresh -y
echo -e "copy health"
cp "$CUR_DIR/health.sh" / && chmod +x /health.sh
echo -e "copy entrypoint"
cp "$CUR_DIR/entry_dev.sh" / && chmod +x /entry_dev.sh

mkdir -p "$DOCKER_ENV_DIR"
cp "$CUR_DIR/entry_web.sh" "/entry.sh"
cp "$CUR_DIR/health.sh" "/health.sh"

echo "prep finished"
