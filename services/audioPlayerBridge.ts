import { DBContextType } from "@/contexts/context";
import type { AudioPlayer } from "expo-audio";

let audioPlayerInstance: AudioPlayer | null = null;
let database: DBContextType | null = null;

export const setAudioPlayerInstance = (player: AudioPlayer, db: DBContextType) => {
  audioPlayerInstance = player;
  database = db;
};

export const getAudioPlayerInstance = (): AudioPlayer | null => {
  return audioPlayerInstance ;
};

export const getDB = (): DBContextType | null => {
    return database;
}
