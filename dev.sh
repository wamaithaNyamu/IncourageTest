
# stop docker-compose
docker-compose --file docker-compose.dev.yml down

# Build docker-compose
docker-compose --file docker-compose.dev.yml build

# start docker-compose
docker-compose --file docker-compose.dev.yml up -d
# logs for service
docker-compose --file docker-compose.dev.yml logs -f policies-service
