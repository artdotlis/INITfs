#!/bin/bash

BIN_DIR="$(dirname "$(realpath "$0")")"
ROOT="$BIN_DIR/../.."
source "$ROOT/.env"
source "$ROOT/$WEB_ENV"

echo "install project"

make uninstall

mkdir -p "/var/www/$APP_WEB_ROOT"
APP_WEB_SHADOW="/var/www/$APP_WEB_ROOT" make runBuild

echo "project installed"
