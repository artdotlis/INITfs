#!/bin/sh

set -e
mongosh -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" <<EOF
use $MONGO_DATABASE
db.createUser({
    user: '$MONGO_USER_NAME',
    pwd:  '$MONGO_USER_PASSWORD',
    roles: [{
        role: 'readWrite',
        db: '$MONGO_DATABASE'
    }]
})

EOF
