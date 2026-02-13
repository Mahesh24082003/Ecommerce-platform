#!/usr/bin/env bash
bash /home/tekuser/kafka_2.12-3.5.1/samp.sh
sudo bash /Scripts/Start_Xvfb_Prerequisites.sh
bash /Scripts/Start_Xvfb.sh
bash /Scripts/Start_X11-VNC.sh
bash /Scripts/ReStart_X11-VNC.sh &
bash /Scripts/Start_NoVNC.sh
bash /Scripts/Configure_Proxy_Settings.sh
sudo bash /Scripts/Start_Theia_Prerequisites.sh
bash /Scripts/Start_Theia.sh
sudo bash /Scripts/Start_JavaEval_Jar.sh
bash /Scripts/Start_Mongodb.sh
sudo bash /Scripts/Start_Mysql.sh
sudo bash /Scripts/Start_Google-Chrome.sh
bash /Scripts/ReStart_Google-Chrome.sh &
sudo bash /Scripts/Disable_Commands_To_User.sh
sudo bash /Scripts/git-safe-config.sh
sleep infinity
