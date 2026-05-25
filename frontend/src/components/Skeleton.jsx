const Skeleton = ({ className = "" }) => {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
};

export const PageSkeleton = () => (
  <div className="p-4">
    <div className="animate-pulse bg-gray-200 rounded h-8 w-1/2 mb-4" />
    <div className="animate-pulse bg-gray-200 rounded h-4 w-full mb-2" />
    <div className="animate-pulse bg-gray-200 rounded h-4 w-3/4" />
  </div>
);

export default Skeleton;