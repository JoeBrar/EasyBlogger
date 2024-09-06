const express = require('express') ;
const app=express();
const cors=require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose=require('mongoose');
const User=require('./models/User');
const Post=require('./models/Post') ;
const bcrypt = require('bcrypt') ;
const jwt=require('jsonwebtoken') ;
const cookieParser = require('cookie-parser');
const multer=require('multer');
const uploadMiddleware=multer();
const fs=require('fs');
const { error } = require('console');

const jwtSecret=process.env.jwt_secret;
console.log('env vars - ',process.env.jwt_secret) ;

app.use(cors({credentials:true, origin : process.env.cors_origin, methods:["POST", "GET", "PUT"]}));
app.use(express.json());
app.use(cookieParser());
//app.use('/uploads', express.static(__dirname+'/uploads'));

mongoose.connect(process.env.mongodb_connection_string);

app.post('/register', async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    console.log(req.body);

    const saltRounds=Number(process.env.salt_rounds);
    const hashedPass = bcrypt.hashSync(password, saltRounds);
    try{
        const userDoc=await User.create({
            username:username,
            password:hashedPass
        })
        res.json(userDoc);
    }
    catch(e){
        console.log("Regestration failed ! Error -",e);
        res.status(400).json(e);
    }
})

app.post('/login', async (req,res)=>{
    const {username,password}=req.body;
    try{
        const userDoc=await User.findOne({username});
        const passOk=await bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            //logged in
            jwt.sign({username,id:userDoc._id},jwtSecret,{},(err,jwtToken)=>{
                if(err) throw err;
                res.cookie('token',jwtToken, {httpOnly:true, secure:true, sameSite:'None'}).json({username,id:userDoc._id});
            });
        }
        else{
            res.status(404).json("Invalid credentials ");
        }
    }
    catch(e){
        console.log('error - ',e);
        res.status(404).json(e);
    }
})

app.get('/profile',(req,res)=>{
    let token=req.cookies?.token
    if(token){
        jwt.verify(token,jwtSecret,{},(err,data)=>{
            if(err) throw err;
            console.log(data);
            res.json(data);
        })
        return;
    }
    res.json("error");
})

// Old api
/*
app.post('/createPost',uploadMiddleware.single('file'),async (req,res)=>{
    let {originalname,path}=req.file ;
    let {title,content,summary}=req.body;
    let parts=originalname.split('.');
    let ext = parts[parts.length-1] ;
    let newPath=path+'.'+ext;
    fs.renameSync(path, newPath);

    let token=req.cookies?.token
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,data)=>{
            if(err) throw err;
            const postDoc=await Post.create({
                title:title,
                summary,
                content,
                cover:newPath,
                author:data.id
            })
            console.log('post doc - ',postDoc);
            res.json(postDoc);
        })
    }
})

app.put('/post/:id', uploadMiddleware.single('file'), async (req,res)=>{
    let coverPath=req.body.cover;
    if(req.file){
        let {originalname,path}=req.file;
        let parts=originalname.split('.');
        let ext = parts[parts.length-1] ;
        let newPath=path+'.'+ext;
        coverPath=newPath;
        fs.renameSync(path, newPath);
    }
    

    let token=req.cookies?.token
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,info)=>{
            if(err) throw err;
            const {title,content,summary,postId}=req.body;
            const postDoc=await Post.findById(postId);
            const isAuthor=JSON.stringify(postDoc.author)===JSON.stringify(info.id);

            if(!isAuthor){
                res.status(403).json('You are not the author');
                return;
            }

            postDoc.title = title;
            postDoc.content = content;
            postDoc.summary = summary;
            postDoc.cover = coverPath;
            await postDoc.save(); // Save the modified document in MongoDB database
            
            res.json(postDoc);
        })
    }
    else res.status(403).json({message:'forbidden'});
})
*/
//new api
app.post('/createPost', uploadMiddleware.none(), async (req,res)=>{
    console.log('req body1 - ',req.body);
    console.log('req cookies1 - ',req.cookies);
    console.log('token -',req.cookies?.token);
    let {title,content,summary,coverImage}=req.body;
    let token=req.cookies?.token
    if(token){
        console.log('inside token');
        jwt.verify(token,jwtSecret,{},async (err,data)=>{
            if(err) throw err;
            const postDoc=await Post.create({
                title:title,
                summary,
                content,
                cover:coverImage,
                author:data.id
            })
            console.log('post doc - ',postDoc);
            res.json(postDoc);
        })
    }
})

app.put('/post/:id', uploadMiddleware.none(), async (req,res)=>{
    console.log('req body1 - ',req.body);
    console.log('req cookies1 - ',req.cookies);
    console.log('token -',req.cookies?.token);
    let token=req.cookies?.token
    if(token){
        console.log('inside token');
        jwt.verify(token,jwtSecret,{},async (err,info)=>{
            if(err) throw err;
            const {title,content,summary,postId,coverImage}=req.body;
            const postDoc=await Post.findById(postId);
            const isAuthor=JSON.stringify(postDoc.author)===JSON.stringify(info.id);

            if(!isAuthor){
                res.status(403).json('You are not the author');
                return;
            }

            postDoc.title = title;
            postDoc.content = content;
            postDoc.summary = summary;
            postDoc.cover = coverImage;
            await postDoc.save(); // Save the modified document in MongoDB database
            
            res.json(postDoc);
        })
    }
    else res.status(403).json({message:'__forbidden__'});
})

app.get('/fetchPosts', async (req,res)=>{
    const posts=await Post.find().populate('author',['username']).sort({createdAt:-1}).limit(20);
    res.json(posts);
    return;
    //the following will not be executed as we have already returned
    console.log("here 11") ;
})

app.get('/post/:id', async(req,res)=>{
    const {id}=req.params;
    const postDoc=await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
})

app.get('/test',(req,res)=>{
    res.json("test is ok ");
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})


app.post('/sum',(req,res)=>{
    let num1=req.body.num1 ;
    let num2=req.body.num2;
    let sum=num1+num2;
    res.json(sum);
})

const hashPass=async ()=>{
    let mypass='hello1234';
    const saltRounds=10;

    await bcrypt.hash(mypass, saltRounds, function(err, hash) {
        console.log("hashed password is - ",hash);
        checkPass(hash);
    });
}

const checkPass=async (hashedPass)=>{
    await bcrypt.compare('hello1234', hashedPass, function(err, result) {
        console.log('is password matched - ',result);
    });
}

hashPass();


app.listen(Number(process.env.server_port));

// joedeepbrar
// 6mHq69MLM5ahzr9W

// mongodb+srv://joedeepbrar:6mHq69MLM5ahzr9W@cluster0.74lzd6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0