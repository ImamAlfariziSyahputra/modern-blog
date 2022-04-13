import React from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PostDetail from '../components/PostDetail';
import { useGetPostQuery } from '@/redux/apis/postApi';
import LoadingBox from '@/components/box/LoadingBox';

export default function PostId() {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const { data: post, isSuccess, isError, isLoading } = useGetPostQuery(slug);
  console.log('post => ', post);
  return (
    <div className="h-screen overflow-y-scroll bg-primary text-white">
      <Navbar />

      {isLoading ? <LoadingBox /> : null}
      {isError ? 'Error..' : null}
      {isSuccess && <PostDetail {...post} />}

      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // const {
  //   query: { id },
  // } = ctx;

  // const res = await fetch(`http://localhost:8000/posts/${id}`);
  // const post = await res.json();

  return {
    props: {
      post: [],
    },
  };
}
