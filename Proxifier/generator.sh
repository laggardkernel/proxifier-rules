#!/bin/bash

for ITEM in *.ppx; do
    rm -f ../"$ITEM"
    cat "$ITEM" | tr -d '\n' | tr -s ' '| sed 's/; /;/g' > ../"$ITEM"
done
