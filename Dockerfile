FROM node:carbon

ENV MONGO_HOST=localhost
ENV MONGO_PORT=27017
ENV MONGO_DB=senz


# Create app directory
WORKDIR /usr/src/app


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install env-docker --save-dev

# If you are building your code for production
#RUN npm install --only=production

# Bundle app source
COPY . .


EXPOSE 3002
CMD [ "npm", "start" ]