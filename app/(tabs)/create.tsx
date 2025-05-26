import { View, TextInput, Pressable, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "@/hooks/hooks";
import { createPost } from "@/slices/posts.slice";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function CreatePostScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [post, setPost] = useState({
    title: "",
    body: "",
    userId: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!post.title.trim() || !post.body.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill all fields",
        position: "bottom",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(createPost(post)).unwrap();

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Post created successfully",
        position: "bottom",
      });
      setPost({ title: "", body: "", userId: 1 });
      router.push("/(tabs)");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create post",
        position: "bottom",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-50"
    >
      <LinearGradient
        colors={['#0ea5e9', '#0284c7']}
        className="p-4 pb-6 rounded-b-3xl shadow-lg"
      >
        <Text className="text-2xl font-bold text-white">
          Create New Post
        </Text>
        <Text className="text-primary-100 mt-1">
          Share your thoughts with the world
        </Text>
      </LinearGradient>

      <View className="p-4">
        <Animated.View 
          entering={FadeInDown.delay(100).springify()}
          className="mb-4"
        >
          <Text className="text-slate-700 font-medium mb-2">Title</Text>
          <View className="bg-white rounded-xl border border-primary-100 shadow-sm">
            <TextInput
              className="p-4 text-slate-800"
              placeholder="Give your post a title"
              placeholderTextColor="#94a3b8"
              value={post.title}
              onChangeText={(text) => setPost({ ...post, title: text })}
            />
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          className="mb-6"
        >
          <Text className="text-slate-700 font-medium mb-2">Content</Text>
          <View className="bg-white rounded-xl border border-primary-100 shadow-sm">
            <TextInput
              className="p-4 h-40 text-align-top text-slate-800"
              placeholder="What's on your mind?"
              placeholderTextColor="#94a3b8"
              multiline
              value={post.body}
              onChangeText={(text) => setPost({ ...post, body: text })}
            />
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(300).springify()}
        >
          <Pressable
            className={`p-4 rounded-xl flex-row items-center justify-center space-x-2 ${
              isSubmitting ? "bg-primary-400" : "bg-primary-500"
            } active:scale-95 shadow-sm`}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white font-semibold">Posting...</Text>
              </>
            ) : (
              <>
                <Ionicons name="send" size={20} color="white" />
                <Text className="text-white font-semibold">Post</Text>
              </>
            )}
          </Pressable>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}
