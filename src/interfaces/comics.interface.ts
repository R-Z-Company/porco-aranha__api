export interface ComicsInterface {
  id: number;
  title: string;
  description: string;
  isbn: string;
  dates: {
    type: string;
    date: string;
  }[];
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    items: {
      name: string;
      role: string;
    }[];
  };
  characters: {
    collectionURI: string;
  };
}
