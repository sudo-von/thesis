import React from 'react';
import { Loader } from 'src/components';
import useUser from 'src/hooks/useUser';
import useLocation from 'src/hooks/useLocation';

const PanicButton = ():JSX.Element => {
  const { user } = useUser();
  const { userId } = user;
  const { message } = useLocation(userId);
  return (
    <Loader loadingMessage={message} size={85} />
  );
};

export default PanicButton;
