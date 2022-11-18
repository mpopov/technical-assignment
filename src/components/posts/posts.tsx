import { useMemo, useState } from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import Post from './post';
import Filters from '../filters';
import styles from './posts.module.css';

interface PostsPorps {
  postIds: string[];
}

function Posts({ postIds }: PostsPorps) {
  const { entities: posts } = useTypedSelector((state) => state.posts);
  const [search, setSearch] = useState('');
  const [desc, setDesc] = useState(true);

  const current = useMemo(() => Object.values(posts).filter((post) => postIds.includes(post.id)), [postIds, posts]); // filter by postIds prop
  const displayed = useMemo(
    () =>
      Object.values(current)
        .filter((post) => post.message.toLocaleLowerCase().indexOf(search) >= 0) // filter by search
        .sort((a, b) => (a.createdTime > b.createdTime ? 1 : -1) * (desc ? -1 : 1)), // sorting
    [current, desc, search]
  );

  return (
    <div className={styles.posts}>
      {current.length ? (
        <>
          <Filters onSearchChange={setSearch} onDescChange={setDesc} />
          {!displayed.length && <>No posts matched</>}
          <div className={styles.list}>
            {displayed.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </>
      ) : (
        <>No posts from this user</>
      )}
    </div>
  );
}

export default Posts;
