// migrations/<timestamp>-add-users-collection.js

module.exports = {
  async up(db, client) {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["username", "password"],
          properties: {
            username: {
              bsonType: "string",
              minLength: 3,
              description: "must be a string with at least 3 characters and is required"
            },
            password: {
              bsonType: "string",
              description: "must be a string and is required"
            }
          }
        }
      },
      validationLevel: "strict"
    });
  },

  async down(db, client) {
    await db.collection('users').drop();
  }
};
