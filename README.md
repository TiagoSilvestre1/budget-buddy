# Budget Buddy
Budget Buddy is a concept application developed for personal project management.

## Prerequisites
Before getting started, you'll need to have Docker and Docker Compose installed on your machine. If you don't have these tools installed, please follow the installation instructions below:

- **Docker:** Docker is a platform for developing, shipping, and running applications using containers. To install Docker, follow the instructions for your operating system at [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/).
- **Docker Compose:** Docker Compose is a tool for defining and running multi-container Docker applications. To install Docker Compose, follow the instructions for your operating system at [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).

## Run project
### Development mode
Build and run the project in development mode:
```
sudo docker compose build
sudo docker compose up
```

The application will start in watch mode, allowing you to make changes to the code and see the updates in real time. 

The frontend can be accessed at `http://172.16.238.10:8080`, and the backend at `http://172.16.238.11:3000`.

### Production mode

Build and run the project in production mode:
```
sudo docker compose -f docker-compose.yml -f docker-compose-prod.yml build
sudo docker compose -f docker-compose.yml -f docker-compose-prod.yml up
```
In production mode, the application will not be in watch mode and any changes to the code will require rebuilding and redeploying the containers.