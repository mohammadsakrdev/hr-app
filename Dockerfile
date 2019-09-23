# version of node to use
FROM node:11.5.0

ENV NODE_ENV="prod"

# define working directory for docker
WORKDIR /usr/src/app
# copy all our source code into the working directory
COPY . .
# install npm dependencies and pm2
RUN npm install --only=production && npm install -g pm2
# expose port 3000 for our server to run on
EXPOSE 3002

# start command as per package.json
CMD ["pm2-runtime", "start", "app.js"]
