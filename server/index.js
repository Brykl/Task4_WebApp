const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const cors = require('cors');
const port = 3030;
const EmployeeModel = require('./models/employee')

app.use(express.json());
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

    next();
});
// app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.post('/login', (req, res) => {
    const { email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(userChek => {
        if(userChek) {
            if(userChek.password == password && userChek.userStatus == "Available") {
                res.status(200).json({status: true, message: "Success login"})
            } else {
                res.status(400).json({status: false, message: "Uncorrect or ban login"})
            }
        } else {
            res.status(400).json({status: false, message: "Uncorrect email"})
        }
    })
    
    
})

// app.post('/registred', (req, res) => {
//     const userData = req.body;
//     res.status(201).json({ message: "Server on registred req works", userData });
// })

app.post('/registred', (req, res) => {
    const { email, login } = req.body;

    // Проверяем, существует ли пользователь с таким email
    EmployeeModel.findOne({ email: email })
    .then(existingUserByEmail => {
        EmployeeModel.findOne({ login: login })
            .then(existingUserByLogin => {
                if (existingUserByEmail) {
                    // Пользователь с таким email уже существует
                    res.status(400).json({ success: false, message: 'Email already exists' });
                } else if (existingUserByLogin) {
                    // Пользователь с таким логином уже существует
                    res.status(400).json({ success: false, message: 'Login already exists' });
                } else {
                    EmployeeModel.create(req.body);
                    res.status(200).json({ success: true, message: 'User created successfully' });
                }
            })
            .catch(err => {
                // Обработка ошибок запроса к базе данных для поиска по логину
                console.error("Ошибка при поиске пользователя по логину:", err);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            });
    })
    .catch(err => {
        // Обработка ошибок запроса к базе данных для поиска по email
        console.error("Ошибка при поиске пользователя по email:", err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    });


        
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
})