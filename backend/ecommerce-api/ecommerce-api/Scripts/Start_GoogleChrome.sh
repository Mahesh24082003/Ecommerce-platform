#!/usr/bin/env bash

export DISPLAY=:99

UserName="tekuser"
Log_DIR="/var/log/TekStac/Start_Google-Chrome"


if ! [[ -d ${Log_DIR} ]]
then
        mkdir -p ${Log_DIR}
fi
chown -R ${UserName} ${Log_DIR}
Log_File=${Log_DIR}/Start_Google-Chrome.log

Resolution=`cat /Scripts/Resolution.txt | grep -v ^#`
Width=`echo ${Resolution} | cut -d 'x' -f 1`
Hight=`echo ${Resolution} | cut -d 'x' -f 2`
rm -rf /home/${UserName}/.config/google-chrome/
runuser -l ${UserName} -c "export DISPLAY=:99 && /usr/bin/google-chrome --no-sandbox --no-first-run --disable-gpu -window-size=${Width},${Hight} --window-position=0,0 --start-maximized --force-device-scale-factor=1 --disable-dev-shm-usage --enable-unsafe-swiftshader >> ${Log_File} 2>> ${Log_File}" 
