import parse from 'html-react-parser';
import Image from 'next/image';

export default function PostDetail({
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
}) {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 pb-2">
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-3 text-secondary text-sm mb-3">
          <h4 className="uppercase">{category}</h4>
          <span>•</span>
          <h4>{createdAt}</h4>
        </div>

        <div className="w-11/12 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">{title}</h1>
        </div>

        {/* Profile Section */}
        <div className="flex items-center my-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src={image}
              alt=""
              className=""
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>

          <div className="text-base py-5">
            <h1>Matt Murdock</h1>
            <p className="text-secondary">Front End Dev</p>
          </div>
        </div>
      </div>

      {/* Content Image */}
      <div className="relative h-96 rounded-md overflow-hidden mb-6">
        <Image
          src={image}
          alt=""
          className=""
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="px-2 md:px-11 lg:px-18">
        <div className="mb-3 text-xl">{parse(content)}</div>
      </div>
    </section>
  );
}
