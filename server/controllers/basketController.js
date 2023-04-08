const { Basket, BasketDevice, Device } = require('../models/models')
const ApiError = require('../error/ApiError')
const sequelize = require('../db')

class BasketController {
  async createBasketDevice(req, res, next) {
    try {
      const {deviceId, userId} = req.body
      const basket = await Basket.findOne({where: {userId}})
      const basketDevice = await BasketDevice.create({deviceId, basketId: basket.id})
      return res.json(basketDevice)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getUserBasket(req, res) {
    const {id} = req.params
    const basket = await Basket.findOne({where: {userId: id}})
    const userBasket = await BasketDevice.findAll({where: {basketId: basket.id}, order: [
      ['createdAt', 'DESC']
    ]})
    let devicesIds = []
    userBasket.forEach(basketDevice => devicesIds.push(basketDevice.deviceId))
    const countSameDevices = devicesIds.reduce((acc, val) => ({
      ...acc,
      [val]: (acc[val] || 0) + 1
    }), {});
    const devicesIdsUnique = new Set(devicesIds)
    devicesIds = Array.from(devicesIdsUnique)
    const ord = [sequelize.literal(`ARRAY_POSITION(ARRAY[${devicesIds}]::integer[], "id")`)];
    const devices = await Device.findAll({where: {id: devicesIds}, order: ord})
    devices.forEach(device => {
      device.dataValues.count = countSameDevices[device.dataValues.id]
    })
    return res.json(devices)
  }

  async deleteBasketDevice(req, res, next) {
    try {
      const {deviceId, userId} = req.query
      const basket = await Basket.findOne({where: {userId}})
      await BasketDevice.destroy({where: {deviceId, basketId: basket.id}})
      return res.json({'deleted': true})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new BasketController()
