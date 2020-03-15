#!/bin/sh
SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
cd $SCRIPTPATH
trap "fuser -k 8080/tcp & echo killed all processes so that you can return sometime without anoying errors" 2
node .
