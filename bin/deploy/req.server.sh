#!/bin/bash

echo "installing node"
dnf -y update
dnf -y module enable nodejs:"${NODE_VER}"
dnf -y install nodejs npm
echo "installing ps"
dnf -y install procps
echo "installing bun -> /opt/bun"
dnf -y install unzip
if [ ! -d "/opt/bun" ]; then
    echo "installing bun"
    curl -fsSl https://bun.sh/install | bash -s "bun-$BUN_VER"
    mv "$HOME/.bun" /opt/bun
    chmod 755 -R /opt/bun
    ln -s "/opt/bun/bin/bun" "/usr/bin/bun"
fi
echo "installing pm2"
dnf -y install gcc-c++ make
npm i -g pm2

dnf -y remove unzip gcc-c++ make npm
