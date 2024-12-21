import { MapTilerType } from "@/types";



const getListOfCoffeeStorePhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query="coffee shop"&page=1&perPage=10`
    );
    const photos = await response.json();
    const results = photos?.results || [];
    return results.map((result: { urls: { small: string } }) => result.urls.small
    );
  } catch (error) {
    console.error('Error retrieving a photo', error);
    return [];
  }
};

const transformCoffeeData = (
  idx: number,
  result: MapTilerType,
  photos: Array<string>
) => {
  return {
    id: result.id,
    address: result.address || 'Address not found',
    name: result.text,
    imgUrl: photos.length > 0 ? photos[idx] : '',
  };
};

export const fetchCoffeeStores = async (longLat: string, limit: number) => {
    try {
        const response = await fetch(
          `https://api.maptiler.com/geocoding/melbourne%20coffee.json?proximity=${longLat}&fuzzyMatch=true&limit=${limit}&key=${process.env.MAPTILER_API_KEY}`
        );
        const data = await response.json();
        const photos = await getListOfCoffeeStorePhotos();

        return (
        data?.features?.map((result: MapTilerType, idx: number) => 
          transformCoffeeData(idx, result, photos)
        ) || []
      );

    } catch(error) {
        console.error('Error while fetching coffee stores', error);
        return {};
    }
};

export const fetchCoffeeStore = async (id: string, queryId: string) => {
    try {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${id}.json?limit=3&key=${process.env.MAPTILER_API_KEY}`
      ) || [];
      const data = await response.json();
      const photos = await getListOfCoffeeStorePhotos();
    

      const coffeeStore = data?.features?.map((result: MapTilerType) =>
        transformCoffeeData(parseInt(queryId), result, photos)) || [];

      return coffeeStore.length > 0 ? coffeeStore[0] : {};
      
    } catch (error) {
      console.error("Error while fetching coffee stores", error);
      return {};
    }
};