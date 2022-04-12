import Breadcrumbs from './Breadcrumbs';

export default function ContentHeader() {
  return (
    <section>
      <div className="flex items-center mt-4">
        <h1 className="text-2xl font-medium pr-4 border-r border-gray-300">
          Add Blog
        </h1>
        <Breadcrumbs />
      </div>
    </section>
  );
}
