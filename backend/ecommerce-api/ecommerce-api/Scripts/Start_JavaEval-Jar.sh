#!/usr/bin/env bash

LogDIR="/var/log/TekStac/Start_JavaEval-Jar"

if ! [[ -d ${LogDIR} ]]
then
        mkdir -p ${LogDIR}
fi
LogFile=${LogDIR}/Start_JavaEval-Jar.log

echo -e "\n##########_Start_Date_`date +%F_%T`_############\n" >> ${LogFile} 
/usr/bin/java -jar /Software/JavaEval.war >> ${LogFile} 2>> ${LogFile} &

