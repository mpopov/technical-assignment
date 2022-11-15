import { useMemo } from 'react';
import { useTypedSelector } from '../../hooks/user-typed-selector';
import Post from './post';
import styles from './posts.module.css';

interface PostsPorps {
  postIds: string[];
}

function Posts({ postIds }: PostsPorps) {
  const { entities: posts } = useTypedSelector((state) => state.posts);
  const displayed = useMemo(() => Object.values(posts).filter((post) => postIds.includes(post.id)), [postIds, posts]);

  return (
    <div className={styles.posts}>
      {!displayed.length && <>No posts from this user</>}
      {displayed.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
