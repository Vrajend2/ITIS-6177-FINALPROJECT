# Azure AI Document Intelligence - Simple Text Extraction

This project demonstrates a Node.js application that uses Azure AI Document Intelligence to extract text from documents. It provides a RESTful API endpoint to upload documents and retrieve the extracted text.

## Project URL

[http://159.223.148.167:3000/](http://159.223.148.167:3000/)

## Prerequisites

Before running this application, ensure you have the following prerequisites installed:

- Node.js and npm (Node Package Manager)
- Azure Form Recognizer SDK (`@azure/ai-form-recognizer`)
- Swagger UI Express (`swagger-ui-express`)
- Multer for handling file uploads (`multer`)
- CryptoJS for encryption and decryption (`crypto-js`)
- You also need to set up Azure Cognitive Services and obtain the necessary API endpoint and key for the Document Intelligence service.

## Installation

1. Clone this repository:

   git clone https://github.com/Vrajend2/ITIS-6177-FINALPROJECT.git

2. Install dependencies:

    npm install

3. Set up environment variables:Create a .env file in the root of the project and add the following:

    DOCUMENT_INTELLIGENCE_ENDPOINT=https://your-document-intelligence-endpoint/
    DOCUMENT_INTELLIGENCE_API_KEY=your-document-intelligence-api-key
    ENCRYPTION_SECRET_KEY=your-encryption-secret-key
    PORT=3000

## Usage

1. Start the application:

    npm start

2. Access the API documentation:Open your web browser and navigate to:http://localhost:3000/api-docs Here you can test the '/textExtract' endpoint using Swagger UI.

3. Upload a document for text extraction:Using the Swagger UI interface, upload a document (supported formats: .jpg, .jpeg, .png, .pdf) to extract text.

## Steps to Deploy on Server

ssh root@159.223.148.167

### Update and install necessary packages
- yum update
- yum install epel-release yum-utils -y
- yum install nginx -y
- systemctl start nginx
- systemctl enable nginx
- yum install firewalld -y
- systemctl start firewalld
- systemctl enable firewalld
- firewall-cmd --permanent --zone=public --add-service=http
- firewall-cmd --permanent --zone=public --add-service=https
- firewall-cmd --zone=public --add-port=3000/tcp --permanent
- firewall-cmd --reload
- yum makecache
- yum install git -y

### Install Node.js and other dependencies
- curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
- yum install nodejs -y
- git clone https://github.com/Vrajend2/ITIS-6177-FINALPROJECT.git
- sudo cp -r . /usr/share/nginx/html
- sudo systemctl restart nginx

### Install project dependencies and start the application
- cd /usr/share/nginx/html
- npm install
- pm2 start index.js

#### Feel free to customize the instructions and commands according to your specific deployment requirements and environment.

#### Author: Vignesh Babu Rajendran
#### Course: ITIS 6177 - System Integration - Final Project

This README.md file provides clear instructions on how to install and use your Node.js application for text extraction using Azure AI Document Intelligence. It also includes steps for deploying the application on a server and setting up necessary configurations. You can further refine and expand this documentation based on your project's specific needs and deployment environment.