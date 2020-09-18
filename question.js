/**
 *@author songke
 *@date 2020/8/27 15:34
 */

const express = require('express');
const app = express();
const os = require('os');
const fs = require('fs');
const log = require('./log');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');    // 安装这个中间件可以通过req.body拿到post请求的数据

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(log());

mongoose.connect('mongodb://127.0.0.1:27017/kkkk', {useNewUrlParser: true, useUnifiedTopology: true});

const ProjectSchema = mongoose.Schema({
    name: {
        index: true,
        type: String,
        required: '{PATH} is required!'
    },
    sortName: String,
    description: String,
    address: {
        state: String,
        province: String,
        city: String,
        area: String,
        road: String,
    },
    startAt: Date,
    endAt: Date
});

const Projects = mongoose.model('projects', ProjectSchema, 'project');

// 创建一条projects信息
app.post('/api/projects', function (req, res) {
    const promise = new Promise((resolve, reject) => {
        let project = new Projects(req.body);
        project.save({}, function (err, data) {
            // let project = req.body;
            // Projects.create(project, function (err, data) {   // 这样写也可以
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    });
    promise
        .then(data => {
            res.json(data);
        }).catch(err => {
        res.send(err);
    })
});

// 获取指定id的project信息
app.get('/api/projects/:id', (req, res) => {
    let id = req.params.id;
    const promise = new Promise((resolve, reject) => {
        Projects.find({'_id': id}, function (err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    });
    promise
        .catch(err => {
            res.send(err);
        })
        .then(data => {
            res.json(data);
        }).catch(err => {
        res.send(err);
    })
});

// 更新指定id的project信息
app.put('/api/projects/:id', (req, res) => {
    let id = req.params.id;
    let str = {$set: req.body};
    const promise = new Promise((resolve, reject) => {
        Projects.updateOne({'_id': id}, str, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    });
    promise
        .then(data => {
            res.json(data);
        }).catch(err => {
        res.send(err);
    })
});

// 删除指定id的project信息
app.delete('/api/projects/:id', (req, res) => {
    let id = req.params.id;
    const promise = new Promise((resolve, reject) => {
        Projects.deleteOne({'_id': id}, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    });
    promise
        .then(data => {
            res.json(data);
        }).catch(err => {
        res.send(err);
    })
});

// 获取所有projects信息
app.get('/api/projects', (req, res) => {
    const promise = new Promise((resolve, reject) => {
        Projects.find({}, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            return resolve(data);
        })
    });
    promise
        .then(data => {
            res.json(data);
        }).catch(err => {
        res.send(err);
    })
});


app.get('/api/os_infos', function (req, res) {
    function getInfo() {
        let arch = os.arch();
        let cpus = os.cpus();
        let type = os.type();
        let platform = os.platform();
        let totalMem = os.totalmem();
        let freeMem = os.freemem();
        return {arch, cpus, type, platform, totalMem, freeMem}
    }

    let data = getInfo();
    res.json(data);
});

app.get('/api/file_info', function (req, res) {
    let filePath = req.query.filePath;

    function readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            })
        })
    }

    readFile(filePath)
        .then(data => {
            res.json({filePath, data});
        }).catch(err => {
        res.send(err);
    });
});

app.put('/api/file_info', (req, res) => {
    const promise = new Promise((resolve, reject) => {
        let body = "";
        req.on('data', (chunk) => {
            if (body === "") {
                resolve((body += chunk));
            } else {
                reject('body is undefined');
            }
        });
        req.on('end', function () {
            let filePath = req.query.filePath;
            let overwrite = req.query.overwrite;
            let flag = overwrite ? 'w' : 'a';
            let options = {flag, encoding: 'utf8'};

            function fileInfo(filePath) {
                return new Promise((resolve, reject) => {
                    fs.writeFile(filePath, body, options, (err) => {
                        if (err) {
                            reject(err);
                        }
                        fs.readFile(filePath, 'utf-8', (err, data) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(data);
                        });
                    });
                })
            }

            fileInfo(filePath)
                .then(data => {
                    res.json({filePath, data});
                }).catch(err => {
                res.send(err);
            });
        })
    });
    promise
        .then(result => {
            console.log(result);
        });
});

app.listen(9090, function () {
    console.log('http://localhost:9090');
});


