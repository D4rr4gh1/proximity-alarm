import { DBContextType } from "@/contexts/context";

let databaseInstance: DBContextType | null = null;

export const setDBInstance = (db: DBContextType) => {
  databaseInstance = db;
};

export const getDB = (): DBContextType | null => {
    return databaseInstance;
}
