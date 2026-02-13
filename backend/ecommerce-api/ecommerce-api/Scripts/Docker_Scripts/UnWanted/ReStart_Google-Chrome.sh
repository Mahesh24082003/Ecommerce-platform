#!/usr/bin/env bash

while true;
do
	if [[ `ps -ef | grep /usr/bin/google-chrome | grep -v grep  | wc -l` -eq 0 ]] && [[ `supervisorctl status Start_Google-Chrome | grep EXITED | grep -v grep | wc -l` -eq 1 ]]
	then
		supervisorctl start Start_Google-Chrome
	fi
	sleep 5
done

