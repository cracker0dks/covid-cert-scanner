#!/bin/bash
echo "GOGO FOR THE LIVE BUILD!"
git pull
docker build -t cov .
docker rm -f cov
docker run -it --restart=always -d --network=dockernet --name=cov -p 4567:8080 cov
echo "-<-<-< DONE ->->->"
echo "REMOVING UNTAGged DOCKER IMAGES"
docker rmi -f $(docker images | grep "<none>" | awk "{print \$3}")
