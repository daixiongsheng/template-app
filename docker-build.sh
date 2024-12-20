#!/bin/bash
name=`sed -n 's/.*"name": *"\([^"]*\)".*/\1/p' package.json`
docker build -t $name:1.0.0 .


