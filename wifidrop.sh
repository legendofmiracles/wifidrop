#!/bin/sh
cd /home/legendofmiracles/programming/nodejs/wifidrop
echo $(ip route list | grep link)
trap "fuser -k 8080/tcp & echo killed all processes so that you can return sometime without anoying errors" 2
node .
