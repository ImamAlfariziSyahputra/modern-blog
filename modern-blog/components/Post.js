import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Post({
  id,
  imgUrl,
  date,
  title,
  body,
  category,
  ppUrl,
  author,
  job,
  noDivider,
}) {
  const router = useRouter();

  return (
    <div className="md:w-6/12 md:px-4">
      <div
        className="relative h-44 rounded-md overflow-hidden transition hover:cursor-pointer hover:opacity-75"
        onClick={() => router.push(`/${id}`)}
      >
        <Image
          src={imgUrl}
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
          <h4>{date}</h4>
        </div>
        <div className="">
          <h1
            className="text-2xl leading-9 pb-3 transition hover:cursor-pointer hover:underline underline-offset-2"
            onClick={() => router.push(`/${id}`)}
          >
            {title}
          </h1>
          <p className="text-base text-secondary">{body}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={ppUrl}
            alt=""
            className=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-base py-5">
          <h1>{author}</h1>
          <p className="text-secondary">{job}</p>
        </div>
      </div>
      {noDivider ? null : (
        <hr className="border md:border-none border-gray-800 my-2 mb-7" />
      )}
    </div>
  );
}
