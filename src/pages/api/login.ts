import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);  
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe sont requis.' });
  }

  // Dummy authentication logic for demonstration purposes
  if (username === 'admin' && password === 'admin') {
    return res.status(200).json({ message: 'Connexion réussie!' });
  } else {
    return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
  }
}