import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PostDetail from '../components/PostDetail';

export default function PostId({ post }) {
  return (
    <div className="h-screen overflow-y-scroll bg-primary text-white">
      <Navbar />

      <PostDetail {...post} />

      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const {
    query: { id },
  } = ctx;

  const res = await fetch(`http://localhost:8000/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}
