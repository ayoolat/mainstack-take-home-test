import { config } from "dotenv";
config();

const os = Object.assign({}, process.env);
export default {
  database: {
    mongodb: {
      host: os.DB_HOST || "localhost",
      port: Number(os.DB_PORT) || 27017,
      name: os.DB_NAME || "typescript-graphql-api-template",
      user: os.DB_USER || "typescript-graphql-api-template",
      password: os.DB_PASSWORD || "password",
      uri: `mongodb+srv://${os.DB_USER}:${os.DB_PASSWORD}@${os.DB_HOST}/${os.DB_NAME}?retryWrites=true&authSource=admin`,
    },
  },
  firebase: {
    firebaseConfig: {
      type: os.TYPE || "",
      projectId: os.PROJECT_ID || "",
      privateKeyId: os.PRIVATE_KEY_ID || "",
      privateKey: process.env.PRIVATE_KEY
        ? JSON.parse(process.env.PRIVATE_KEY)["privateKey"]
        : "",
      clientEmail: os.CLIENT_EMAIL || "",
      clientId: os.CLIENT_ID || "",
      authUri: os.AUTH_URL || "",
      tokenUri: os.TOKEN_URI || "",
      authProviderX509CertUrl: os.auth_provider_x509_cert_url || "",
      clientX509CertUrl: os.client_x509_cert_url || "",
    },
    firebaseAuthConfig: {
      apiKey: os.API_KEY || " ",
      authDomain: os.AUTH_DOMAIN || "",
      projectId: os.PROJECT_ID || "",
      storageBucket: os.STORAGE_BUCKET || "",
      messagingSenderId: os.MESSAGING_SENDER_ID || "",
      appId: os.APP_ID || "",
      measurementId: os.MEASUREMENT_ID || "",
    },
  },
};
