FROM node:lts-alpine

WORKDIR /back

COPY package*.json ./

RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
#RUN npm run build

ARG NODE_ENV=dev

# Check if build argument is 'production'
RUN if [ "$NODE_ENV" = "prod" ]; then \
        npm run build;  \
    fi

EXPOSE 3000

