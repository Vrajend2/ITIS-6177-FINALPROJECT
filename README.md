Azure AI Document Intelligence - Simple Text Extraction
This project demonstrates a Node.js application that uses Azure AI Document Intelligence to extract text from documents. It provides a RESTful API endpoint to upload documents and retrieve the extracted text.

Prerequisites
Before running this application, ensure you have the following prerequisites installed:

Node.js and npm (Node Package Manager)
Azure Form Recognizer SDK (@azure/ai-form-recognizer)
Swagger UI Express (swagger-ui-express)
Multer for handling file uploads (multer)
CryptoJS for encryption and decryption (crypto-js)
You also need to set up Azure Cognitive Services and obtain the necessary API endpoint and key for the Document Intelligence service.

Installation
Clone this repository:
bash
Copy code
git clone https://github.com/yourusername/azure-document-intelligence.git
Navigate to the project directory:
bash
Copy code
cd azure-document-intelligence
Install dependencies:
bash
Copy code
npm install
Set up environment variables:Create a .env file in the root of the project and add the following:
plaintext
Copy code
DOCUMENT_INTELLIGENCE_ENDPOINT=https://your-document-intelligence-endpoint/
DOCUMENT_INTELLIGENCE_API_KEY=your-document-intelligence-api-key
ENCRYPTION_SECRET_KEY=your-encryption-secret-key
PORT=3000
Replace https://your-document-intelligence-endpoint/ and your-document-intelligence-api-key with your actual Azure AI Document Intelligence endpoint and API key.
Usage
Start the application:
bash
Copy code
npm start
Access the API documentation:Open your web browser and navigate to:
bash
Copy code
http://localhost:3000/api-docs
Here you can test the /textExtract endpoint using Swagger UI.
Upload a document for text extraction:Using the Swagger UI interface, upload a document (supported formats: .jpg, .jpeg, .png, .pdf) to extract text.
Contributing
Contributions are welcome! Please fork this repository and create a pull request with your proposed changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.