FROM node:21-bullseye-slim

RUN apt update -y && apt install -y git
EXPOSE 8888
