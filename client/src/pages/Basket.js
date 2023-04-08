import React, { useContext, useEffect, useState } from 'react';
import BasketDeviceList from '../components/BasketDeviceList';
import BasketConfirm from '../components/BasketConfirm';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchBasket } from '../http/deviceAPI';

const Basket = observer(() => {
  const {device, user} = useContext(Context)
  const [loading, setLoading] = useState(true);

  const countBasketPrice = (data) => {
    let basketPrice = 0
    data.forEach(device => {
      basketPrice += device.price * device.count
    })
    return basketPrice
  }

  const countBasketQuantity = (data) => {
    let basketQuantity = 0
    data.forEach(device => {
      basketQuantity += device.count
    })
    return basketQuantity
  }

  useEffect(() => {
    fetchBasket(user.user.id).then(data => {
      device.setBasketDevices(data)
    })
  }, [device.basketCount]);

  useEffect(() => {
    fetchBasket(user.user.id).then(data => {
      device.setBasketCount(countBasketQuantity(data))
      device.setBasketPrice(countBasketPrice(data))
      setLoading(false)
    })
  }, [device.basketDevices]);

  return (
    <>
      <h1 className='ms-4 mt-1'>Корзина</h1>
      {!loading &&
        <div>
          {device.basketCount ?
            <div className='d-flex justify-content-between m-4'>
              <BasketDeviceList />
              <BasketConfirm />
            </div>
            :
            <p className='ms-4'>Ваша корзина пуста. Перейдите на главную страницу, чтобы выбрать понравившиеся товары.</p>
          }
        </div>
      }
    </>
  );
})

export default Basket;
