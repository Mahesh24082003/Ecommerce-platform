#!/usr/bin/env bash

LogFile="/var/log/TekStac/Start_X11-VNC/ReStart_X11-VNC.out.log"
while true; 
do
    if [[ `ps -ef | grep "x11vnc -rfbport 5900 -display :99 -forever -nopw -noxdamage -shared" | grep -v grep | wc -l` -eq 0 ]]
    then    
	echo "`date +%F_%T` Start_X11-VNC Service is not Running" >> ${LogFile}
	echo "`date +%F_%T` Starting Start_X11-VNC Service" >> ${LogFile}
	bash /Scripts/Start_X11-VNC.sh
    else
	echo "`date +%F_%T` Start_X11-VNC Service is Already Running" >> ${LogFile}
    fi
    sleep 60
done
