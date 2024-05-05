const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const CryptoJS = require('crypto-js');

// Load environment variables from .env file
require('dotenv').config();

// Function to decrypt an encrypted value
function decryptValue(encryptedValue, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
}

// Retrieve the encrypted values from environment variables
const encryptedEndpoint = process.env.DOCUMENT_INTELLIGENCE_ENDPOINT;
const encryptedApiKey = process.env.DOCUMENT_INTELLIGENCE_API_KEY;

// Decrypt the values using the secret key
const secretKey = 'your_secret_key_here'; // Replace with your actual secret key
const decryptedEndpoint = decryptValue(encryptedEndpoint, secretKey);
const decryptedApiKey = decryptValue(encryptedApiKey, secretKey);

// Now you can use the decrypted values in your application
const documentAnalysisClient = new DocumentAnalysisClient(decryptedEndpoint, new AzureKeyCredential(decryptedApiKey));


const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from 'public' directory
app.use(express.static('public')); 

// Configure Multer for handling file uploads
const upload = multer({ dest: 'public/uploads/' });

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Azure AI Document Intelligence - Simple text extraction',
      description: 'Authored by Vignesh Babu Rajendran for ITIS 6177 - System Integration - Final Project',
      version: '1.0.0'
    },
    servers: [{
      url: 'http://159.223.148.167:3000',
      description: 'Project server'
    }]
  },
  // Specify the file(s) that contain your route definitions and annotations
  apis: ['index.js'] // Assuming 'index.js' contains your route definitions
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route to handle file upload and text extraction
/**
 * @swagger
 * /textExtract:
 *   post:
 *     summary: Simple text extraction
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: Choose File to extract text
 *     responses:
 *       '200':
 *         description: Operation successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 document:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                       description: Text extracted from the file
 */

// Route to handle file upload and text extraction
app.post('/textExtract', upload.single('file'), async (req, res) => {
    // Get the uploaded file from the request
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Construct the local file path
        const filePath = path.join(__dirname, 'public', 'uploads', file.filename);

        // Perform text extraction using Azure AI Document Intelligence
        const fileStream = fs.createReadStream(filePath);
        const documentAnalysisClient = new DocumentAnalysisClient(decryptedEndpoint, new AzureKeyCredential(decryptedApiKey));
        const poller = await documentAnalysisClient.beginAnalyzeDocument("prebuilt-read", fileStream);
        const { content } = await poller.pollUntilDone();

        // Prepare response data
        const responseData = {
            document: { content }
        };

        // Send response
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
