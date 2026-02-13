#!/usr/bin/env bash

Log_DIR="/var/log/TekStac/Start_X11-VNC"
if ! [[ -d ${Log_DIR} ]]
then
        mkdir -p ${Log_DIR}
fi
Log_File=${Log_DIR}/Start_X11-VNC.out.log
export DISPLAY=:99
sleep 5
x11vnc -rfbport 5900 -display :99 -forever -nopw -noxdamage -shared >> ${Log_File} 2>> ${Log_File} &
#Resolution=`cat /Scripts/Resolution.txt | grep -v ^#`
#x11vnc -display :99 -forever -noxdamage -repeat -xrandr -clip ${Resolution} >> /var/log/SupervisorD/Start_X11-VNC/Start_X11-VNC.out.log 2>> /var/log/SupervisorD/Start_X11-VNC/Start_X11-VNC.err.log &
