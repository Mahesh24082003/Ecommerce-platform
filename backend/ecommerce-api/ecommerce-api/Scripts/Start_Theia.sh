#!/usr/bin/env bash

Theia_User="tekuser"
Theia_Directory="/home/tekuser/theia-tekstac"
LogDIR="/var/log/TekStac/Start_Theia"
EFSWorkspace="/TekstacLabRoot"
LocalWorkspace="/home/tekuser/TekstacLabRoot"
tmpdir="/tmp"

if ! [[ -d ${LogDIR} ]]
then
	mkdir ${LogDIR}
fi
chmod -R 777 ${LogDIR}
chmod -R 777 ${EFSWorkspace}
chmod -R 777 ${LocalWorkspace}
chmod -R 777 ${tmpdir}
chown -R ${Theia_User}:${Theia_User} ${EFSWorkspace}
chown -R ${Theia_User}:${Theia_User} ${LocalWorkspace}
chown -R ${Theia_User}:${Theia_User} ${LogDIR}
chown -R ${Theia_User}:${Theia_User} ${tmpdir}
LogFile="${LogDIR}/Start_Theia.log"
if ! [[ -f ${LogFile} ]]
then
	touch ${LogFile}
fi
chown -R ${Theia_User}:${Theia_User} ${LogFile}
#runuser -l ${Theia_User} -c "cd /home/tekuser/theia-tekstac/examples/browser/src-gen/backend && node main.js --hostname=0.0.0.0 >> ${LogFile} 2>> ${LogFile} &"
runuser -l ${Theia_User} -c "cd /home/tekuser/theia-tekstac/ && yarn browser start --hostname 0.0.0.0 >> ${LogFile} 2>> ${LogFile} &"
#cd /home/tekuser/theia-tekstac/ && yarn browser start --hostname 0.0.0.0 >> ${LogFile} 2>> ${LogFile} &
