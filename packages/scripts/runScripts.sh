#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
PASS_EMOJI='\xE2\x9C\x85'
FAIL_EMOJI='\xE2\x9D\x8C'
RESET='\e[0m'

exitCode=0

currentDir=$(
  cd $(dirname "$0")
  pwd
)

sh $currentDir/prettier.sh

if [ $? != 0 ]
then
    exitCode=1
fi

sh $currentDir/lint.sh

if [ $? != 0 ]
then
    exitCode=1
fi

if [ $exitCode == 0 ]; 
then
  printf "${GREEN} ${PASS_EMOJI} Everything is looking fine ${RESET}"
else
  printf "${RED} ${FAIL_EMOJI} Everything is not looking fine ${RESET}"
fi

exit ${exitCode}
