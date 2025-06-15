import { getAllRooms } from "../api/room";
import type { Room } from "../types";
import axios from "axios";

export const fetchAllRooms = async (): Promise<Room[]> => {
      try {
            console.log(`Service: Fetching all rooms`);
            const rooms = await getAllRooms();
            console.log(`Service: Received ${rooms.length} rooms`);
            console.log('Rooms:', rooms);
            return rooms;
      } catch (error) {
            console.error('Error in fetchAllRooms service:', error);
            if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
                  console.error('API server is not running or not accessible');
            }
            return [];
      }
}
