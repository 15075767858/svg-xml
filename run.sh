#!/usr/bin/env bash
rm -rf resources/devsinfo
rm -rf resources/devxml


cp -R devsinfo/ resources/devsinfo

cp -R devxml/ resources/devxml

/Users/liuzhencai/bin/Sencha/Cmd/5.1.3.61/sencha app build
cd /Library/WebServer/Documents/program/build/production
tar czvf program.tar.gz program
open .
