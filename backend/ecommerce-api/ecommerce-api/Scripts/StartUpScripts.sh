#!/usr/bin/env bash

bash /Scripts/Start_Xvfb.sh
bash /home/tekuser/kafka_2.12-3.5.1/kafka_start_script.sh
sleep 5
bash /Scripts/Start_X11-VNC.sh
bash /Scripts/Start_NoVNC.sh
bash /Scripts/Disable_Commands_To_User.sh
bash /Scripts/git-safe-config.sh
bash /Scripts/Start_GoogleChrome.sh &
bash /Scripts/Mount_Theia_FileSystem.sh
sleep 5
bash /Scripts/ReStart_GoogleChrome.sh &
