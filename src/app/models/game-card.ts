export interface CardData {
  data:Data
}

export interface Data {
  images: Images[];
  time: number;
  user_id : string;
}

export interface Images {
  id: string;
  image: string;
  pair_id: string;
  revealed:boolean;
}
