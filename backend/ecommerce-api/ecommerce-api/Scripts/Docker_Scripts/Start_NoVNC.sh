#!/usr/bin/env bash

Log_DIR="/var/log/TekStac/Start_NoVNC"
if ! [[ -d ${Log_DIR} ]]
then
        mkdir -p ${Log_DIR}
fi
Log_File=${Log_DIR}/Start_NoVNC.out.log
export DISPLAY=:99
#/opt/noVNC/utils/novnc_proxy --vnc localhost:5900 --listen 6080 >> /var/log/SupervisorD/Start_NoVNC/Start_NoVNC.out.log 2>> /var/log/SupervisorD/Start_NoVNC/Start_NoVNC.err.log &
#/opt/noVNC-1.5.0/utils/novnc_proxy --vnc localhost:5900 --listen 6080 >> ${Log_File} 2>> ${Log_File} &
/opt/noVNC_Senthil/utils/novnc_proxy --vnc localhost:5900 --listen 6080 >> ${Log_File} 2>> ${Log_File} &
