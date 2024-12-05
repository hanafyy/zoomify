'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MeetingCard from './meetingCard';
import Loader from './loader';
import { useGetCalls } from '@/hooks/useGetCall';

function CallList({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  console.log(endedCalls, upcomingCalls);
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'upcoming':
        return upcomingCalls;
      case 'recordings':
        return recordings;
      default:
        return [];
    }
  };
  const getNoCalls = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls Were Found';
      case 'upcoming':
        return 'No Upcoming Calls Were Found';
      case 'recordings':
        return 'No Recorded Calls Were Found';
      default:
        return;
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, recordings]);

  const calls = getCalls();
  const callsMessages = getNoCalls();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                ? '/icons/upcoming.svg'
                : '/icons/recordings.svg'
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              'No Description'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            link={
              type === 'recordings'
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h2 className="h-full flex items-center justify-center col-span-2">
          {callsMessages}
        </h2>
      )}
    </div>
  );
}

export default CallList;
