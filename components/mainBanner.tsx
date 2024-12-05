import React from 'react';

function MainBanner() {
  const currentDate = new Date();
  const decimalHours = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(currentDate);

  return (
    <div className="lg:h-[300px] h-[200px] w-full rounded-[20px] bg-hero bg-cover">
      <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 px-3 py-4">
        <h2 className="bg-white/20 rounded py-2 max-w-[270px] w-full text-center">
          Upcoming Meeting at: 12:30 PM
        </h2>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold lg:text-7xl">
            {decimalHours}
          </h1>
          <p className="text-lg font-medium text-sky-1 lg-text-2xl">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
