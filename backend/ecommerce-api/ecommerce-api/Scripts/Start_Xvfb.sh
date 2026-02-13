#!/usr/bin/env bash

LogDIR="/var/log/TekStac/Start_Xvfb"
if ! [[ -d ${LogDIR} ]]
then
        mkdir -p ${LogDIR}
fi
LogFile=${LogDIR}/Start_Xvfb.log
export DISPLAY=:99
if [[ -f /tmp/.X99-lock ]]
then
        rm -rf /tmp/.X99-lock
fi
Resolution=`cat /Scripts/Resolution.txt | grep -v ^#`
Xvfb :99 -screen 0 ${Resolution} -dpi 96 -fbdir /var/tmp +extension RANDR >> ${LogFile} 2>> ${LogFile} &
