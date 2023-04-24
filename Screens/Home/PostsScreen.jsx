import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
            <View>
              <Text>{item.title}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("MapScreen")}
                style={{ marginLeft: 100 }}
              >
                <Text>
                  <Feather name="map-pin" size={24} color="black" />
                  {item.locate}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("CommentsScreen")}
            >
              <EvilIcons
                name="comment"
                size={36}
                color="black"
                top={-25}
                width={36}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
