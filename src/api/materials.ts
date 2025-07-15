import axios from "axios";
import type { Attribute } from "../types";

const API_URL = "http://localhost:3501/api";

export const getAllAttributes = async (): Promise<Attribute[]> => {
  try {
    const response = await axios.get(`${API_URL}/materials`);
    if (!response.data) throw new Error("No data received for attributes");
    return response.data;
  } catch (error) {
    console.error("Error fetching attributes:", error);
    throw error;
  }
};
export const getAllAttributesSlugs = async (
  slug: string
): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_URL}/materials/${slug}`);
    if (!response.data) throw new Error("No data received for attribute slugs");
    return response.data;
  } catch (error) {
    console.error(`Error fetching material for slugs ${slug}:`, error);
    throw error;
  }
};
