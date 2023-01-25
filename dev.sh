#Remove orphaned containers
docker-compose --file docker-compose.dev.yml rm -f

#Remove orphaned volumes
yes | docker volume prune -f

#Remove orphaned images
yes | docker image prune -f

#Remove orphaned networks
yes | docker network prune -f

#Remove orphaned build cache
yes | docker builder prune -f

# Remove all untagged images
yes | docker rmi $(docker images -q -f dangling=true)

# Remove all unused networks
yes | docker network prune

# Remove all unused volumes
yes | docker volume prune

# Remove all unused images
yes | docker image prune

# Remove all unused build cache
yes | docker builder prune
# stop docker-compose
docker-compose --file docker-compose.dev.yml down

# Build docker-compose
docker-compose --file docker-compose.dev.yml build

# start docker-compose
docker-compose --file docker-compose.dev.yml up -d
# logs for service
docker-compose --file docker-compose.dev.yml logs -f claims
