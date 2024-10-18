#!/bin/bash

set -e

# Start PostgreSQL
docker-entrypoint.sh postgres &

# Get the PID of the PostgreSQL process
PG_PID=$!

# Function to handle shutdown
shutdown() {
  echo "Creating a dump file..."
  pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --data-only -f "/docker-entrypoint-initdb.d/init_files/zdump.sql"
  echo "Shutting down PostgreSQL..."
  kill $PG_PID
  wait $PG_PID
  echo "PostgreSQL shutdown complete."
}

# Trap termination signals
trap shutdown SIGINT SIGTERM

# Wait for PostgreSQL to be ready
until pg_isready -h localhost -p 5432 -U $POSTGRES_USER; do
  echo "Waiting for PostgreSQL to start..."
  sleep 2
done

echo "PostgreSQL is ready!"

# Drop the database if it exists
psql -h localhost -U $POSTGRES_USER -d postgres -c "DROP DATABASE IF EXISTS $POSTGRES_DB;"

# Create a new database
psql -h localhost -U $POSTGRES_USER -d postgres -c "CREATE DATABASE $POSTGRES_DB;"

# Run SQL files
for f in /docker-entrypoint-initdb.d/init_files/*.sql; do
    echo "Running $f"
    psql -h localhost -U $POSTGRES_USER -d $POSTGRES_DB -f "$f"
done

# Keep PostgreSQL running in the foreground
wait $PG_PID
