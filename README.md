# Sales Leaderboard API
This is a simple RESTful API to manage sales data and generate a leaderboard of top-performing agents based on their amountSold.

## Available Endpoints
- POST /api/sales - Add a new sales. Body: { "agentName": "John", "amountSold": 12000, "numberOfSales":100}
- GET /api/sales - Get all sales.
- GET /api/leaderboard - Get sales leaderboard sorted by amount.


## Aggregation Logic
- Groups sales by agentName to calculate total sales per agent.

## Edge Case Handling
- If multiple agents have the same total sales, they are given the same rank.
- The next rank skips numbers accordingly.

## Running the Server Locally
1. Clone the repository "git clone https://github.com/shashankneupane0427/sales-leaderboard-api.git"
2. cd sales-leaderboard-api
3. npm install
4. create .env in the root dir and refrain to the file named ".env.example"
5. npm run build
6. npm run start
7. API available at http://localhost:5000

## Live Hosted URL
- will be provided once hosted.

## Author
Surya Shashank Neupane
