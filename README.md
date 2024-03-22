## Code Snippet Share with Aiven MySQL and Judge0 Integration

This project is a web application for submitting, storing, and executing code snippets. It utilizes Aiven MySQL for data persistence and Judge0 API for online code evaluation.

### Tech Stack

* **Frontend:** React 
* **Backend:** Express.js
* **Database:** Aiven MySQL
* **External Service:** Judge0 API

### Functionality

The application provides two main functionalities:

**1. Submit Code Snippet**

* A form to collect user information:
    * Username
    * Programming Language (Dropdown with options like C++, Java, JavaScript, Python)
    * Standard Input (Text area)
    * Source Code (Large text area)
* Submit button to save the snippet and trigger execution

**2. View Submitted Snippets**

* Table displaying all submitted snippets:
    * Username
    * Programming Language
    * Standard Input (First 10 characters)
    * Source Code (First 100 characters)
    * Timestamp of submission
    * Execution Status (Success/Error)



### Deployment

Deploy the frontend and backend applications on separate servers. Ensure the backend server can access the Aiven MySQL database and the Judge0 API.

### Getting Started

1. **Prerequisites:** Install Node.js and npm (or yarn).
2. **Clone Repository:** Clone this repository.
3. **Backend Setup:**
    * Install dependencies:
        ```bash
        npm install
        ```
    * Obtain a Judge0 API key and integrate the API calls in your backend.
    * Start the backend server:
        ```bash
        npm start
        ```
4. **Frontend Setup:**
    * Navigate to the frontend directory (e.g., `frontend`).
    * Install dependencies:
        ```bash
        npm install
        ```
    * Start the development server 
        ```bash
        npm start  # For React
        ```


