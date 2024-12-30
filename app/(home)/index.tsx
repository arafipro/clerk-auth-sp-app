import {
  SignedIn,
  SignedOut,
  useAuth,
  useOAuth,
  useUser,
} from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_github",
  });

  const handleGitHubLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <SignedIn>
        <Text className="mt-2">ユーザーID: {user?.fullName}</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">ログアウト</Text>
        </TouchableOpacity>
      </SignedIn>
      <SignedOut>
        <TouchableOpacity
          onPress={handleGitHubLogin}
          className="flex-row items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg"
        >
          <Ionicons name="logo-github" size={24} />
          <Text className="font-semibold">GitHubでログイン</Text>
        </TouchableOpacity>
      </SignedOut>
    </View>
  );
}
