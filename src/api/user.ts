import { Router, Request, Response } from "express";

const router = Router();

interface User{
    id: number;
    name: string;
    email: string;
}

let users: User[] = [
    {id:1, name:'dharmik', email:'dharmik3168@gmail.com'},
    {id:2, name:'test', email:'email@gmail.com'}
];

router.get('/', (req: Request, res: Response) => {
    res.json(users)
});

router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const user =  users.find(u => u.id === id)
    if(user){
        res.json(user);
    }else{
        res.status(404).json({message: 'user not found'});
    }
});

router.post('/',(req: Request, res: Response) => {
    const newUser: User = {
        id: users.length + 1,
        ...req.body
    }
    users.push(newUser);
    res.status(201).json(newUser);
});

router.put('/:id',(req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const userIndex =  users.findIndex(u => u.id === id);
    if(userIndex >= 0){
        users[userIndex] = {id, ...req.body}
        res.json(users[userIndex]);
    }else{
        res.status(400).json({message: 'User not found'});
    }
});

router.delete('/:id',(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);
    res.status(204).send();
});

router.post('/reset', (req: Request, res: Response) => {
    users = [
        {id:1, name:'dharmik', email:'dharmik3168@gmail.com'},
        {id:2, name:'test', email:'email@gmail.com'}
    ];
    console.log('Users have been reset:', users);
    res.status(200).json({ message: 'Data reset' });
  });

export default router;