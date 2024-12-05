import MainBanner from '@/components/mainBanner';
import MeetingTypeList from '@/components/meetingTypeList';
import React from 'react';

function page() {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <MainBanner />
      <MeetingTypeList />
    </section>
  );
}

export default page;
