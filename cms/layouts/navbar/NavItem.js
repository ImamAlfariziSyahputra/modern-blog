import classNames from 'classnames';

export default function NavItems({ Icon, className }) {
  return (
    <>
      <Icon
        className={classNames(
          '!h-6 !w-6 hover:!text-hover hover:!cursor-pointer !mr-4',
          className
        )}
      />
    </>
  );
}
