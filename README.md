# URL Shortener  

This is a simple URL shortener built using Node.js. It allows users to shorten long URLs and retrieve them using unique short codes.  

## Features:  
- Shorten long URLs with a randomly generated or custom short code.  
- Store and retrieve short links using a JSON file.  
- Handle GET and POST requests for link retrieval and creation.  
- Simple and lightweight server using Node.js `http` module.  

## How It Works:  
1. **GET `/`** - Serves the homepage.  
2. **GET `/links`** - Retrieves all stored links in JSON format.  
3. **POST `/shortener`** - Accepts a JSON body with a `url` and optional `shortCode`, returns a shortened link.  

## Requirements:  
- Node.js installed  
- A `public/index.html` file for the homepage  
- A `data/links.json` file to store links  

## Installation:  
1. Clone the repository.  
2. Run `npm install` (if additional dependencies are added).  
3. Start the server with `node server.js`.  
4. Access the service at `http://localhost:3000`.  

## Future Enhancements:  
- Add a frontend for easy URL submission.  
- Implement database storage instead of JSON files.  
- Add analytics to track URL usage.  

## Conclusion:  
This URL shortener provides a simple yet effective solution for managing and sharing shortened links. With further improvements, it can be expanded into a more robust and scalable application. 🚀
