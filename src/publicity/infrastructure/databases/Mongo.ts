// infrastructure/mongoDB.ts
import dotenv from "dotenv";
import mongoose from "mongoose";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtener la URI de MongoDB desde las variables de entorno
const mongoUri = process.env.MONGO_URI;

// Verificar que la URI se haya cargado correctamente
console.log("MONGO_URI:", mongoUri);

if (!mongoUri) {
  throw new Error("MONGO_URI no está definida en el archivo .env");
}

// Opciones de conexión mejoradas
const options = {
  connectTimeoutMS: 10000, // 10 segundos de tiempo de espera de conexión
  serverSelectionTimeoutMS: 10000, // 10 segundos de tiempo de espera de selección del servidor
};

// Conectar a MongoDB
mongoose
  .connect(mongoUri, options)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection error:", error.message);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Exportar el objeto mongoose y la conexión db
export { db, mongoose };
