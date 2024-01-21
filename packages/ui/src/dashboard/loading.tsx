export function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-bermuda">
      <div className="flex items-center justify-center space-x-1 text-gray-300 sm:text-[2vw]">
        <svg
          fill="none"
          className="h-16 w-16 animate-spin"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>

        <div>Loading ...</div>
      </div>
    </div>
  );
}

export function LoadingSmall() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-midnight">
      <div className="flex items-center justify-center space-x-1 text-gray-300 sm:text-[1vw]">
        <svg
          fill="none"
          className="h-6 w-6 animate-spin"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>

        <div>Loading ...</div>
      </div>
    </div>
  );
}
