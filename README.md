# Book Scraper Admin Panel

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, Vite
- **Backend:** Flask, BeautifulSoup, Requests, Flask-CORS
- **Database:** MongoDB (using PyMongo)

## Project Overview

This project is a simple admin panel for scraping book data from [books.toscrape.com](https://books.toscrape.com/) and storing it in MongoDB. The application demonstrates full-stack integration with authentication, web scraping, and data display.

### Features

- **Login:**  
  Only admins can access the panel. A simple hardcoded login form is provided for demonstration.

- **Admin Panel:**  
  After login, the admin can:
  - Click the **Scrape Now** button to fetch the latest book data from the target website.
  - View the scraped data (title, price, availability) in a table.

- **Web Scraping:**  
  The backend uses **BeautifulSoup** to scrape book details from the website and stores them in MongoDB.

- **API Endpoints:**
  - `/scrape` (GET): Scrapes book data and saves it to the database.
  - `/books` (GET): Fetches all stored book data.

## How It Works

1. **Login:**  
   Enter the admin credentials to access the panel.

2. **Scraping:**  
   Click "Scrape Now" to trigger the backend scraping process. The data is fetched, parsed, and stored in MongoDB.

3. **Display:**  
   The scraped books are displayed in a table with their title, price, and availability.

## Setup

1. **Frontend:**  
   - Install dependencies: `npm install`
   - Start dev server: `npm run dev`

2. **Backend:**  
   - Install Python dependencies: `pip install flask flask-cors requests beautifulsoup4 pymongo`
   - Run the server: `python backend/app.py`

3. **MongoDB:**  
   - Update the MongoDB connection string in `backend/app.py` if needed.

---

*Built with React, Tailwind CSS, Flask, BeautifulSoup, and MongoDB.*