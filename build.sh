#!/bin/sh
# Ensure permissions for node modules binaries
chmod +x client/node_modules/.bin/*
# Run the build command
npm run build --prefix client
