import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@chatbot-ui/core/types/auth';
declare const handler: (req: NextApiRequest, res: NextApiResponse, user: User) => Promise<void>;
export default handler;
