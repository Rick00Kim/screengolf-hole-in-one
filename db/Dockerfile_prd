FROM mongo:5.0

# Environment variables for Initializing DB
# Mongodb Global variables
ENV MONGO_INITDB_ROOT_USERNAME $MONGO_INIT_USER
ENV MONGO_INITDB_ROOT_PASSWORD $MONGO_INIT_PASS

# Environment variables
ENV TARGET_DATABASE $DATABASE_NAME
ENV TARGET_USERNAME $DATABASE_USER
ENV TARGET_PASSWORD $DATABASE_PASS

# Copy Initialize file
COPY ./init.sh /docker-entrypoint-initdb.d/init.sh

EXPOSE 27017
