#!/bin/bash

# Define MySQL service name
MYSQL_SERVICE="mysql"

# Ensure the necessary MySQL directories exist
if [ ! -d "/var/lib/mysql" ]; then
    echo "Creating MySQL data directory..."
    sudo mkdir -p /var/lib/mysql
    sudo chown -R mysql:mysql /var/lib/mysql
fi

if [ ! -d "/var/run/mysqld" ]; then
    echo "Creating MySQL runtime directory..."
    sudo mkdir -p /var/run/mysqld
    sudo chown -R mysql:mysql /var/run/mysqld
fi

# Check if MySQL is already running
if pgrep mysqld > /dev/null; then
    echo "MySQL is already running."
else
    echo "Starting MySQL service..."
    sudo service $MYSQL_SERVICE start
fi

# Run MySQL in the background as 'mysql' user
echo "Running MySQL in background."
sudo /usr/bin/mysqld_safe --datadir=/var/lib/mysql --user=mysql &

# Wait for MySQL to start properly
sleep 2

# Check MySQL status
if pgrep mysqld > /dev/null; then
    echo "MySQL started successfully."
else
    echo "MySQL failed to start. Check logs."
    exit 1
fi


#/usr/bin/mysqld_safe --user=mysql &

