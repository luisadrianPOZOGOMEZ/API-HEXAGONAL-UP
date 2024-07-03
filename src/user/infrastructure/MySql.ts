import mysql from "mysql2/promise";

// Asegurarse de que las variables de entorno están definidas
for (const key of [
  "MYSQL_HOST",
  "MYSQL_PORT",
  "MYSQL_USER",
  "MYSQL_PASSWORD",
  "MYSQL_DATABASE",
]) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

const config = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT), // Asegúrate de usar el puerto correcto para MySQL
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE, // Este es el nombre de la base de datos que definiste al crear la instancia de RDS
};

export const query = async (sql: string, params: any[]) => {
  console.log("Connecting to MySQL");
  const conn = await mysql.createConnection(config);
  try {
    const [result] = await conn.execute(sql, params);
    return result;
  } finally {
    console.log("Closing MySQL connection");
    await conn.end();
  }
};
