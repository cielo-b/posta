import {
  View,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchMorePosts, fetchPosts } from "@/slices/posts.slice";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export default function FeedScreen() {
  const dispatch = useAppDispatch();
  const { posts, loading, error, hasMore } = useAppSelector(
    (state) => state.posts
  );
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch<any>(fetchPosts({ start: 0, limit: 10 }));
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to refresh posts",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleEndReached = async () => {
    if (!loading && hasMore) {
      try {
        await dispatch(fetchMorePosts({ start: posts.length, limit: 10 }));
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to load more posts",
        });
      }
    }
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
    }
  }, [error]);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 100).springify()}>
      <Link href={`/posts/${item.id}`} asChild>
        <Pressable className="p-4 mb-3 mx-2 rounded-2xl bg-white shadow-sm active:scale-95 transition-transform border border-primary-100">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center">
              <Ionicons name="person" size={20} color="#0ea5e9" />
            </View>
            <View className="ml-3">
              <Text className="text-primary-600 font-medium">User {item.userId}</Text>
              <Text className="text-slate-400 text-xs">Just now</Text>
            </View>
          </View>
          <Text className="text-lg font-semibold text-slate-800">
            {item.title}
          </Text>
          <Text className="text-slate-600 mt-2 leading-5">{item.body}</Text>
          <View className="flex-row items-center mt-4 space-x-4">
            <View className="flex-row items-center bg-primary-50 px-3 py-1.5 rounded-full">
              <Ionicons name="chatbubble-outline" size={16} color="#0ea5e9" />
              <Text className="text-primary-600 ml-1 text-sm font-medium">
                {item.comments ? item.comments.length : 0}
              </Text>
            </View>
            <View className="flex-row items-center bg-secondary-50 px-3 py-1.5 rounded-full">
              <Ionicons name="heart-outline" size={16} color="#d946ef" />
              <Text className="text-secondary-600 ml-1 text-sm font-medium">0</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-slate-50">
      <LinearGradient
        colors={['#0ea5e9', '#0284c7']}
        className="p-4 pb-6 rounded-b-3xl shadow-lg"
      >
        <Text className="text-2xl font-bold text-white">
          Recent Posts
        </Text>
        <Text className="text-primary-100 mt-1">
          What's new in your network
        </Text>
      </LinearGradient>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#0ea5e9"]}
            tintColor="#0ea5e9"
          />
        }
        renderItem={renderItem}
        ListEmptyComponent={
          !loading ? (
            <View className="flex-1 items-center justify-center p-4">
              <View className="w-20 h-20 rounded-full bg-primary-50 items-center justify-center mb-4">
                <Ionicons name="newspaper-outline" size={40} color="#0ea5e9" />
              </View>
              <Text className="text-slate-500 text-lg font-medium">No posts yet</Text>
              <Text className="text-slate-400 mt-1">Be the first to share something!</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          loading && posts.length > 0 ? (
            <ActivityIndicator size="small" color="#0ea5e9" className="my-4" />
          ) : null
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
