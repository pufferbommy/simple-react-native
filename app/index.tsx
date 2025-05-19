import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Post from '@/components/Post';
import { PostItem } from '@/post';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostSkeleton from '@/components/PostSkeleton';

export default function HomeScreen() {
  const [posts, setPosts] = useState<PostItem[]>([])
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getPosts = async (pageNumber: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${(pageNumber - 1) * 10}`)
      const data = await response.json()
      setPosts((prevPosts) => [...prevPosts, ...data.posts])
      setPage(pageNumber)
    } catch(error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPosts(1)
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>All Posts</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Post post={item} />}
        contentContainerStyle={styles.posts}
        onEndReached={() => getPosts(page + 1)}
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
  title: {
    color: "white",
    fontSize: 18,
    paddingInline: 16,
    paddingBottom: 8
  },
  posts: {
    paddingBottom: 16,
  },
});
