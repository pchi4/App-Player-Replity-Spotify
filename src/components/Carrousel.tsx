import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { FlatList, Image, StyleSheet } from "react-native";
import { Box, Text } from "native-base";
const width = Dimensions.get("screen").width;

export const CarouselAutoScroll = ({ data, interval }) => {
  const imageRef = useRef();
  const [active, setActive] = useState(0);
  const indexRef = useRef(active);
  indexRef.current = active;

  useInterval(() => {
    if (active < Number(data?.length) - 1) {
      setActive(active + 1);
    } else {
      setActive(0);
    }
  }, interval);

  useEffect(() => {
    imageRef.current.scrollToIndex({ index: active, animated: true });
  }, [active]);

  const onViewableItemsChangedHandler = useCallback(
    ({ viewableItems, changed }) => {
      if (active != 0) {
        setActive(viewableItems[0].index);
      }
    },
    []
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      initialNumToRender={4}
      onViewableItemsChanged={onViewableItemsChangedHandler}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
      // getItemLayout={(_, idx) => ({
      //   length: data.length,
      //   offset: width * idx,
      //   idx,
      // })}
      ref={imageRef}
      pagingEnabled
      data={data}
      horizontal
      renderItem={({ item, index }) => (
        <Text color="#FFFFFF" fontWeight="bold" fontSize="lg">
          {item}
        </Text>
      )}
      // keyExtractor={(item, idx) => idx}

      style={{ ...StyleSheet.AbsoluteFill }}
    />
  );
};

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
