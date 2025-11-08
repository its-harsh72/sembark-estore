#  Sembark E-Store — React + TypeScript Project

This is a simple and responsive e-commerce web app built using **React**, **TypeScript**, and **Tailwind CSS**.  
It allows users to browse products, check details, and manage their cart with a clean and minimal interface.  
The data is fetched live from the **Fake Store API**.



##   GitHub Repository

Github URL : [https://github.com/its-harsh72/sembark-estore]

Deployment Link: [https://sembark-estore.vercel.app/]


##   Setup & Run Instructions

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/its-harsh72/sembark-estore.git
cd sembark-estore
```

### 2.  Install dependencies

Make sure Node.js (v16 or above) is installed. ("node -v and npm -v"  for version check)
It’s needed to run the npm commands and React development tools.

```bash
 npm install
 ```

### 3.  Start the development server

```bash
npm start
```

Then open  [http://localhost:3000] in your browser.




### For running Cypress Test cases E2E Testing


### 1.   Run Cypress tests 
If you want to verify the functionality:
```bash
npx cypress open
```

### For run all tests directly:

```bash
npx cypress run
```


### Project Overview

1. Built with React (TypeScript) for modular component-based architecture.

2. Used Context API to handle cart state globally.

3. Integrated Fake Store API for real-time product data.

4. Added smooth page transitions with Framer Motion.

5. Used Tailwind CSS for fast and responsive styling.

6. Included Cypress for end-to-end testing.

### Folder Structure

src/
│
├── components/      # Reusable UI components (Navbar, ProductCard, FilterBar)
├── context/         # Context API files for cart and product management
├── pages/           # Page components (Home, ProductDetail, Cart)
├── store/           # MobX store (alternative cart management)
├── types/           # TypeScript type definitions
├── utils/           # API utilities
├── App.tsx          # Main routing and layout
└── index.tsx        # Application entry point


### Features Implemented

### Core Features

1. Product listing fetched from the Fake Store API

2. Product detail view with image, title, and description

3. Add/Remove product to/from cart

4. Cart page showing items, quantity, and total price

5. Data persistence using localStorage

6. Filtering by category and sorting by price


### Additional Features

1. Page and element animations with Framer Motion

2. Responsive UI using Tailwind CSS

3. Smooth route transitions

4. Cypress E2E Tests to validate core functionalities


### Assumptions Made

1. The API data format from Fake Store API remains consistent.

2. The app does not include login, checkout, or payment features (to stay within scope).

3. When the same item is added again, its quantity increases instead of duplicating.

### Limitations

1. The app depends on the Fake Store API. If it’s down, products won’t load.

2. Filtering and sorting are done on the client side (not from the API).

3. No backend server or authentication implemented.
