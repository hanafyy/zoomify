'use client';
import Loader from '@/components/loader';
import MeetingRoom from '@/components/meetingRoom';
import MeetingSetup from '@/components/meetingSetup';
import useGetCallById from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
  const { call, isCallLoading } = useGetCallById(params.id);
  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="min-h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}
