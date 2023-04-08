import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Context } from '../index';

const BasketConfirm = observer(() => {
  const {device} = useContext(Context)

  const rightSpelling = (count, word) => {
    if ((count % 10 === 2 || count % 10 === 3 || count % 10 === 4) && (count % 100 !== 12 && count % 100 !== 13 && count % 100 !== 14)) {
      return word + 'а'
    } else if (count % 10 === 1 && count % 100 !== 11) {
      return word
    } else {
      return word + 'ов'
    }
  }

  return (
    <Card className='p-3' style={{width: '50vw', height: '100%', border: "5px solid lightgray"}}>
      <Button style={{width: '100%'}}>Перейти к оформлению</Button>
      <hr />
      <div className='d-flex align-items-center justify-content-between'>
        <h4>Ваша корзина</h4>
        <span className='fw-bold'>{device.basketCount} {rightSpelling(device.basketCount, 'товар')}</span>
      </div>
      <hr />
      <div className='d-flex align-items-center justify-content-between'>
        <h4>Общая стоимость</h4>
        <span className='fw-bold fs-5'>{device.basketPrice} руб.</span>
      </div>
    </Card>
  );
})

export default BasketConfirm;
