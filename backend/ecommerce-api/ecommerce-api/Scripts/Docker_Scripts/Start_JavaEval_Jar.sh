#!/usr/bin/env bash

Log_DIR="/var/log/TekStac/Start_JavaEval_Jar"

if [[ ! -d "$Log_DIR" ]]; 
then
        mkdir -p ${Log_DIR}
fi
Log_File=${Log_DIR}/Start_JavaEval_Jar.out.log

if ! [[ -d "/opt/Test" ]]
then
	mkdir "/opt/Test"
fi
chown root:root "/opt/Test"
chmod 700 "/opt/Test"
chown root:root "/opt"
chmod 755 "/opt"
/usr/bin/java -jar /Software/JavaEval.war >> ${Log_File} 2>> ${Log_File} &
