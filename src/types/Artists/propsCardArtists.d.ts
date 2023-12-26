export type PropsCardAlbum = {
  items: ArtistsType;
  navigation: object;
  handleClick: () => void;
  width: number | string;
  height: number | string;
};

export type ArtistsType = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<any>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type ArtistsDetailsPLaylist = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<any>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
};
