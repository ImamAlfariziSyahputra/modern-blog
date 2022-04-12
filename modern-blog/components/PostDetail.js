import React from 'react';
import Image from 'next/image';

export default function PostDetail({
  imgUrl,
  date,
  title,
  body,
  category,
  ppUrl,
  author,
  job,
}) {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 pb-2">
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-3 text-secondary text-sm mb-3">
          <h4 className="uppercase">{category}</h4>
          <span>•</span>
          <h4>{date}</h4>
        </div>

        <div className="w-11/12 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">{title}</h1>
        </div>

        {/* Profile Section */}
        <div className="flex items-center my-3">
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
      </div>

      {/* Content Image */}
      <div className="relative h-96 rounded-md overflow-hidden mb-6">
        <Image
          src={imgUrl}
          alt=""
          className=""
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="px-2 md:px-11 lg:px-18">
        <p className="mb-3 text-xl">
          Male sixth sea it a. Brought was signs female darkness signs form
          cattle land grass whose from subdue also they&quot;re their brought
          seas isn&quot;t, to day from bearing grass third midst after beginning
          man which you&quot;re. Dry, gathering beginning given made them
          evening.
        </p>
        <p className="mb-3 text-xl">
          Lights dry. Thing, likeness, forth shall replenish upon abundantly our
          green. Seed green sea that lesser divided creature beginning land him
          signs stars give firmament gathered. Wherein there their morning a he
          grass. Don&quot;t made moving for them bring creature us you&quot;ll
          tree second deep good unto good may. Us yielding.
        </p>
        <p className="mb-3 text-xl">
          Have. Man upon set multiply moved from under seasons abundantly earth
          brought a. They&quot;re open moved years saw isn&quot;t morning
          darkness. Over, waters, every let wherein great were fifth saw was
          lights very our place won&quot;t and him Third fourth moving him
          whales behold. Beast second stars lights great was don&quot;t green
          give subdue his. Third given made created, they&quot;re forth god
          replenish have whales first can&quot;t light was. Herb you&quot;ll
          them beast kind divided. Were beginning fly air multiply god Yielding
          sea don&quot;t were forth.
        </p>
      </div>
    </section>
  );
}
