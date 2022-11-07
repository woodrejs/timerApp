import React from 'react';

export const useAsyncEffect = (
  cb: () => Promise<any>,
  deps: React.DependencyList = [],
) =>
  React.useEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
