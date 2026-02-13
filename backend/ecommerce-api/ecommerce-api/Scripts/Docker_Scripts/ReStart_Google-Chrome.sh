#!/usr/bin/env bash

while true; 
do
    if [[ `ps -ef | grep "/opt/google/chrome/chrome" | grep -v grep | wc -l` -eq 0 ]]
    then    
	sudo bash /Scripts/Start_Google-Chrome.sh
    fi
    sleep 5
done
