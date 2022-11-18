import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Posts from './posts';
import { normalizedData } from '../../mocks';

//prepare mock posts data that looks like in store
const mockPosts = normalizedData.posts;
const mockPostIds = Object.keys(mockPosts);

//mock custom hook to get posts not from store
jest.mock('../../hooks/use-typed-selector', () => ({
  useTypedSelector: (selector: any) => selector({ posts: { entities: mockPosts } }),
}));

const noPostsMsg = () => screen.queryByText(/No posts from this user/i);
const postEls = () => screen.queryAllByTestId('post');
const searchInp = () => screen.getByPlaceholderText('Search');
const noPostsSearchMsg = () => screen.queryByText(/No posts matched/i);

describe('Posts', () => {
  test('render message when no data', () => {
    const postIds: string[] = [];
    render(<Posts postIds={postIds} />);
    expect(noPostsMsg()).toBeInTheDocument();
  });

  test('render message when wrong data', () => {
    const postIds = ['1', '2'];
    render(<Posts postIds={postIds} />);
    expect(noPostsMsg()).toBeInTheDocument();
  });

  test('render posts from list of ids', () => {
    const postIds = mockPostIds.slice(0, 2);
    render(<Posts postIds={postIds} />);
    expect(noPostsMsg()).not.toBeInTheDocument();
    expect(postEls()).toHaveLength(2);
    expect(screen.getByText(mockPosts[postIds[0]].message)).toBeInTheDocument();
    expect(screen.getByText(mockPosts[postIds[1]].message)).toBeInTheDocument();
  });

  test('filtering posts', async () => {
    render(<Posts postIds={mockPostIds} />);
    expect(postEls()).toHaveLength(6);

    await userEvent.type(searchInp(), 'haircut');
    expect(screen.queryAllByText(/haircut/i)).toHaveLength(2);
    expect(postEls()).toHaveLength(2);

    await userEvent.type(searchInp(), ' prescription');
    expect(screen.queryAllByText(/haircut prescription/i)).toHaveLength(1);
    expect(postEls()).toHaveLength(1);

    await userEvent.type(searchInp(), 'zzzxxx');
    expect(screen.queryAllByText(/haircut prescriptionzzzxxx/i)).toHaveLength(0);
    expect(postEls()).toHaveLength(0);
    expect(noPostsSearchMsg()).toBeInTheDocument();

    await userEvent.clear(searchInp());
    expect(postEls()).toHaveLength(6);
    expect(noPostsSearchMsg()).not.toBeInTheDocument();
  });

  test('sorting posts', async () => {
    const minDateText = 'November 16, 2022 8:46:54';
    const maxDateText = 'November 17, 2022 7:52:28';
    render(<Posts postIds={mockPostIds} />);
    expect(postEls()).toHaveLength(6);

    await userEvent.click(screen.getAllByRole('button')[1]);
    const descPosts = postEls();
    expect(descPosts[5]).toHaveTextContent(minDateText);
    expect(descPosts[0]).toHaveTextContent(maxDateText);

    await userEvent.click(screen.getAllByRole('button')[0]);
    const ascPosts = postEls();
    expect(ascPosts[0]).toHaveTextContent(minDateText);
    expect(ascPosts[5]).toHaveTextContent(maxDateText);
  });
});
