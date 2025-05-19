import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Post from '@/components/Post';
import { PostItem } from '@/post';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostSkeleton from '@/components/PostSkeleton';

const PAGE_SIZE = 10

export default function HomeScreen() {
  const [posts, setPosts] = useState<PostItem[]>([])
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0)

  const fetchPosts = useCallback(async (pageNumber: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const skip = (pageNumber - 1) * PAGE_SIZE
      const response = await fetch(`https://dummyjson.com/posts?limit=${PAGE_SIZE}&skip=${skip}`)
      const data = await response.json()

      setPosts((prevPosts) => [...prevPosts, ...data.posts])
      setTotalPosts(data.total)
      setPage(pageNumber)
    } catch(error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  const handleLoadMore = () => {
    fetchPosts(page + 1);
  };

  useEffect(() => {
    fetchPosts(1)
  }, [fetchPosts]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Posts</Text>
        <Text style={styles.postCount}>{ posts.length } / {totalPosts}</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Post post={item} />}
        contentContainerStyle={styles.posts}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <PostSkeleton /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: 16,
    paddingBottom: 8
  },
  postCount: {
    color: "white",
      fontSize: 18,
  },
  title: {
    color: "white",
    fontSize: 18,
  },
  posts: {
    paddingBottom: 16,
  },
});
