import React, { useEffect } from 'react';

export const useComplete = (completedRequest) => {
  useEffect(() => {
    //  Network Request

    completedRequest('test Data');
  }, [completedRequest]);
};
