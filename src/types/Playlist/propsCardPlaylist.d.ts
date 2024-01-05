import {
  ArtistsType,
  ArtistsDetailsPLaylist,
} from "../Artists/propsCardArtists";

export type PropsCardPlaylist = {
  items: Playlist;
  navigation: object;
  handleClick: () => void;
  Width: number | string | null;
  Height: number | string | null;
};

type Playlist = {
  collaborative: false;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<any>;
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};
