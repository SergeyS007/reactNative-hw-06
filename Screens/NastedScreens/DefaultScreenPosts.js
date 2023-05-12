import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
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
import { block } from "react-native-reanimated";

const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { nickName, email } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(database, "posts"));
    setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <View style={styles.infoUserWrapper}>
        <View style={styles.imageUser}></View>
        <View>
          <Text style={styles.textUser}>{nickName}</Text>
          <Text style={styles.emailUser}>{email}</Text>
        </View>
      </View>

      <View style={styles.containerList}>
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
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      location: item.location,
                    })
                  }
                  style={{ marginLeft: 100 }}
                >
                  <Text>
                    <Feather name="map-pin" size={24} color="black" />
                    {item.locate}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CommentsScreen", {
                    postId: item.id,
                  })
                }
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  containerList: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageUser: {
    width: 60,
    height: 60,
    backgroundColor: "orange",
    borderRadius: 16,
    marginRight: 8,
    marginLeft: 16,
    marginTop: 32,
  },
  infoUserWrapper: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  textUser: {
    fontSize: 13,
    color: "#212121",
  },
  emailUser: {
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
export default DefaultScreenPosts;
