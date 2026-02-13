#!/usr/bin/env bash

LogFile="/var/log/TekStac/Start_JavaEval_Jar/ReStart_JavaEval_Jar.out.log"
while true; 
do
    if [[ `ps -ef | grep "/usr/bin/java -jar /Software/JavaEval.war" | grep -v grep | wc -l` -eq 0 ]]
    then    
	echo "`date +%F_%T` JavaEval_Jar Service is not Running" >> ${LogFile}
	echo "`date +%F_%T` Starting JavaEval_Jar Service" >> ${LogFile}
	bash /Scripts/Start_JavaEval_Jar.sh
    else
	echo "`date +%F_%T` JavaEval_Jar Service is Already Running" >> ${LogFile}
    fi
    sleep 5
done
