#!/bin/bash

REG="abstractmatter/argent";
TAG=$(date '+%Y%m%d%H%M');

BUILD="$REG:$TAG";
LATEST="$REG:latest";

docker buildx create --use
docker buildx build . -f Dockerfile.prebuilt --platform linux/amd64,linux/arm64 -t $BUILD, --push
docker buildx build . -f Dockerfile.prebuilt --platform linux/amd64,linux/arm64 -t $LATEST --push

