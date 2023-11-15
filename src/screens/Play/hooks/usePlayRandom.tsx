type ItemProps = {
  item: object;
  album: object;
};

type AlbumProps = {
  album: object;
};

export const usePlayRandom = ({ item, album }: ItemProps) => {
  const randomTrack = () => {
    console.log(album?.length);
  };

  return {
    randomTrack,
  };
};
