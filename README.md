# Flight Planner App

This is a full-stack flight planner application with a React + Vite frontend
and a Spring Boot backend with a PostgreSQL database.


##  Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (for local frontend dev)
- [Java 21+](https://www.oracle.com/ee/java/technologies/downloads/) (for local backend dev)

---

###  Installation

#### Using Docker (recommended)

```bash
docker-compose up --build
```

Frontend will be available at: http://localhost:5173

Backend will be available at: http://localhost:8080

PostgreSQL is available at: localhost:5433, DB: flightdb, User: postgres, Password: kapsas55

### Local Dev (no Docker)
Frontend:

```
cd frontend
```
````
npm install
````
````
npm run dev
````

Backend:
````
./gradlew bootRun
````

### Tech Stack
#### Frontend: 
- React 19 + Typescript
- Vite 
- Tailwind CSS
- MUI

#### Backend: 
- Spring Boot 3
- Java 21 
- PostgreSQL

#### Dev Tools:
- Docker Compose
- Gradle

### Flight generation.
- 200 random flights are generated. 
- The departure dates generated will be from current date + 30 days. So keep that in mind when searching for flights.
- There are 8 departure and destination cities and the to-from pairs are generated randomly.
- If you want to add more departure/destination cities or want to add a longer date window you have to modify ```/backend/src/main/java/com.example.flightplanner/config/FlightDataGenerator```

### Dynamic filtering
This app uses dynamic filtering, which means that many frontend filter components (e.g., price range, layover count, flight duration) trigger backend API calls as the user interacts with them — especially on desktop, where filters apply in real-time.

#### In a real-world production scenario, it's important to:
- Add loading indicators while data is being fetched.

- Consider debouncing input or batch-updating filters to avoid excessive API requests.

- Implement server-side caching or pagination for performance and scalability.

For this demo project, the filters are designed to demonstrate dynamic interactivity and flexibility in flight search behavior.

### App introduction
This app simulates a modern flight booking experience. On startup, the backend generates a randomized 
flight database using a FlightDataGenerator class — creating flights with various destinations, prices, times, and durations.
The frontend allows users to search for flights, apply filters like destination, layovers, time of day, and more, and then proceed to seat selection.
Seats are displayed in a airplane seat map, and the seat occupancy is generated randomly by the backend. 
Users can apply seat preferences such as window, legroom, near exit, or adjacent seating for 2-3 people.

### See development.md for progress history, code architecture decisions, challenges, and AI-assisted parts.

