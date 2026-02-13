#!/usr/bin/env bash

export DISPLAY=:99
#dbus-daemon --system --fork &
#export XDG_RUNTIME_DIR=/run/user/$(id -u)
#rm -rf /root/.config/google-chrome
#/usr/bin/google-chrome --no-first-run --start-maximized --flag-switches-begin --flag-switches-end --no-sandbox >> /var/log/SupervisorD/Start_Google-Chrome/Start_Google-Chrome.out.log 2>> /var/log/SupervisorD/Start_Google-Chrome/Start_Google-Chrome.err.log &
#/usr/bin/google-chrome --no-first-run --start-maximized --flag-switches-begin --flag-switches-end --no-sandbox --disable-gpu -window-size=1920,1080 --window-position=0,0 --force-device-scale-factor=1 &

pkill -i google-chrome
Resolution=`cat /opt/Scripts/Resolution.txt | grep -v ^#`
Width=`echo ${Resolution} | cut -d 'x' -f 1`
Hight=`echo ${Resolution} | cut -d 'x' -f 2`
#runuser -l chromeuser -c "export DISPLAY=:99 && /usr/bin/google-chrome --no-sandbox --no-first-run --disable-gpu --window-position=0,0 --start-maximized --force-device-scale-factor=1 --disable-dev-shm-usage --enable-unsafe-swiftshader >> /var/log/SupervisorD/Start_Google-Chrome/Start_Google-Chrome.log 2>> /var/log/SupervisorD/Start_Google-Chrome/Start_Google-Chrome.log" 
runuser -l chromeuser -c "export DISPLAY=:99 && /usr/bin/google-chrome --no-sandbox --no-first-run --disable-gpu -window-size=${Width},${Hight} --window-position=0,0 --start-maximized --force-device-scale-factor=1 --disable-dev-shm-usage --enable-unsafe-swiftshader >> /var/log/SupervisorD/Start_Google-Chrome/Start_Google-Chrome.log 2>> /var/log/SupervisorD/Start_Google-Chrome/Start_Google-Chrome.log" 

