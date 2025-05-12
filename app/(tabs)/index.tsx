import { View, Text, FlatList, Pressable, RefreshControl } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { Post } from "@/types/post";

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // TODO: Replace with actual API call
  const fetchPosts = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPosts([
      { id: 1, title: "First Post", body: "This is my first post", userId: 1 },
      {
        id: 2,
        title: "Second Post",
        body: "Another interesting post",
        userId: 1,
      },
    ]);
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchPosts}
            tintColor="#3b82f6"
          />
        }
        ListHeaderComponent={
          <Text className="text-2xl font-bold p-4 bg-white">Recent Posts</Text>
        }
        renderItem={({ item }) => (
          <Link href={`/posts/${item.id}`} asChild>
            <Pressable className="p-4 mb-2 bg-white">
              <Text className="text-lg font-semibold">{item.title}</Text>
              <Text className="text-gray-600 mt-1">{item.body}</Text>
            </Pressable>
          </Link>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-gray-500">No posts yet</Text>
          </View>
        }
      />
    </View>
  );
}
