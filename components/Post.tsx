import { Pressable, StyleSheet, Text, View } from 'react-native';
import Avatar from '@zamplyy/react-native-nice-avatar';
import { Heart, Eye, Send } from 'lucide-react-native';
import { PostItem } from '@/post';
import { memo, useReducer } from 'react';

const MemoAvatar = memo(function MemoAvatar() {
  return <Avatar size={32} />
})

export default function Post({post}: {post: PostItem}) {
  const [isLiked, toggleLike] = useReducer(prevIsLiked => !prevIsLiked, false)

  return <View style={styles.post}>
    <MemoAvatar />
    <View style={styles.postContent}>
      <Text style={styles.postBody}>{post.body}</Text>
      <View style={styles.postActions}>
        <Pressable onPress={toggleLike} style={() => [styles.postLikeButton]}>
          <Heart color={isLiked ? "pink" : "white"} fill={isLiked ? "pink" : ""} size={16} />
          <Text style={styles.postLikes}>{post.reactions.likes}</Text>
        </Pressable>
        <Pressable style={() => [styles.postLikeButton]}>
          <Eye color="white" size={16} />
          <Text style={styles.postLikes}>{post.views}</Text>
        </Pressable>
        <Pressable style={() => [styles.postLikeButton]}>
          <Send color="white" size={16} />
        </Pressable>
      </View>
    </View>
  </View>
}

const styles = StyleSheet.create({
  post: {
    padding: 16,
    flexDirection: 'row',
    display: "flex",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
    gap: 8
  },
  postContent: {
    flex: 1,
    display: "flex",
    gap: 8
  },
  postBody: {
    color: "white"
  },
  postActions: {
    display: "flex",
    flexDirection: "row",
    gap: 16
  },
  postLikeButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  postLikes: {
    color: "white",
    fontSize: 12
  }
});
