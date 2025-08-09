import {
  getAllRooms,
  getRoomBySlug,
  getProductsByRoomWithFilters as getProductsByRoomWithFiltersApi,
} from "../api/room";
import type { Product, Room } from "../types";
import axios from "axios";
import { formatProductForDisplay } from "./productService";

export const fetchAllRooms = async (): Promise<Room[]> => {
  try {
    const rooms = await getAllRooms();
    return rooms;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === "ECONNREFUSED") {
    }
    return [];
  }
};

export const fetchRoomBySlug = async (slug: string): Promise<Room[]> => {
  try {
    const room = await getRoomBySlug(slug);
    //     console.log(`Service: Received room: ${room.room_name}`);
    return [room];
  } catch (error) {
    // console.error("Error in fetchAllRooms service:", error);
    if (axios.isAxiosError(error) && error.code === "ECONNREFUSED") {
      // console.error("API server is not running or not accessible");
    }
    return [];
  }
};

export const fetchRoomSimilar = async (): Promise<Room[]> => {
  try {
    const room = await getAllRooms();
    let roomSimilar = room.map((r) => ({
      room_name: r.room_name,
    }));
    console.log("roomSimilar", roomSimilar);
    return roomSimilar as Room[];
  } catch (error) {
    return [];
  }
};

export const fetchProductsByRoomWithFilters = async (
  roomSlug: string,
  page: number = 1,
  limit: number = 8,
  filters: {
    category?: string;
    room?: string;
    price?: string;
    color?: string;
    sort?: string;
  } = {}
): Promise<{ products: Product[]; totalPages: number }> => {
  try {
    const rawProducts = await getProductsByRoomWithFiltersApi(
      roomSlug,
      page,
      limit,
      filters
    );

    const formatted = rawProducts.items.map(formatProductForDisplay);

    return {
      products: formatted,
      totalPages: rawProducts.totalPages,
    };
  } catch (error) {
    return { products: [], totalPages: 1 };
  }
};
