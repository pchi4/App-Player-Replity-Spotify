import { ArtistsType } from "../Artists/propsCardArtists";

type PropsCardNewsReleases = {
  items: NewRealeases;
  navigation: object;
  handleClick: () => void;
  width: number | string;
  height: number | string;
};

export type NewRealeases = {
  album_type: string;
  total_tracks: number;
  available_markets: Array<string>;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<string>;
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  artists: Array<ArtistsType>;
};
