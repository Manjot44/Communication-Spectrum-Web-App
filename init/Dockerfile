FROM postgres:17

# Copy SQL files and init script into the container
COPY ./init-db.sh /docker-entrypoint-initdb.d/init-db.sh

# Make the init script executable
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh

EXPOSE 5432

# Use the init-db.sh script as the entrypoint
CMD ["bash", "/docker-entrypoint-initdb.d/init-db.sh"]
