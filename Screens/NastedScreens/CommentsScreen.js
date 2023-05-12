import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import { database } from "../../firebase/config";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function CommentsScreen({ route }) {
  const { postId, userId } = route.params;
  const [allComment, setAllComment] = useState([]);
  console.log("postId", postId);
  const [comment, setComment] = useState("");

  const { nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    const commentData = {
      nickName,
      comment,
      date: Date.now(),
    };
    await addDoc(collection(database, `posts/${postId}/comments`), commentData);
    await setComment("");
    await console.log("comment", comment);
  };

  const getAllComments = async () => {
    const querySnapshot = await getDocs(
      collection(database, `posts/${postId}/comments`)
    );
    setAllComment(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    console.log("allComment", allComment);
  };

  const dataFormat = (data) => {
    const date = new Date(data);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "UTC",
    };
    return new Intl.DateTimeFormat("ru-RU", options).format(date);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.commentContainer}>
        <FlatList
          data={allComment}
          renderItem={({ item }) => (
            <View style={styles.commentWrap}>
              <Text style={styles.commentTitle}>{item.nickName}</Text>
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.commentData}>{dataFormat(item.date)}</Text>
            </View>
          )}
        />
      </SafeAreaView>
      <View style={styles.commentForm}>
        <TextInput
          // value={state.title}
          onChangeText={setComment}
          placeholder="Комментировать..."
          style={styles.inputComment}
          // onFocus={() => setIsShowKeyboard(true)}
        />
        <TouchableOpacity onPress={createComment} style={styles.sendBtn}>
          <View style={styles.sendButtonLabel}>
            <Ionicons name="arrow-up-circle" size={38} color="#FF6C00" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  commentForm: {
    position: "relative",
    width: "100%",
    marginBottom: 16,
  },
  inputComment: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    fontSize: 16,
    color: "#212121",
    height: 50,
    padding: 16,
  },
  sendButtonLabel: {
    position: "absolute",
    top: -45,
    left: 360,
    color: "#FF6C00",
  },
  commentContainer: {
    flex: 1,
    width: 300,
    paddingTop: 16,
    paddingBottom: 16,
  },
  commentWrap: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    marginBottom: 24,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentTitle: {
    marginBottom: 8,
    // fontFamily: "Roboto-Medium",
    fontSize: 13,
    color: "#212121",
  },

  commentText: {
    marginBottom: 8,

    // fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
  },
  commentData: {
    // fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    textAlign: "right",
  },
});
