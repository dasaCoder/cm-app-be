# Contacts API

A RESTful API for managing contacts built with NestJS and PostgreSQL.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- npm or yarn package manager

## Project Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dasaCoder/cm-app-fe
   cd contacts-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create table and insert mock data**
   Table will be created automatically when the container is started.
   ```sql
   -- Create contacts table
   DROP TABLE IF EXISTS contacts;

   CREATE TABLE IF NOT EXISTS contacts (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       phone VARCHAR(50),
       "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
   );
   ```

4. **Start the Docker containers**
   First, make sure no containers are running and remove old volumes:
   ```bash
   docker-compose down -v
   ```
   
   Then start the containers:
   ```bash
   docker-compose up --build
   ```

5. **Verify database initialization**
   In a new terminal, check if the data was loaded:
   ```bash
   docker exec -it $(docker ps -q -f name=postgres) psql -U postgres -d contacts_db 
   -c "SELECT COUNT(*) FROM contacts;"
   ```

   if you need mock data, you can you below query to insert mock data.
   ```sql
   -- Insert mock data into contacts table
   -- Insert mock data into contacts table
   INSERT INTO contacts (name, email, phone, "createdAt") VALUES
   ('John Doe', 'john.doe@example.com', '+1-555-123-4567', NOW()),
   ('Dilusha Smith', 'jane.smith@example.com', '+1-555-234-5678', NOW()),
   ('Alice Johnson', 'alice.j@example.com', '+1-555-345-6789', NOW()),
   ('Bob Wilson', 'bob.wilson@example.com', '+1-555-456-7890', NOW()),
   ('Carol Brown', 'carol.brown@example.com', '+1-555-567-8901', NOW());
   ```

## API Endpoints

### Contacts

- **GET** `/contacts` - Get all contacts
- **GET** `/contacts/:id` - Get a specific contact
- **POST** `/contacts` - Create a new contact
- **PUT** `/contacts/:id` - Update a contact
- **DELETE** `/contacts/:id` - Delete a contact

### Request Body Format

For POST and PUT requests:
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "555-123-4567"
}
```

#### Validation Rules:
- **name**: 2-255 characters, letters and spaces only
- **email**: Valid email format
- **phone**: Optional, formats accepted:
  - US format: "555-123-4567"
  - International format: "+1555123456"

## Testing with Postman

1. Import the provided Postman collection:
   - Open Postman
   - Click "Import"
   - Select `Contacts_API.postman_collection.json`

2. The collection includes requests for all endpoints with example data

## Database Connection

To connect to the database directly:
```bash
docker exec -it postgres-15-alpine psql -U postgres -d contacts_db
```

Default credentials:
- Username: postgres
- Password: postgres
- Database: contacts_db

## Development

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Troubleshooting

1. **If containers don't start:**
   ```bash
   # Stop all containers and remove volumes
   docker-compose down -v
   
   # Rebuild and start
   docker-compose up --build
   ```

2. **If database isn't populated:**
   ```bash
   # Check PostgreSQL logs
   docker logs $(docker ps -q -f name=postgres)
   ```

3. **To reset the database:**
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

## Environment Variables

The following environment variables can be configured in `docker-compose.yml`:
```env
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=contacts_db
NODE_ENV=development
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Docker Documentation](https://docs.docker.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## License

This project is [MIT licensed](LICENSE).
