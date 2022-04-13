import { Fragment } from 'react';
import FeaturedPost from '../components/FeaturedPost';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PostContainer from '../components/PostContainer';
import Post from '../components/Post';
import { useGetPostsQuery } from '@/redux/apis/postApi';
import LoadingBox from '@/components/box/LoadingBox';

export default function Home() {
  const { data: posts, isSuccess, isError, isLoading } = useGetPostsQuery();
  console.log('posts => ', posts);
  return (
    <div className="h-screen overflow-y-scroll bg-primary text-white">
      <Navbar />

      <PostContainer>
        {isLoading ? <LoadingBox /> : null}
        {isError ? 'Error..' : null}
        {isSuccess &&
          posts.map((post, idx) => (
            <Fragment key={post.id}>
              {idx == 0 && (
                <FeaturedPost {...post} noDivider={posts.length === idx + 1} />
              )}

              {idx != 0 && (
                <Post {...post} noDivider={posts.length === idx + 1} />
              )}
            </Fragment>
          ))}
      </PostContainer>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // const res = await fetch(`http://localhost:8000/posts`);
  // const posts = await res.json();

  // console.log('posts => ', posts);

  return {
    props: {
      posts: [],
    },
  };
}
