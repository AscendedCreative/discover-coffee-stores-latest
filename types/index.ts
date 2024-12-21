export interface CoffeeStoreType {
  id: string;
  name: string;
  address: string;
  voting: number;
  imgUrl: string;
};

export type MapTilerType = {
  id: string;
  address: string;
  text: string;
};

export type PositionType = {
  coords: {
    latitude: number; 
    longitude: number;
  } 
};

export interface AirtableRecordType {
  recordId: string;
  id: string;
  name: string;
  address: string;
  voting: number;
  imgUrl: string;
}

// export type ServerParamsType = {
//   params: { id: string };
//   searchParams: { id: string };
// }