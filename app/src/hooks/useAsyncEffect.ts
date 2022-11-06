import React from 'react';

export const useAsyncEffect = (
  cb: () => Promise<any>,
  deps: React.DependencyList = [],
) =>
  React.useEffect(() => {
    cb();
  }, deps);
