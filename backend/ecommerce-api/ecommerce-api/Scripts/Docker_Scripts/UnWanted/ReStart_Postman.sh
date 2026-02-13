#!/usr/bin/env bash

while true;
do
	if [[ `ps -ef | grep /usr/bin/postman | grep -v grep  | wc -l` -eq 0 ]] && [[ `supervisorctl status Start_Postman | grep EXITED | grep -v grep | wc -l` -eq 1 ]]
	then
		#supervisorctl start Start_Postman
	fi
	sleep 5
done

