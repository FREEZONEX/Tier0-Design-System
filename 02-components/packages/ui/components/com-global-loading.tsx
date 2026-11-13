import { ComGlobalSpinner } from './com-global-spinner';

function ComGlobalLoading() {
  return (
    <div className="bg-bg/60 absolute top-0 left-0 z-10 flex h-full w-full flex-col items-center justify-center gap-1">
      <ComGlobalSpinner />
    </div>
  );
}

export { ComGlobalLoading };
