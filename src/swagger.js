import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Real Estate API Documentation',
      version: '1.0.0',
      description: 'A simple Express API application',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            username: {
              type: 'string',
              description: 'Username',
            },
            email: {
              type: 'string',
              description: 'User email',
            },
            password: {
              type: 'string',
              description: 'User password',
            },
            avatar: {
              type: 'string',
              description: 'User avatar URL',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User update date',
            },
          },
        },
        Listing: {
          type: 'object',
          required: [
            'name', 'description', 'address', 'regularPrice',
            'discountPrice', 'furnished', 'parking', 'type',
            'offer', 'imageUrls'
          ],
          properties: {
            _id: {
              type: 'string',
              description: 'Listing ID',
            },
            name: {
              type: 'string',
              description: 'Listing name',
            },
            description: {
              type: 'string',
              description: 'Listing description',
            },
            address: {
              type: 'string',
              description: 'Listing address',
            },
            regularPrice: {
              type: 'number',
              description: 'Regular price of the listing',
            },
            discountPrice: {
              type: 'number',
              description: 'Discounted price of the listing',
            },
            bathrooms: {
              type: 'number',
              description: 'Number of bathrooms',
            },
            bedrooms: {
              type: 'number',
              description: 'Number of bedrooms',
            },
            furnished: {
              type: 'boolean',
              description: 'Is the listing furnished?',
            },
            parking: {
              type: 'boolean',
              description: 'Does the listing have parking?',
            },
            type: {
              type: 'string',
              description: 'Type of listing (e.g., house, apartment)',
            },
            offer: {
              type: 'boolean',
              description: 'Is there an offer on the listing?',
            },
            imageUrls: {
              type: 'array',
              items: {
                type: 'string',
                description: 'URL of the image',
              },
              description: 'Array of image URLs',
            },
            userRef: {
              type: 'string',
              description: 'Reference to the user who created the listing',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Listing creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Listing update date',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
