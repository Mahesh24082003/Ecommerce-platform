#!/usr/bin/env bash

LogDIR="/var/log/TekStac/Start_X11-VNC"
if ! [[ -d ${LogDIR} ]]
then
        mkdir -p ${LogDIR}
fi
LogFile=${LogDIR}/Start_X11-VNC.log
export DISPLAY=:99
x11vnc -display :99 -forever -nopw -shared -noxdamage -repeat -xrandr >> ${LogFile} 2>> ${LogFile} &
