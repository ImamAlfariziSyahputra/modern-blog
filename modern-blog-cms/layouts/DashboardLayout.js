import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import ContentHeader from './ContentHeader';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex text-primary font-montserrat">
      <Sidebar />
      <section className="flex-grow mx-5">
        <Navbar />

        <ContentHeader />

        <div className=" bg-white rounded p-5 my-6 border shadow text-sm">
          {children}
        </div>
      </section>
    </div>
  );
}
