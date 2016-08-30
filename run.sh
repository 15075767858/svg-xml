#!/usr/bin/env bash
/Users/liuzhencai/bin/Sencha/Cmd/5.1.3.61/sencha app build
cd /Library/WebServer/Documents/program/build/production
tar czvf program.tar.gz program
open .