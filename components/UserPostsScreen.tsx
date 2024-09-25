import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import jsonPlaceholder from "../api/jsonPlaceholder";

type RootStackParamList = {
  UserPosts: { userId: number; user: any };
};

type UserPostsScreenRouteProp = RouteProp<RootStackParamList, "UserPosts">;

interface Props {
  route: UserPostsScreenRouteProp;
}

const UserPostsScreen: React.FC<Props> = ({ route }) => {
  const { userId, user } = route.params;
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null); 
      const response = await jsonPlaceholder.get(`/posts?userId=${userId}`);
      const newPosts = response.data.slice((page - 1) * 5, page * 5);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      if (newPosts.length < 5) {
        setHasMore(false);
      }
    } catch (err) {
      setError("Failed to load posts. Please try again later.");
      console.error(err); 
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleRetry = () => {
    fetchPosts();
  };

  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <Text style={styles.name}>{user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Phone: {user.phone}</Text>
        <Text>Website: {user.website}</Text>
      </View>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={posts}
            keyExtractor={(post, index) => `${post.id}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text>{item?.body}</Text>
              </View>
            )}
          />
          {hasMore && <Button title="Load More" onPress={loadMorePosts} />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userDetails: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  postContainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
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

export default UserPostsScreen;
