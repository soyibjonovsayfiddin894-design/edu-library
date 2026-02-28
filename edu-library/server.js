const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync('users.json'));
    const user = users.find(u => u.username === username && u.password === password);
    if(user) res.json({ success:true, user:{username:user.username, admin:user.admin||false} });
    else res.json({ success:false, message:"Username yoki parol xato" });
});

// Register
app.post('/register', (req, res)=>{
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync('users.json'));
    if(users.find(u=>u.username===username)) return res.json({success:false,message:"Username mavjud"});
    users.push({username,password,admin:false});
    fs.writeFileSync('users.json',JSON.stringify(users,null,2));
    res.json({success:true,message:"Ro'yxatdan o‘tish muvaffaqiyatli"});
});

// Get books
app.get('/books', (req,res)=>{
    const books = JSON.parse(fs.readFileSync('books.json'));
    res.json(books);
});

// Admin: get users list
app.get('/admin/users', (req,res)=>{
    const users = JSON.parse(fs.readFileSync('users.json'));
    res.json(users);
});

app.listen(PORT,()=>console.log(Server running on http://localhost:${PORT}));