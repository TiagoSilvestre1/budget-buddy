# budget-buddy
Budget buddy is a concept application developed for personal project management

# Run project

## Development mode

Build project:
```
sudo docker compose build
```

Run project:
```
sudo docker compose up
```

Frontend will be visible at `172.16.238.10:8080` and backend at `172.16.238.11:3000`
## Production mode

### Build

Build project:
```
sudo docker compose -f docker-compose.yml -f docker-compose-prod.yml build
```
Run project:
```
sudo docker compose -f docker-compose.yml -f docker-compose-prod.yml up
```