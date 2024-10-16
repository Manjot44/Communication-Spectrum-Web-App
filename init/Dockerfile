FROM postgres:latest

# Copy SQL files and init script into the container
COPY ./init/ /docker-entrypoint-initdb.d/
COPY ./init-db.sh /docker-entrypoint-initdb.d/init-db.sh

# Make the init script executable
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh

# Use the init-db.sh script as the entrypoint
CMD ["sh", "/docker-entrypoint-initdb.d/init-db.sh"]
