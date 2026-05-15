import swaggerJsdoc  from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
   definition: {
       openapi: "3.0.0",
       info: {
           title: "Effective mobile Test Task",
           version: "1.0.0",
           description: "документация API",
       },
       servers: [
           {
               url: "/api"
           }
       ]
   },
   apis: ["./src/nodules/*.ts"]

});