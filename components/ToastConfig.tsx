import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

export const toastConfig = {
  success: ({ text1 = "Success", text2 }: { text1?: string; text2?: string }) => (
    <View className="bg-green-500 p-4 rounded-lg shadow-md mx-4 mb-4">
      <Text className="text-white font-bold">{text1}</Text>
      <Text className="text-white">{text2}</Text>
    </View>
  ),
  error: ({ text1 = 'Failure', text2 }: { text1?: string; text2?: string }) => (
    <View className="bg-red-500 p-4 rounded-lg shadow-md mx-4 mb-4">
      <Text className="text-white font-bold">{text1}</Text>
      <Text className="text-white">{text2}</Text>
    </View>
  ),
};

