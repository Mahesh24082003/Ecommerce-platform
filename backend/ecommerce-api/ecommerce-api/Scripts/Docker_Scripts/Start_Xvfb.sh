#!/usr/bin/env bash

Log_DIR="/var/log/TekStac/Start_Xvfb"
if ! [[ -d ${Log_DIR} ]]
then
        mkdir -p ${Log_DIR}
fi
Log_File=${Log_DIR}/Start_Xvfb.out.log

export DISPLAY=:99
#if [[ -f /tmp/.X99-lock ]]
#then
#	rm -rf /tmp/.X99-lock
#fi
#Xvfb :99 -screen 0 1920x1080x24 -dpi 96 >> /var/log/SupervisorD/Start_Xvfb/Start_Xvfb.out.log 2>> /var/log/SupervisorD/Start_Xvfb/Start_Xvfb.err.log &
Resolution=`cat /Scripts/Resolution.txt | grep -v ^#`
Xvfb :99 -screen 0 ${Resolution} -dpi 96 +extension RANDR -fbdir /var/tmp >> ${Log_File} 2>> ${Log_File} &
