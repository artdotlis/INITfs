#!/bin/bash

ROOT="$(dirname "$(realpath "$0")")/../.."
source "$ROOT/.env"

echo "update"
dnf -y update
echo "installing requirements"
dnf -y install zlib gzip vim git git-lfs make gcc-c++ findutils wget unzip
echo "requirements installed"
echo "installing nodejs"
dnf -y module enable nodejs:"$NODE_VER"
dnf -y install nodejs
# for bun
npm install -g node-gyp
echo "nodejs installed"
