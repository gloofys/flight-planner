## Documentation of development progress

### Setup 
- Chose Spring Boot and the latest java sdk version.
- For storing generated data, I chose postgreSQL. At first I tried to find API data from an airline company online,
But didn't find any reasonable free choices.
- For frontend I chose React+Typescript, as the latest projects I have been working with used those. Plus I Want to get more proficient in them.
- For css I used Tailwind.
- Also implemented docker, had not set up docker myself before, so this was a great learning opportunity.

## Workflow

I will now describe my work and thought flow.

1. Dive deep into assignment details and find flight-planners online where i could get ideas what data to use.
2. Setup front and backend.
3. Start creating database for flights. Using flightEntity.
4. For the flight details I chose to include:
- departure
- destination
- departure time
- flight duration
- price
- layovers
- airline

For the backlog:
- cabin class
- inflight amenities
- baggage allowance
- environmental impact

5. Get the flights backend running, with repository, service, controller
6. Start frontend flights list to see if data fetching from backend API works.
7. When data fetching works, I start to create filters
8. Decide to implement a search bar for fetching flights based on to, from and date
9. Create filters for price, duration, layovers and flights time of day. 
10. Decide to create dynamic filtering for desktop.
11. Spend a lot of time to set up UI filtering with context hook.
    Struggled to manage filtered metadata (min/max values) from backend.
12. Rewrote backend /metadata endpoint to return only relevant values based on current filters.
13. Adjusted frontend filters (price, duration, layovers) to react to changing backend metadata.
14. Created mobile version of filters using dialogs.
15. Refactored FlightSearchBar to allow better user experience on mobile.
16. Needed to fix logic where users saw invalid destination options—added backend /destinations?from= endpoint.
17. Created utility functions to format flight duration and dates in Estonian-friendly format.
18. Improved feedback to user when no flights match exact date—added fallback messaging to show nearest available flights.
19. Added seat generation system on backend, building Seat entity and a service that randomly generates realistic seating data (31 rows, skips row 13).
20. Created frontend seat layout: SeatRow, SeatBox, SeatSelection page.
21. Hooked seat filtering to React context, similar to flight filters.
22. Implemented filtering for window seats, extra legroom, and near-exit options.
23. Created desktop and mobile versions of seat filters, added sticky UI for desktop.
24. Added logic to enforce selecting the correct number of seats based on passenger count.
25. Integrated adjacent seat filtering—took a while to get the logic right and understand edge cases.
26. Used MUI Snackbar to show a message if user tries to select too many seats.
27. Created Tickets page where selected flight and seat info is shown to the user.
28. Hooked routing between seat selection and ticket confirmation using React Router state.
29. Built seat legends for mobile and desktop to help explain UI (occupied, available, selected, legroom).
30. Finally, dockerized both frontend and backend with production-ready Dockerfiles and a root docker-compose.yaml.
31. Had to fix several small things (CORS, API URL assumptions) to make Docker build work correctly.


## Biggest Problems I Faced and How I Solved Them 
1. ### Dynamic Metadata Filtering
- I wanted the filters (price, duration, layovers) to update dynamically based on the results from the flight search. For example, if the user searched for flights from Tallinn to New York, the price range should reflect only those flights—not all flights.
- I wasn’t sure how to make the backend send metadata based only on filtered results. Also, updating the frontend filters without breaking the context state took time to plan and debug.
- Solution: I rewrote the /metadata endpoint to accept query parameters (like from, destination, date) and used them to filter flights before calculating metadata. Then on the frontend, I updated the FlightFiltersContext right after metadata is fetched, using default fallbacks if values were missing.

2. ### Seat Filtering with Context
- Managing seat filters (window, legroom, near exit, adjacent) across multiple components without passing too many props.
- The seat selection page was already complex with many rows and conditional styles. Adding filters, context and selection logic introduced bugs when filters changed.
- Solution:I created a SeatFiltersContext and wrapped the seat selection page in a provider. That way, the filter state was accessible everywhere without props. 
- https://react.dev/learn/passing-data-deeply-with-context
  Helped me understand how to avoid prop drilling by wrapping my seat components in a provider and using custom hooks like useSeatFilters.
- ChatGPT  Used it to debug context scoping issues.

3. ### Adjacent Seat Selection Logic
- I needed to check if enough adjacent unoccupied seats existed in a row.
- Some rows had gaps, some rows were full. The filtering was already in place, so I had to layer adjacent seat logic on top of existing checks without breaking anything.
- Solution: I grouped seats by row and sorted them by column index. I used the help of ChatGPT to figure out the logic and apply to apply it.

4. ### Dockerizing
- As I had not set up docker myself before it was quite annoying. 
- Read the docker documentation and looked guides from youtube. 
- I wrote 2 dockerfile, 1 for frontend and 1 for backend, as that was recommended in forums. Couldn't get it to work for a long time because of missing the CorsConfig.

## Assumptions
- The assignment didn]t mention using database, so I decided to use postgreSQL myself. I tried to find online free API's for flights but didn't find any decent ones.
- It wasn't clearly mentioned what kind of filtering is expected(could it be only sorting by low-high). I chose the dynamic approach. 

## AI / External Help Usage
1. I used ChatGPT throughout the development process. My approach was to ask for:
- Hints or suggestions when planning component structure (e.g., seat filtering, adjacent logic)
- Help understanding unfamiliar React patterns (e.g., context scoping)
- Help brainstorming backend DTO structure and Java Streams logic
- Debugging problems like CORS issues or Docker port mapping
2. Also a lot of help from docs like: MUI docs, React Docs, React Router Docs Tailwind CSS Docs Spring Boot Docs,Spring Data JPA Docs
3. YouTube tutorials

## If I had more time
- Testing: unit tests for back and frontend.
- UI polish: not fully satisfied with UI yet
- Implement different classes for seating groups(business class for example)

## Time spent
- I spent approximately 70 hours on this project. Most time was spent on the context hook, dynamic filtering logic, adjacent seat logic.
