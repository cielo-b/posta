import { View, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { NewPost } from "@/types/new.post";

export default function CreatePostScreen() {
  const router = useRouter();
  const [post, setPost] = useState<NewPost>({
    title: "",
    body: "",
    userId: 1, // Hardcoded for demo
  });

  const handleSubmit = async () => {
    if (!post.title || !post.body) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("Success", "Post created successfully");
      setPost({ title: "", body: "", userId: 1 });
      router.push("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Failed to create post");
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <TextInput
        className="p-4 mb-3 bg-white rounded-lg"
        placeholder="Post title"
        value={post.title}
        onChangeText={(text) => setPost({ ...post, title: text })}
      />
      <TextInput
        className="p-4 mb-3 bg-white rounded-lg h-40 text-align-top"
        placeholder="What's on your mind?"
        multiline
        value={post.body}
        onChangeText={(text) => setPost({ ...post, body: text })}
      />
      <Pressable className="p-4 bg-blue-500 rounded-lg" onPress={handleSubmit}>
        <Text className="text-white text-center font-bold">Post</Text>
      </Pressable>
    </View>
  );
}
