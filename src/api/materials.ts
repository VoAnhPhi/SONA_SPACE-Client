import axios from "axios";
import type { Attribute } from "../types";
import { convertToAdminApiUrl } from "../utils/url";

export const getAllMaterials = async (): Promise<Attribute[]> => {
  try {
    const response = await axios.get(convertToAdminApiUrl("/materials"));
    if (!response.data) throw new Error("No data received for materials");
    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
};
export const getAllMaterialsSlugs = async (slug: string): Promise<string[]> => {
  try {
    const response = await axios.get(convertToAdminApiUrl(`/materials/${slug}`));
    if (!response.data) throw new Error("No data received for material slugs");
    return response.data;
  } catch (error) {
    console.error(`Error fetching material for slugs ${slug}:`, error);
    throw error;
  }
};
