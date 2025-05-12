import { SafeAreaView, ScrollView, Text, View } from "react-native";
import "../global.css";
import { Stack, useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        className="flex-1"
      >
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-xl font-bold">Welcome to PostStack</Text>
          <View className="w-full mt-8">
            {/* <CustomButton
              title="Go Home"
              handlePress={() => router.navigate("(tabs)")}
              containerStyles="mb-3"
            /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
