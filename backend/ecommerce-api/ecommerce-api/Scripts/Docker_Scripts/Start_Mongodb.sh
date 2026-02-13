#!/bin/bash

export DISPLAY=:99

#kill -9 $(lsof -t -i :27017)
pkill -i mongo
/usr/bin/mongod --config /etc/mongod.conf --fork --logpath /var/log/mongodb/mongod.log
#/usr/bin/mongod --dbpath /data/db &
#/usr/bin/mongodb-compass --no-sandbox 
#/usr/bin/mongodb-compass --no-sandbox & sleep 2 && xdotool search --name "MongoDB Compass" windowsize 1650 1000
