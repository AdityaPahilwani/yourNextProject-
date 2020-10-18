import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

const CacheImageBackground = (props) => {
  const [source, setSource] = useState();

  useEffect(() => {
    console.log("called");
    const caching = async () => {
      const { uri } = props;
      const name = shorthash.unique(uri);
      // console.log(name);
      const path = `${FileSystem.cacheDirectory}${name}`;
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        // console.log("read image from cache");
        setSource(image.uri);
        return;
      }

      // console.log("downloading image to cache");
      const newImage = await FileSystem.downloadAsync(uri, path);
      setSource(newImage.uri);
    };
    caching();
  }, []);

  const { children } = props;
  return (
    <ImageBackground style={props.style} imageStyle={props.imageStyle} source={{ uri: source }}>
      {children}
    </ImageBackground>
  );
};

export default CacheImageBackground;
