import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import jsonPlaceholder from "../api/jsonPlaceholder";

type RootStackParamList = {
  Home: undefined;
  UserPosts: { userId: number; user: any };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const USERS_PER_PAGE = 5;

  useFocusEffect(
    React.useCallback(() => {
      setPage(1);
      fetchUsers();
    }, [])
  );

  useEffect(() => {
    setDisplayedUsers(users.slice(0, page * USERS_PER_PAGE));
  }, [page, users]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await jsonPlaceholder.get("/users");
      setUsers(response.data);
      setDisplayedUsers(response.data.slice(0, USERS_PER_PAGE));
    } catch (err) {
      setError("Failed to load users. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderUser = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UserPosts", { userId: item.id, user: item })
      }
    >
      <View style={styles.userContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Phone: {item.phone}</Text>
        <Text>Website: {item.website}</Text>
      </View>
    </TouchableOpacity>
  );

  const loadMoreUsers = () => {
    if (displayedUsers.length < users.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderLoadMoreButton = () => {
    if (loading) return <ActivityIndicator size="small" />;
    if (displayedUsers.length >= users.length) return null;

    return (
      <TouchableOpacity onPress={loadMoreUsers} style={styles.loadMoreButton}>
        <Text style={styles.loadMoreText}>Load More</Text>
      </TouchableOpacity>
    );
  };

  const handleRetry = () => {
    fetchUsers();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={displayedUsers}
          keyExtractor={(user) => user.id.toString()}
          renderItem={renderUser}
          ListFooterComponent={renderLoadMoreButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  loadMoreText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  errorContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
  retryButton: {
    padding: 10,
    backgroundColor: "#FF4C4C",
    borderRadius: 5,
  },
  retryText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
