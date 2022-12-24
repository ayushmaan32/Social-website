const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    // return res.end('<h1> Express is up for cordial!');
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codial | home",
    //         posts: posts
    //     })
    // })

    try {
        // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
        let users = await User.find({});

        return res.render('home', {
            title: "Codial | home",
            posts: posts,
            all_users: users
        });



    } catch (err) {
        console.log('error', err);
        return ;
    }




















    //populate the user of each post
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'user'
    //     }
    // })
    // .exec(function(err,posts){
    //      User.find({},function(err,users){
    //         return res.render('home',{
    //             title:"Codial | home",
    //             posts: posts,
    //             all_users: users
    //         });
    //      })






    

   
}
// module.exports.actionname = function(req,res){}