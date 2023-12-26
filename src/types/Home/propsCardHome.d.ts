export type CardType = {
  navigation: object;
  items: Card;
};

type Card = {
  id: number;
  img: string;
  title: string | null;
  artista: string;
  album: string;
};
