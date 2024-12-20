#!/bin/bash
name=`sed -n 's/.*"name": *"\([^"]*\)".*/\1/p' package.json`
docker run -d -p 6700:6700 $name:1.0.0


