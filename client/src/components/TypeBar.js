import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { ListGroup } from 'react-bootstrap';

const TypeBar = observer(() => {
  const {device} = useContext(Context)

  return (
    <ListGroup>
      {device.types.map(type =>
        <ListGroup.Item
          key={type.id}
          style={{cursor: 'pointer'}}
          active={type.id === device.selectedType.id}
          onClick={() => {
            if (type.id === device.selectedType.id) {
              device.setSelectedType({})
            } else {
              device.setSelectedType(type)
            }
          }}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
})

export default TypeBar;
