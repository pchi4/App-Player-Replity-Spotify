import AsyncStorage from "@react-native-async-storage/async-storage";

export const initial = {
  currentSound: {
    name: null,
    duration: null,
    numberTrack: null,
    uriTrack: null,
    artWork: null,
    artists: null,
    album: null,
  },
  user: {
    token: null,
    avatar: null,
    name: null,
  },
  album: {
    tracks: {
      index: null,
      items: null,
    },
    track: null,
  },
  statusSound: null,
  isNotMusic: true,
};

export default (state = initial, action: { type: string }) => {
  switch (action.type) {
    case "setCurrentSound":
      AsyncStorage.setItem(
        "sound",
        JSON.stringify(action.payload.currentSound)
      );
      return { ...state, currentSound: action.payload.currentSound };
      break;

    case "setUser":
      AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, user: action.payload.user };
      break;

    case "setAlbum":
      AsyncStorage.setItem("album", JSON.stringify(action.payload.album));
      return { ...state, album: action.payload.album };
      break;
    case "setStatus":
      AsyncStorage.setItem(
        "status",
        JSON.stringify(action.payload.statusSound)
      );
      return { ...state, statusSound: action.payload.statusSound };
      break;

    case "isNotMusic":
      AsyncStorage.setItem("isNotMusic", String(action.payload.isNotMusic));
      return { ...state, isNotMusic: String(action.payload.isNotMusic) };
      break;

    default:
      return state;
  }
};
