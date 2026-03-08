const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jitterbit Orders API",
      version: "1.0.0",
      description:
        "A simple API to manage orders - Jitterbit Technical Challenge",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // Apply JWT authentication globally to all endpoints
    security: [{ bearerAuth: [] }],
  },
  // Points to the files where the API routes are documented
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
