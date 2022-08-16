import { Request, Response } from 'express';
import { ListOrderService } from '../../services/order/ListOrderService';

class ListOrderController {
  async handle(request: Request, response: Response) {
    const listOrderService = new ListOrderService();

    const order = await listOrderService.execute();

    return response.json(order);
  }
}

export { ListOrderController };
