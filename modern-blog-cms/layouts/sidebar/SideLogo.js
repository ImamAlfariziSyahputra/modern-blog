import Image from 'next/image';

export default function SideLogo() {
  return (
    <div className="sticky top-0 py-6 px-6 bg-white flex items-center justify-between text-[#7267f0] z-10 shadow-bottom">
      <div className="flex items-center space-x-3">
        <div className="relative w-9 h-6">
          <Image
            src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/logo.86b72fab.svg"
            alt="Logo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="text-xl font-semibold">Vuexy</h1>
      </div>
      <span className="text-sm">O</span>
    </div>
  );
}
