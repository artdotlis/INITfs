#!/bin/bash

ROOT="$(dirname "$(realpath "$0")")/../.."
source "$ROOT/.env"
source "$ROOT/$WEB_ENV"

echo "prepare for packaging - creating missing extra folders"
mkdir -p "$ROOT/$EXTRA_ASSETS_DIR"
mkdir -p "$ROOT/$EXTRA_PUBLIC_DIR"

echo "create empty config"
mkdir -p "$(dirname "$ROOT/$CONFIG_MAIN")"
if [ ! -f "$ROOT/$CONFIG_STCONFIG_MAINRINF" ]; then
    cat "$ROOT/$TEMPL_CONFIG_MAIN" >"$ROOT/$CONFIG_MAIN"
fi

echo "create empty deploy config"
if [ ! -f "$ROOT/$CONFIG_DEPLOY" ]; then
    cat "$ROOT/$TEMPL_CONFIG_DEPLOY" >"$ROOT/$CONFIG_DEPLOY"
fi

# TODO finish deployment write to (assets|public)/extra

echo "preparation finished"
