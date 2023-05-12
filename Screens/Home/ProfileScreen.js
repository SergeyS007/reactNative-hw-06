import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  Dimensions,
} from "react-native";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { logoutDB } from "../../redux/auth/authOperations";
import { database } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const dispatch = useDispatch();
  const { userId, nickName } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    const q = query(
      collection(database, "posts"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    setUserPosts(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };
  console.log("userPosts", userPosts);
  const getAllComments = async () => {
    const querySnapshot = await getDocs(
      collection(database, `posts/${userPosts.id}/comments`)
    );
    setAllComment(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
  };

  const logOut = () => {
    dispatch(logoutDB());
  };

  useEffect(() => {
    getUserPosts();
    getAllComments();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBG}
          source={require("../../assets/photoBG.png")}
        >
          <View style={styles.containerProfile}>
            <View style={styles.userTextWrap}>
              <Text style={styles.userLogin}>{nickName}</Text>
            </View>
            <TouchableOpacity onPress={logOut} style={styles.btn}>
              <AntDesign name="logout" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.image}>
              <Image
                source={require("../../assets/icon.png")}
                style={{ width: 120, height: 120 }}
              />
            </View>
            <View>
              <FlatList
                data={userPosts}
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
                        style={{ marginLeft: 200 }}
                      >
                        <Text>
                          <Feather name="map-pin" size={24} color="black" />
                          {item.locate}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("PostsScreen", {
                          screen: "CommentsScreen",
                          params: { postId: item.id },
                        })
                      }
                    >
                      <FontAwesome
                        name="comment"
                        size={30}
                        color="#FF6C00"
                        top={-25}
                        width={36}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <AntDesign
                        name="like2"
                        size={30}
                        color="#FF6C00"
                        top={-57}
                        left={80}
                      />
                    </TouchableOpacity>
                    <Text top={-80} left={38}>
                      {allComment.length}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  containerProfile: {
    marginTop: 120,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  image: {
    position: "absolute",
    right: Dimensions.get("window").width / 2 - 60,
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btn: {
    position: "absolute",
    top: 20,
    right: 16,
  },
  userTextWrap: {
    marginTop: 92,
    marginBottom: 30,
  },
  userLogin: {
    // fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },
});
