# code-kata
Business Loan Application

This project contains a full stack application for providing business loans to businesses.

Tech Stack Used:
  1. Frontend - React.js
  2. Backend - Node.js (Express)

How to run the project?
  1. Running the backend: Open a terminal -> cd server -> npm install -> node index.js.
  2. Running the frontend: Open a terminal -> cd client -> npm install -> npm run start.

What is the backend doing?
The backend consists of two routes:
  1. POST /fetch-balance-sheet: It uses the business information as an input and returns the balance sheet of last 1 year of the business.
  2. POST /apply-loan: It uses the balance sheet information and the loan amount and returns whether the loan is approved for the business or not.

The balance sheet is generated with the help of an accounting software.
The decision is made with the help of a decision engine.
The accounting software and the decision engine are just simulations here.

What is the frontend doing?
  1. The frontend consists of a basic form which takes the business information and then sends an HTTP request to the backend for fetching the balance sheet.
  ![image](https://github.com/Manav-Kapoor/code-kata/assets/33180472/05890e3c-0277-4a40-9276-164d6a866946)

  2. After fetching the balance sheet, a button is present to apply loan which again sends the HTTP request to the backend to give the decision whether the loan is approved or not.
  ![image](https://github.com/Manav-Kapoor/code-kata/assets/33180472/383fc5a5-3788-4b75-8eb6-52d3e61d049b)

Implementation in future:
  1. Addition of database: Currently the business information is stored in memory. A database can be added to store business information.

Any comments are appreciated.
