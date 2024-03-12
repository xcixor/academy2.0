import { db } from "@/lib/db";

export const getGCPAsset = async (assetId: string) => {
  try {
    const asset = await db.gCPData.findUnique({
      where: {
        assetId: assetId,
      },
    });
    return asset;
  } catch (error) {
    console.log("[GET_GCP_ASSET]", error);
    return null;
  }
};
