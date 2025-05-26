import { View, Text, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchPostById } from "@/slices/posts.slice";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentPost, loading, error } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(Number(id)));
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
    }
  }, [error]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  if (!currentPost) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <View className="w-20 h-20 rounded-full bg-primary-50 items-center justify-center mb-4">
          <Ionicons name="alert-circle-outline" size={40} color="#0ea5e9" />
        </View>
        <Text className="text-slate-500 text-lg font-medium">Post not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 bg-primary-500 px-6 py-3 rounded-xl active:scale-95"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <LinearGradient
        colors={['#0ea5e9', '#0284c7']}
        className="p-6 pb-8 rounded-b-3xl shadow-lg"
      >
        <View className="flex-row items-center mb-4">
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
            <Ionicons name="person" size={24} color="white" />
          </View>
          <View className="ml-3">
            <Text className="text-white font-medium">User {currentPost.userId}</Text>
            <Text className="text-primary-100 text-sm">Just now</Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-white mb-3">
          {currentPost.title}
        </Text>
        <Text className="text-primary-100 text-base leading-6">
          {currentPost.body}
        </Text>
      </LinearGradient>

      <View className="px-4 -mt-4">
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xl font-semibold text-slate-800 mb-4">
            Comments
          </Text>

          {currentPost.comments?.length ? (
            currentPost.comments.map((comment: any, index: number) => (
              <Animated.View
                key={comment.id}
                entering={FadeIn.delay(index * 100)}
                className="mb-4 bg-slate-50 rounded-xl p-4"
              >
                <View className="flex-row items-center mb-2">
                  <View className="w-8 h-8 rounded-full bg-primary-100 items-center justify-center">
                    <Ionicons name="person" size={16} color="#0ea5e9" />
                  </View>
                  <View className="ml-2">
                    <Text className="font-medium text-slate-800">
                      {comment.name}
                    </Text>
                    <Text className="text-slate-400 text-xs">
                      {comment.email}
                    </Text>
                  </View>
                </View>
                <Text className="text-slate-600 leading-5">{comment.body}</Text>
              </Animated.View>
            ))
          ) : (
            <Animated.View 
              entering={FadeIn}
              className="items-center py-8 bg-slate-50 rounded-xl"
            >
              <View className="w-16 h-16 rounded-full bg-primary-50 items-center justify-center mb-3">
                <Ionicons name="chatbubble-outline" size={32} color="#0ea5e9" />
              </View>
              <Text className="text-slate-500 text-lg font-medium">No comments yet</Text>
              <Text className="text-slate-400 mt-1">Be the first to comment</Text>
            </Animated.View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
