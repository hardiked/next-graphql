#!/usr/bin/env bash

EXTENSION_REGEX=".(js|jsx|json|yml|yaml|ts|tsx|md|graphql)$"

printf "Running Prettier for your code...\n"

CHANGED_FILES=`git diff --diff-filter=AM --name-only --cached | grep -E $EXTENSION_REGEX`

FAIL_EMOJI='\xF0\x9F\x98\x9E'
PASS_EMOJI='\xF0\x9F\x98\x8C'
WINK_EMOJI='\xF0\x9F\x98\x89'
RED='\033[0;31m'
GREEN='\033[0;32m' 
RESET='\e[0m'

printf "$CHANGED_FILES\n"

error=false
if [ -z "$CHANGED_FILES" ]
then
    printf "No files changed!\n"
    exit 0
else
    yarn prettier ${CHANGED_FILES} --list-different $1
    if [ $? -ne 0 ]; then
       error=true
    fi

    if [ "$error" = true ]; then
        printf "${RED}Everything is not pretty ${FAIL_EMOJI} ${RESET} ${GREEN}Don't worry, I had fixed it ${WINK_EMOJI} ${RESET}\n${GREEN}Please verify the changes in staging area and commit again${RESET}\n"

        yarn prettier ${CHANGED_FILES} --list-different --write

        exit 1
    else
        printf "${GREEN}Everything is pretty ${PASS_EMOJI} ${RESET}\n"
    fi
fi
