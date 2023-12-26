import { ArtistsType } from "../Artists/propsCardArtists";

export type PropsCardAlbum = {
  items: AlbumType;
  navigation: object;
  handleClick: () => void;
  width: number | string;
  height: number | string;
};

type AlbumType = {
  album_type: string;
  total_tracks: number;
  available_markets: Array<string>;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<any>;
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  artists: Array<any>;
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Array<{ added_at: string; album: Album }>;
  };
  copyrights: [
    {
      text: string;
      type: string;
    }
  ];
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: Array<string>;
  label: string;
  popularity: number;
};

type Album = {
  artists: Array<ArtistsType>;
  available_markets: Array<string>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  restrictions: {
    reason: string;
  };
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: false;
};
