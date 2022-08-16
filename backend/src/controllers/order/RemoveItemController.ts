import { RemoveItemService } from '../../services/order/RemoveItemService';
import { Request, Response } from 'express';

class RemoveItemController {
  async handle(request: Request, response: Response) {
    const item_id = request.query.item_id as string;

    const removeItem = new RemoveItemService();

    const order = await removeItem.execute({ item_id });

    return response.json(order);
  }
}

export { RemoveItemController };
