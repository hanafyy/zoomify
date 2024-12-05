import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';

function useGetCallById(id: string | string[]) {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState<boolean>(true);

  const client = useStreamVideoClient();
  useEffect(() => {
    if (!client) return;
    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id,
        },
      });
      if (calls.length > 0) {
        setCall(calls[0]);
      }
      setIsCallLoading(false);
    };
    loadCall();
  }, [id, client]);

  return { call, isCallLoading };
}

export default useGetCallById;
