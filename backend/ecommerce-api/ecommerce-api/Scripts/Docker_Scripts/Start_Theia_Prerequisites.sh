UserName="tekuser"
Log_DIR="/var/log/TekStac/Start_Theia"
if ! [[ -d ${Log_DIR} ]]
then
        mkdir -p ${Log_DIR}
fi
chown -R ${UserName} ${Log_DIR}

TekStacDirectory=/TekstacLabRoot
chmod -R 777 ${TekStacDirectory}

rm -rf /tmp/yarn*
chmod -R 777 /tmp
