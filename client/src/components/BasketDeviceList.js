import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import BasketDeviceItem from './BasketDeviceItem';
import { Container, Row } from 'react-bootstrap';

const BasketDeviceList = observer(() => {
  const {device} = useContext(Context)

  return (
    <Container>
      {device.basketDevices.map(device =>
        <div key={device.id} style={{width: '50vw'}}>
          <BasketDeviceItem deviceItem={device} />
          <hr />
        </div>
      )}
    </Container>
  );
})

export default BasketDeviceList;
