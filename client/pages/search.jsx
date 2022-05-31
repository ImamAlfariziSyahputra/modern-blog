import { Fragment } from 'react';
import FeaturedPost from '../components/post/FeaturedPost';
import Footer from '../components/layouts/Footer';
import Navbar from '../components/layouts/Navbar';
import PostContainer from '../components/post/PostContainer';
import Post from '../components/post/Post';

export default function Home({ posts }) {
  console.log('posts => ', posts);
  return (
    <div className="h-screen overflow-y-scroll bg-primary text-white">
      <Navbar />

      <div className="text-center mt-12 mb-24">
        <h1 className="text-3xl">Search: UI Design</h1>
      </div>

      <PostContainer>
        {posts.length > 0 ? (
          posts.map((post, idx) => (
            <Post
              key={post.id}
              {...post}
              noDivider={posts.length === idx + 1}
            />
          ))
        ) : (
          <div className="w-full flex flex-col items-center mb-20">
            <h1 className="text-6xl">No result 😥</h1>
            <p className="text-xl">
              We couldn’t find any posts with the keyword `yahahahayuk`. Please
              try another keyword.
            </p>
          </div>
        )}
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
