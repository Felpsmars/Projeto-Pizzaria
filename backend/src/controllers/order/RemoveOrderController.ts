import { RemoveOrderService } from '../../services/order/RemoveOrderService';
import { Request, Response } from 'express';

class RemoveOrderController {
  async handle(request: Request, response: Response) {
    const order_id = request.query.order_id as string;

    const removeOrder = new RemoveOrderService();

    const order = await removeOrder.execute({ order_id });

    return response.json(order);
  }
}

export { RemoveOrderController };
