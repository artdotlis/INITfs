#!/bin/bash

ROOT="$(dirname "$(realpath "$0")")/../.."
source "$ROOT/.env"

echo "prepare for packaging"
mkdir -p "$ROOT/$EXTRA_DIR"
# TODO fill if required
# [ "$(ls -A "$ROOT/$EXTRA_DIR")" ] || rm -rf "$ROOT/$EXTRA_DIR"

mkdir -p "$(dirname "$ROOT/$CONFIG_MAIN")"
echo "create empty config"
if [ ! -f "$ROOT/$CONFIG_STCONFIG_MAINRINF" ]; then
    cat "$ROOT/$TEMPL_CONFIG_MAIN" >"$ROOT/$CONFIG_MAIN"
fi

echo "preparation finished"
