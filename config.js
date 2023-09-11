import dotenv from 'dotenv';
dotenv.config();

export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/notes"
  },
  express: {
    port: process.env.PORT || 8888
  },
  systemInfo: {
    taxRate: process.env.TAX_RATE || 0.07,
    adminToken: process.env.ADMIN_PWD || "admin",
  }
} 