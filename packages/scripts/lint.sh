#!/usr/bin/env bash

export NODE_OPTIONS="--max-old-space-size=4096"

printf "Running Lint for your code...\n"

CHANGED_FILES=`git diff --diff-filter=AM --name-only --cached | egrep "\.[jt]s(x?)$"`

FAIL_EMOJI='\xF0\x9F\x98\x9E'
PASS_EMOJI='\xF0\x9F\x98\x8C'
RED='\033[0;31m'
GREEN='\033[0;32m' 
RESET='\e[0m'

printf "$CHANGED_FILES\n"

error=false
if [ -z "$CHANGED_FILES" ]
then
  printf "No JavaScript or TypeScript files changed!\n"
  exit 0
else
  eslint ${CHANGED_FILES} $1
  if [ $? -ne 0 ]; then
    error=true
  fi

  if [ "$error" = true ]; then
      printf "${RED}lint errors found. ${FAIL_EMOJI} ${RESET}\n"
      exit 1
  else
      printf "${GREEN}No lint errors found! ${PASS_EMOJI} ${RESET}\n"
  fi
fi
