module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT");

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"),
        ssl: env.bool("DATABASE_SSL", false) && {
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            true
          ),
        },
        schema: env("DATABASE_SCHEMA", "public"),
      },

      pool: {
        min: env.int("DATABASE_POOL_MIN"),
        max: env.int("DATABASE_POOL_MAX"),
      },
    },
  };

  return {
    connection: {
      client,

      ...connections[client],

      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
