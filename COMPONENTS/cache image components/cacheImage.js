import React, { useEffect, useState, memo } from "react";
import { Image, View, ActivityIndicator } from "react-native";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

const CacheImage = (props) => {
  const { style, uri, title } = props;
  const [source, setSource] = useState();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setSource(null);
    const caching = async () => {
      const name = shorthash.unique(uri);
      // console.log(uri,title,name)
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
    setLoading(true);
    caching().then(() => {
      setLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <View style={{ ...style, backgroundColor: "white" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }
  return <Image style={style} source={{ uri: uri }} />;
};

export default CacheImage;
