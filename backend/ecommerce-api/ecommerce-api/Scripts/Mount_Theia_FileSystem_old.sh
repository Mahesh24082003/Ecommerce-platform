#!/bin/bash

Log_DIR="/var/log/TekStac/Mount_Theia_FileSystem"


if ! [[ -d ${Log_DIR} ]]
then
        mkdir -p ${Log_DIR}
fi
LogFile=${Log_DIR}/Mount_Theia_FileSystem.log
echo -e "\n########################`date +%F_%T`###########################" >> ${LogFile}

EFS_Mount_Point="/Theia_EFS"
if ! [[ -d ${EFS_Mount_Point} ]]
then
	mkdir ${EFS_Mount_Point}
fi
Theia_User_Mount_Point="/TekstacLabRoot"
if ! [[ -d ${Theia_User_Mount_Point} ]]
then
	mkdir ${Theia_User_Mount_Point}
fi

#Teknoturf-Demo5-EFS
FileSystemID="ap-south-1a.fs-0736fc001e5c84fbf.efs.ap-south-1.amazonaws.com"
#Trial1-EFS
##FileSystemID="ap-south-1a.fs-095ae82384d6d4360.efs.ap-south-1.amazonaws.com"
#Wipro-EFS
#FileSystemID="ap-south-1a.fs-0c56ad55e4ab1508e.efs.ap-south-1.amazonaws.com"
Theia_Local_UserName="tekuser"

if [[ `df -h | grep ${EFS_Mount_Point} | wc -l` -eq 0 ]]
then
        echo "EFS Not Mounted" >> ${LogFile}
        echo "Mounting EFS File System" >> ${LogFile}
	mount -t efs -o tls "${FileSystemID}":/ ${EFS_Mount_Point} >> ${LogFile} 2>> ${LogFile}
else
        df -h | grep ${EFS_Mount_Point}  >> ${LogFile} 2>> ${LogFile}
        echo "EFS Alread Mounted" >> ${LogFile}
fi
ResponseCode=`curl -o /dev/null -s -w "%{http_code}\n" http://169.254.169.254/latest/meta-data/tags/instance/UserID`
if [[ ${ResponseCode} -ne 200 ]]
then
	echo -e "\nUnable To Get Instance Tag Value" >> ${LogFile}
        echo -e "\nGetting Error Response Code ${ResponseCode}" >> ${LogFile}
	echo -e "\nStopping Theia Service" >> ${LogFile}
	systemctl stop Theia >> ${LogFile} 2>> ${LogFile}
else
        UserID=`curl http://169.254.169.254/latest/meta-data/tags/instance/UserID 2> /dev/null`
        if [[ -z ${UserID} ]]
        then
                echo "UserID Value is null unable to process" >> ${LogFile}
		echo -e "\nStopping Theia Service" >> ${LogFile}
		systemctl stop Theia >> ${LogFile} 2>> ${LogFile}
        else
                echo "UserID=${UserID}"
                test -d ${EFS_Mount_Point}/${UserID}
                if [[ $? -ne 0 ]]
                then
                        echo "Creating Directory ${EFS_Mount_Point}/${UserID}" >> ${LogFile}
                        mkdir ${EFS_Mount_Point}/${UserID} >> ${LogFile} 2>> ${LogFile}
			echo "Unmounting EFS_Mount_Point ${EFS_Mount_Point}" >> ${LogFile}
			umount ${EFS_Mount_Point} >> ${LogFile} 2>> ${LogFile}
                else
                        echo "Directory ${EFS_Mount_Point}/${UserID} is Already Exist" >> ${LogFile}
			echo "Unmounting EFS_Mount_Point ${EFS_Mount_Point}" >> ${LogFile}
			umount ${EFS_Mount_Point} >> ${LogFile} 2>> ${LogFile}
                fi
                if [[ `df -h | grep ${Theia_User_Mount_Point} | wc -l` -eq 0 ]]
                then
                        echo "Mounting EFS User Directory "${FileSystemID}:/${UserID}" on ${Theia_User_Mount_Point}" >> ${LogFile}
			mount -t efs -o tls "${FileSystemID}":/${UserID} ${Theia_User_Mount_Point} >> ${LogFile} 2>> ${LogFile}
                        if [[ $? -ne 0 ]]
                        then
                                echo "Unable to Mount EFS User Directory on ${Theia_User_Mount_Point}" >> ${LogFile}
				echo -e "\nStopping Theia Service" >> ${LogFile}
				systemctl stop Theia >> ${LogFile} 2>> ${LogFile}
			else
				chown -R ${Theia_Local_UserName}:${Theia_Local_UserName} ${Theia_User_Mount_Point}
			fi
                else
                        df -h | grep ${Theia_User_Mount_Point}
                        echo "Theia_User_Mount_Point ${Theia_User_Mount_Point} Already Mounted" >> ${LogFile}
                fi
        fi
fi
echo -e "########################`date +%F_%T`###########################\n" >> ${LogFile}

tail -20 ${LogFile}
