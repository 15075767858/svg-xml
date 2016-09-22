#!/usr/bin/env bash
rm -rf resources/devsinfo
cp -R devsinfo/ resources/devsinfo
/Users/liuzhencai/bin/Sencha/Cmd/5.1.3.61/sencha app build
cd /Library/WebServer/Documents/program/build/production
tar czvf program.tar.gz program
open .
