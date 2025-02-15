
# NYC 311 Service Requests Dashboard

## Project Overview
This project is an interactive dashboard that visualizes NYC 311 service requests. The dashboard provides insights into complaint trends over time and a breakdown of complaints by borough, helping users understand service request patterns across New York City.

## Features
-   **📍 Interactive Map**: Visualizes the location of 311 complaints in NYC.
- **🚧 Complaints Clustering**: Clusters complaints on the map to improve readability.
-   **📊 Complaints Over Time**: Displays the volume of complaints over the past seven days.
-   **🏙 Complaints by Borough**: A bar chart showing complaint distribution across boroughs.
-   **🔄 Real-time Data Fetching**: Fetches live 311 complaints using NYC Open Data API.
-   **📱 Responsive Design**: Works seamlessly across different devices and screen sizes.

## Technologies Used
-   **Frontend**: Next.js with TypeScript, TailwindCSS, React
-   **Data Visualization**: Recharts, Mapbox GL, D3.js
-   **API**: NYC Open Data API
-   **State Management**: React Hooks

## Project Preview

You can view the live demo of the website [here](https://city-visualisation.vercel.app/)
***(Please note that preview take ~30 seconds to load, fixing this is something I'm working on)***
1.  **Dashboard Overview**  
    _![Dashboard Overview](https://chatgpt.com/c/path/to/image1.png)_
    
2.  **Complaints Over Time Chart**  
    _![Complaints Over Time](https://chatgpt.com/c/path/to/image2.png)_
    
3.  **Complaints by Borough**  
    _![Complaints by Borough](https://chatgpt.com/c/path/to/image3.png)_
    

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/yourusername/nyc-311-dashboard.git
cd nyc-311-dashboard
```

### Install Dependencies
```bash
npm install
# or
yarn install
```
### Change from Root Directory to NextJS Directory
Your would need to ensure that you change directory from city-visualisation (root directory) to cityviz (NextJS directory)
```bash
cd cityviz
```

### Start the Development Server

```bash
npm run dev
# or
yarn dev
```

This will start the Next.js development server, and you can view the dashboard at:

```
http://localhost:3000
```

## API Integration

This project integrates **real-time 311 service request data** from the [NYC Open Data API](https://data.cityofnewyork.us/resource/erm2-nwe9.json) and visualizes it using **Mapbox**.

-   **NYC Open Data API**:
    
    -   Fetches live 311 complaints, including details such as date, borough, and (if available) geolocation.
    -   If you need to modify the data source or query parameters, update the API endpoint in the respective components.
-   **Mapbox**:
    
    -   Used to render an interactive map displaying complaint locations.
    -   To customize the map (e.g., styles, zoom levels, markers), update the `Map.tsx` component.
    -   Ensure you have a valid **Mapbox access token** set in your environment variables.

## Project Structure
```bash
📦 cityviz
└── 📂 src
    └── 📂 app
        ├── 📂 components
        │   ├── 🗺 Map.tsx  # Interactive map
        │   ├── 📊 Chart.tsx  # Complaints over time visualization
        │   ├── 🏙 BoroughChart.tsx  # Complaints by borough visualization
├── 📜 README.md  # This file
├── 📜 package.json  # Project dependencies
├── 📜 next.config.js  # Next.js configuration
├── 📂 public  # Static assets
```
## Future Improvements

-   Fix API data fetching for faster load times
-   Add filters for complaint types
-   Implement a date range picker for custom time analysis
-   Improve map interactivity (Fix tooltip onClick)
-   Optimize performance for large datasets

## License

This project is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License).
