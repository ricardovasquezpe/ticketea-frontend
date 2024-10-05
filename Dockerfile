FROM ubuntu

# UPDATING UBUNTU
RUN apt-get update && apt-get install -y gnupg2
RUN apt-get upgrade -y

#INSTALLING NODEJS AND NPM
RUN apt-get -y update; apt-get -y install curl
RUN curl -s https://deb.nodesource.com/setup_18.x | bash
RUN apt-get install nodejs -y

# INSTALLING GLOBAL LIBRARIES
RUN npm install -g typescript
RUN npm install -g ts-node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./ /usr/src/app/
RUN npm install

# RUN npm run build

COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

EXPOSE  8080

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]