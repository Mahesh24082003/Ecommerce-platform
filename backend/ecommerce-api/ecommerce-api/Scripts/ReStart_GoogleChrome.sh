#!/usr/bin/env bash

LogDIR="/var/log/TekStac/ReStart_GoogleChrome"
if ! [[ -d ${LogDIR} ]]
then
        mkdir -p ${LogDIR}
fi
LogFile=${LogDIR}/ReStart_GoogleChrome.log

while true;
do
        if [[ `ps -ef | grep /usr/bin/google-chrome | grep -v grep  | wc -l` -eq 0 ]]
        then
                bash /Scripts/Start_GoogleChrome.sh &
        fi
        sleep 5
done
