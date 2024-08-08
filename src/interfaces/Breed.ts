export interface BreedImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface Breed {
  id: number | string;
  name: string;
  description: string;
  image: BreedImage;
  life_span: string;
  temperament: string;
  weight: {
    imperial: string;
    metric: string;
  };
}
