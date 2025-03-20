#!/bin/bash

echo "installing bun -> $BUN_DIR"
if [ ! -d "$BUN_DIR" ]; then
    echo "installing bun"
    curl -fsSl https://bun.sh/install | bash -s "bun-$BUN_VER"
fi
