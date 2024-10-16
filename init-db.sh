set -e

export PGPASSWORD=mypassword

docker-entrypoint.sh postgres &

# Wait for PostgreSQL to be ready
until pg_isready -h localhost -p 5432 -U myuser; do
  echo "Waiting for PostgreSQL to start..."
  sleep 2
done

echo "PostgreSQL is ready!"

# Drop the database if it exists
psql -h localhost -U myuser -d postgres -c "DROP DATABASE IF EXISTS MyCommsPro;"

# Create a new database
psql -h localhost -U myuser -d postgres -c "CREATE DATABASE MyCommsPro;"

# Run SQL files
for f in /docker-entrypoint-initdb.d/*.sql; do
    echo "Running $f"
    psql -h localhost -U myuser -d MyCommsPro -f "$f"
done

# Keep PostgreSQL running in the foreground
wait
