'use client';
import React, { useState } from 'react';
import MeetingTypeBox from './meetingTypeBox';
import { useRouter } from 'next/navigation';
import MeetingModal from './meetingModal';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient, Call } from '@stream-io/video-react-sdk';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { Input } from './ui/input';
function MeetingTypeList() {
  const router = useRouter();
  const { toast } = useToast();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [callDetails, setCallDetails] = useState<Call>();
  const { user } = useUser();
  const client = useStreamVideoClient();

  async function createInstantMeeting() {
    if (!client || !user) return;
    setLoading(true);
    try {
      if (!values.dateTime) {
        toast({
          title: 'Please select a date and time',
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create a call');

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) router.push(`/meeting/${call.id}`);
      toast({
        title: 'Meeting created successfully',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Failed to create a meeting',
      });
    } finally {
      setLoading(false);
    }
  }
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
      <MeetingTypeBox
        imgUrl="/icons/add-meeting.svg"
        bgColor="bg-orange-1 hover:bg-orange-1/80"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <MeetingTypeBox
        imgUrl="/icons/join-meeting.svg"
        bgColor="bg-blue-1 hover:bg-blue-1/80"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <MeetingTypeBox
        imgUrl="/icons/schedule.svg"
        bgColor="bg-purple-1 hover:bg-purple-1/80"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <MeetingTypeBox
        imgUrl="/icons/recordings.svg"
        bgColor="bg-yellow-1 hover:bg-yellow-1/80"
        title="View Recordings"
        description="Meeting Recordings"
        handleClick={() => router.push('/recordings')}
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createInstantMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e: any) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link copied' });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
      <MeetingModal
        loading={loading}
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createInstantMeeting}
      />
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e: any) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </section>
  );
}

export default MeetingTypeList;
