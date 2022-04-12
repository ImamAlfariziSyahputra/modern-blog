import React from 'react';

export default function PostContainer({ children }) {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">
      <div className="md:flex md:flex-wrap md:-mx-4">{children}</div>
    </section>
  );
}
