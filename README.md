# German Road Accident Analytics Platform

## Overview

This project is a full-stack web application for exploring and analyzing German road accident data published through the German Federal Statistical Office's Unfallatlas dataset.

The application enables users to:

- Explore accident records across Germany.
- Filter accidents by state, municipality, year, month, weekday, hour, accident category, and participant type.
- View accident counts for selected criteria.
- Access metadata about available datasets and regions.

The platform is designed to make large-scale accident data more accessible through an interactive user interface and a REST API.

---

## Features

### Regional Filtering

Users can filter accident data by:

- Federal State (Bundesland)

### Time Filtering

Users can analyze accidents by:

- Year
- Month
- Weekday
- Hour

### Accident Characteristics

Filtering is available for:

- Accident category
- Time conditions
- Road user participation

Examples:

- Car accidents
- Motorcycle accidents
- Bicycle accidents
- Pedestrian accidents
- Heavy vehicle accidents

### Analytics

The platform supports:

- Accident count queries
- Region-based statistics
- Dataset availability checks

---

## Dataset

Source:

Unfallatlas (German Federal Statistical Office)

License:

Data licence Germany Attribution 2.0

The imported dataset contains:

- Accident ID
- Geographic coordinates
- Accident category
- Accident type
- Participants involved
- Light conditions
- Time information
- Region references

---

## System Architecture

### Frontend

The frontend is built using React and provides an interactive filtering and visualization interface.

Responsibilities:

- Fetch filter options
- Display accident statistics
- Handle user interactions
- Manage application state

### Backend

The backend is built with Node.js and Express.

Responsibilities:

- Serve REST API endpoints
- Process accident filters
- Aggregate accident statistics
- Manage metadata queries
- Communicate with MongoDB

### Database

MongoDB stores:

- Accident records
- Region metadata
- Import run information
- Indicators
- Indicator values

---

## Technology Stack

### Frontend

- React
- Vite
- Axios
- Tailwind CSS
- Headless UI
- Font Awesome

### Backend

- Node.js
- Express.js
- Mongoose

### Database

- MongoDB

### Data Processing

- CSV Parsing
- UUID Generation
- Bulk MongoDB Operations

### Development Tools

- Git
- GitHub
- npm

---

## Database Structure

### Regions Collection

Example:

```json
{
  "_id": {
    "$oid": "6a37f4e2bd99ff7438c0d96a"
  },
  "ags": "07143295",
  "__v": 0,
  "geometry": {},
  "level": "municipality",
  "name": "Stein-Neukirch",
  "parent_region_id": null,
  "population": 442,
  "region_id": {
    "$uuid": "8ef7f705-0242-49dd-8571-4a03f06d868f"
  },
  "state_name": "Rheinland-Pfalz"
}
```

### Accidents Collection

Example:

```json
{
  "_id": {
    "$oid": "6a37fc6ebd99ff7438c2596f"
  },
  "accident_id": "01240525161013252024",
  "__v": 0,
  "ags": "01062004",
  "category": "Minor Injury Accident",
  "hour": 14,
  "lat": 53.80758155500007,
  "light": "Unknown",
  "lon": 10.388050921000058,
  "month": 5,
  "participants": ["car"],
  "region_id": {
    "$uuid": "438bcc47-d31d-441e-834e-e981c27f64f5"
  },
  "type": "Collision with Vehicle Ahead or Waiting",
  "weekday": "Saturday",
  "year": 2024
}
```

### ImportRuns Collection

Example:

```json
{
  "_id": {
    "$oid": "6a303ebca77843127b46b38f"
  },
  "source": "Unfallatlas",
  "importDate": {
    "$date": "2026-06-15T18:04:44.406Z"
  },
  "recordsImported": 248599,
  "version": "2024",
  "status": "success",
  "durationMs": "9836992",
  "__v": 0
}
```

### Indicators Collection

Example:

```json
{
  "_id": {
    "$oid": "6a30183f5038406e4fff1aa9"
  },
  "code": "46251-0021",
  "__v": 0,
  "indicator_id": {
    "$uuid": "dde65a22-a31c-4a58-b511-fc755a186b5d"
  },
  "name": "Passenger cars",
  "source_system": "GENESIS",
  "unit": "number"
}
```

### Indicators Value Collection

Example:

```json
{
  "_id": {
    "$oid": "6a3017ec5038406e4fff127d"
  },
  "indicator_id": {
    "$uuid": "87e1db30-ead4-44cc-a203-a6470b025011"
  },
  "region_id": {
    "$uuid": "84105ffc-5627-4131-a59c-0768693010b7"
  },
  "year": 2022,
  "__v": 0,
  "value": 250064
}
```

---

## API Endpoints

### Filters

#### Get States

```http
GET /api/filters/states
```

#### Get Years

```http
GET /api/filters/years
```

#### Get Categories

```http
GET /api/filters/categories
```

#### Get Participants

```http
GET /api/filters/participants
```

---

### Accident Queries

#### Get Accident Count

```http
GET /api/accidents/count
```

Example:

```http
GET /api/accidents/count?state=Sachsen&year=2023
```

Example:

```http
GET /api/accidents/count?state=Berlin&year=2023&participants=pedestrian
```

---

### Metadata

#### Earliest Available Year

```http
GET /api/meta/earliest-year
```

#### Region Availability

```http
GET /api/meta/region/:state
```

Example:

```http
GET /api/meta/region/Sachsen
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Backend:

```env
PORT=5000
MONGODB_URI=your_connection_string
```

Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Application

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

Application:

```text
Frontend: http://localhost:5173
Backend: http://localhost:5000
```

---

## Design Decisions

### Why AGS is Used

AGS (Amtlicher Gemeindeschlüssel) is used as the regional reference because:

- It is present in both accident and region datasets.
- It provides stable geographic identification.
- It avoids UUID matching issues between collections.

### Why Separate Region and Accident Collections

Benefits:

- Reduced duplication
- Easier maintenance
- Better scalability
- Cleaner filtering logic

---

## Dos

### Data

- Use AGS as the geographic join key.
- Validate imported accident data.
- Use bulk operations when importing large datasets.

### Backend

- Keep API responses consistent.
- Return predictable JSON structures.
- Validate query parameters.

### Frontend

- Handle empty API responses gracefully.
- Use loading states.
- Validate user selections before requests.

### Database

- Create indexes for:
  - ags
  - year
  - category
  - participants

---

## Don'ts

### Data

- Do not join accidents and regions using generated UUIDs.
- Do not rely on municipality names as identifiers.

### Backend

- Do not return inconsistent response structures.
- Do not expose internal database IDs unnecessarily.

### Frontend

- Do not assume API responses always contain data.
- Do not make unnecessary API requests on every render.

### Database

- Do not duplicate region information inside accident documents.
- Do not perform full collection scans when indexes can be used.

---

## Future Improvements

- Interactive maps
- Advanced analytics dashboards
- Accident severity prediction
- Regional trend forecasting
- Export functionality (CSV/PDF)
- User-defined reports

---

## Author

Developed by Lilian Nabawesi as a full-stack data analytics project using German road accident data from Unfallatlas.
