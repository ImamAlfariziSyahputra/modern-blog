import { Fragment } from 'react';
import FeaturedPost from '../components/FeaturedPost';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PostContainer from '../components/PostContainer';
import Post from '../components/Post';

export default function Home({ posts }) {
  return (
    <div className="h-screen overflow-y-scroll bg-primary text-white">
      <Navbar />

      <PostContainer>
        {posts.map((post, idx) => (
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
  const res = await fetch(`http://localhost:8000/posts`);
  const posts = await res.json();

  console.log('posts => ', posts);

  return {
    props: {
      posts,
    },
  };
}
