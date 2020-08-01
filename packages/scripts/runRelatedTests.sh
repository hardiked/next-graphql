#!/usr/bin/env bash

EXTENSION_REGEX=".(js|jsx|json|yml|yaml|ts|tsx|md|graphql)$"

printf "Running related tests for changed files...\n"

STAGED_FILES=`git diff --diff-filter=AM --name-only | grep -E "\.[jt]s(x?)$"`

FAIL_EMOJI='\xF0\x9F\x98\x9E'
PASS_EMOJI='\xF0\x9F\x98\x8C'
NO_TESTS_EMOJI='\xF0\x9F\x98\x8D'
RED='\033[0;31m'
GREEN='\033[0;32m' 
RESET='\e[0m'

# reading output of STAGED_FILES command in array
# https://stackoverflow.com/questions/11426529/reading-output-of-a-command-into-an-array-in-bash
IFS=$'\n' read -r -d '' -a CHANGED_FILES <<< "$STAGED_FILES"

if [ "${#CHANGED_FILES[@]}" -eq "0" ]
then
  printf "${GREEN}No Javascript or Typescript files changed ${NO_TESTS_EMOJI} ${RESET}\n"
  exit 0;
fi

jest --findRelatedTests "${CHANGED_FILES[@]}" "$@"

if [ $? -ne 0 ]; then
  printf "${RED}Errors found in tests. ${FAIL_EMOJI}${RESET} \n"
  exit 1
else
  printf "${GREEN} All related tests passed ${PASS_EMOJI} ${RESET} \n"
fi