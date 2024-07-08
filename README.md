# Bitcoin Display

A React application that displays Bitcoin prices and trends using Recharts. The application fetches Bitcoin price data every 30 seconds and displays it in a line chart.

## Live Demo
Check out the live demo [here](https://skboyle.github.io/bitcoin-display).

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js (v12 or later)
- npm (v6 or later)

### Installation

Clone the repository and install the dependencies.

```
git clone https://github.com/your-username/bitcoin-display.git
cd bitcoin-display
npm install
```


### Running the Application
To start the application, run:

```
npm start
```

The application will run on http://localhost:3000.

## Scripts

Here are the scripts available in the project:

- `npm start`: Starts the development server.
- `npm build`: Builds the application for production.
- `npm test`: Runs the test suite.
- `npm eject`: Ejects the configuration (not recommended).

## Dependencies

Key dependencies used in this project include:

- React: ^18.3.1
- Axios: ^1.7.2
- Recharts: ^2.12.7
- Jest: ^29.7.0 (for testing)
- @testing-library/react: ^13.4.0 (for testing)

## Testing

This project uses Jest and React Testing Library for testing.

### Running Tests

To run the tests, use:

```
npm test
```