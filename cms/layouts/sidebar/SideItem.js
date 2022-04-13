import { useRouter } from 'next/router';
import classNames from 'classnames';

export default function SideItem({ children, Icon, href }) {
  const router = useRouter();
  const isActive = router.pathname === href || router.asPath === href;

  const handleClick = (e) => {
    e.prevendDefault();
    router.push(href);
  };

  return (
    <div
      className={classNames(
        'flex items-center rounded hover:cursor-pointer hover:text-hover group transition-all',
        isActive && 'active py-2 text-white hover:text-white'
      )}
    >
      <div className="w-3/12 text-center">
        <Icon className="!w-6 !h-6 group-hover:!ml-4" />
      </div>
      <div className="w-9/12">
        <a className="" onClick={handleClick}>
          {children}
        </a>
      </div>
    </div>
  );
}
