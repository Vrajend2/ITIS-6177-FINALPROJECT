const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from 'html' directory
app.use(express.static('html')); 

// Configure Multer for handling file uploads
const upload = multer({ dest: 'html/uploads/' });

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'AI Document Intelligence',
      description: 'Azure AI Document Intelligence - Simple text extraction',
      version: '1.0.0'
    },
    servers: [{
      url: 'http://localhost:3000',
      description: 'Project server'
    }]
  },
  // Specify the file that contains your route definitions
  apis: ['index.js'] 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Azure AI Document Intelligence endpoint and API key
const documentIntelligenceEndpoint = 'https://vigneshformrecognizer.cognitiveservices.azure.com/';
const documentIntelligenceApiKey = '0fd78bfe90944f0685fb7004f7914577';

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route to handle file upload and text extraction
/**
 * @swagger
 * /extractText:
 *   post:
 *     summary: Simple text extraction
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: File to be processed
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
 *                       description: Text extracted text from the file
 */
app.post('/extractText', upload.single('file'), async (req, res) => {
    // Get the uploaded file from the request
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Construct the local file path
        const filePath = path.join(__dirname, 'html', 'uploads', file.filename);

        // Perform text extraction using Azure AI Document Intelligence
        const fileStream = fs.createReadStream(filePath);
        const documentAnalysisClient = new DocumentAnalysisClient(documentIntelligenceEndpoint, new AzureKeyCredential(documentIntelligenceApiKey));
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
