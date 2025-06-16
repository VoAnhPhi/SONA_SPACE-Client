import { getAllRooms, getProductsByRoom, getRoomBySlug } from "../api/room";
import type { PaginatedResponse, Product, Room } from "../types";
import axios from "axios";
import { formatProductForDisplay } from "./productService";

export const fetchAllRooms = async (): Promise<Room[]> => {
  try {
    const rooms = await getAllRooms();
//     console.log("Rooms:", rooms);
    return rooms;
  } catch (error) {
    console.error("Error in fetchAllRooms service:", error);
    if (axios.isAxiosError(error) && error.code === "ECONNREFUSED") {
      console.error("API server is not running or not accessible");
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
    console.error("Error in fetchAllRooms service:", error);
    if (axios.isAxiosError(error) && error.code === "ECONNREFUSED") {
      console.error("API server is not running or not accessible");
    }
    return [];
  }
};

export const fetchProductsByRoom = async (
  roomSlug: string,
  page: number = 1,
  limit: number = 8
): Promise<{ products: Product[]; totalPages: number }> => {
  try {
//     console.log(`Service: Fetching products by room: ${roomSlug}`);
    const rawProducts = await getProductsByRoom(roomSlug, {
      page,
      pageSize: limit,
    });
    const formatted = rawProducts.items.map(formatProductForDisplay);
//     console.log("formatted", formatted);
    return {
      products: formatted,
      totalPages: rawProducts.totalPages,
    };
  } catch (error) {
    console.error("Error in fetchProductsByRoom service:", error);
    return { products: [], totalPages: 1 };
  }
};
