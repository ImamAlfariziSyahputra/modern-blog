import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Post({
  id,
  title,
  slug,
  image,
  content,
  category,
  ppUrl,
  author,
  job,
  createdAt,
  noDivider,
}) {
  const router = useRouter();

  return (
    <div className="md:w-6/12 lg:w-4/12 md:px-4">
      <div
        className="relative h-44 rounded-md overflow-hidden transition hover:cursor-pointer hover:opacity-75"
        onClick={() => router.push(`/${slug}`)}
      >
        <Image
          src={image}
          alt=""
          className=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div>
        <div className="flex items-center space-x-3 text-secondary text-sm py-3">
          <h4 className="uppercase">{category}</h4>
          <span>•</span>
          <h4>{createdAt}</h4>
        </div>
        <div className="">
          <h1
            className="text-2xl leading-9 pb-3 transition hover:cursor-pointer hover:underline underline-offset-2 title-line-2"
            onClick={() => router.push(`/${slug}`)}
          >
            {title}
          </h1>
          <p className="text-base text-secondary content-line-3">{content}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={image}
            alt=""
            className=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-base py-5">
          <h1>Matt Murdock</h1>
          <p className="text-secondary">Front End Dev</p>
        </div>
      </div>
      {noDivider ? null : (
        <hr className="border md:border-none border-gray-800 my-2 mb-7" />
      )}
    </div>
  );
}
