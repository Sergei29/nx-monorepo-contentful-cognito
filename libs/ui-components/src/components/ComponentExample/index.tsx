import React from 'react';

/* eslint-disable-next-line */
export interface ComponentsProps {}

export const ComponentExample = (props: ComponentsProps) => {
  return (
    <div className="flex flex-col min-h-28 justify-center items-center my-4 border border-green-500 bg-green-300 rounded-lg">
      <h3 className="text-lg font-semibold text-orange-800">
        Welcome to Components!
      </h3>
    </div>
  );
};

export default ComponentExample;
