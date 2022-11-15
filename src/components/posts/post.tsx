import { IPost } from '../../types/post';
import { formatDate } from '../../utils';
import styles from './posts.module.css';

interface PostProps {
  post: IPost;
}

export default function Post({ post: {message, createdTime} }: PostProps) {
  return (
    <div className={styles.post}>
      <div className={styles.header}>{formatDate(createdTime)}</div>
      <div className={styles.body}>{message}</div>
    </div>
  );
}
