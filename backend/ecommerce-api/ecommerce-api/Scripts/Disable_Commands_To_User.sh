#!/bin/bash

sudo setfacl -m u:tekuser:--- /usr/bin/rm
sudo setfacl -m u:tekuser:--- /usr/bin/rmdir
sudo setfacl -m u:tekuser:--- /usr/bin/mv
sudo setfacl -m u:tekuser:--- /usr/bin/chmod

