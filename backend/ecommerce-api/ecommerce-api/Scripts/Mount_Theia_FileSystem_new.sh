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

Theia_Local_UserName="tekuser"
ResponseCode_1=`curl -o /dev/null -s -w "%{http_code}\n" http://169.254.169.254/latest/meta-data/tags/instance/EFS_URL`
if [[ ${ResponseCode_1} -ne 200 ]]
then
	echo "Unable To Get Instance Tag Value" >> ${LogFile}
        echo "Getting Error Response Code ${ResponseCode}" >> ${LogFile}
	echo "Stopping Theia Service" >> ${LogFile}
	systemctl stop Theia >> ${LogFile} 2>> ${LogFile}
else
	FileSystemID=`curl http://169.254.169.254/latest/meta-data/tags/instance/EFS_URL 2> /dev/null`
        if [[ -z ${FileSystemID} ]]
        then
                echo "FileSystemID Value is null unable to process" >> ${LogFile}
		echo "Stopping Theia Service" >> ${LogFile}
		systemctl stop Theia >> ${LogFile} 2>> ${LogFile}
        else
                echo "FileSystemID=${FileSystemID}" >> ${LogFile}
		if [[ `df -h | grep ${EFS_Mount_Point} | wc -l` -eq 0 ]]
		then
        		echo "EFS Not Mounted" >> ${LogFile}
        		echo "Mounting EFS File System" >> ${LogFile}
			mount -t efs -o tls "${FileSystemID}":/ ${EFS_Mount_Point} >> ${LogFile} 2>> ${LogFile}
			if [[ $? -ne 0 ]]
			then
				echo "Unable to Mount FileSystem ${FileSystemID}" >> ${LogFile}
				echo "Terminating the Script Execution" >> ${LogFile}
				exit 1
			fi
		else
       			df -h | grep ${EFS_Mount_Point}  >> ${LogFile} 2>> ${LogFile}
        		echo "EFS Alread Mounted" >> ${LogFile}
		fi
		ResponseCode_2=`curl -o /dev/null -s -w "%{http_code}\n" http://169.254.169.254/latest/meta-data/tags/instance/UserID`
		if [[ ${ResponseCode_2} -ne 200 ]]
		then
			echo "Unable To Get Instance Tag Value" >> ${LogFile}
        		echo "Getting Error Response Code ${ResponseCode}" >> ${LogFile}
			echo "Stopping Theia Service" >> ${LogFile}
			systemctl stop Theia >> ${LogFile} 2>> ${LogFile}
		else
        		UserID=`curl http://169.254.169.254/latest/meta-data/tags/instance/UserID 2> /dev/null`
        		if [[ -z ${UserID} ]]
        		then
                		echo "UserID Value is null unable to process" >> ${LogFile}
				echo "Stopping Theia Service" >> ${LogFile}
				systemctl stop Theia >> ${LogFile} 2>> ${LogFile}
        		else
                		echo  "UserID=${UserID}" >> ${LogFile}
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
        fi
fi
echo -e "########################`date +%F_%T`###########################\n" >> ${LogFile}

tail -20 ${LogFile}
