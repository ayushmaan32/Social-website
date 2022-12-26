const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });





    return res.json(200,{
        message:"list of api",
        posts:posts
    })
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});



            req.flash('success', 'Post and associated comments deleted!');

            return res.json(200,{
                message:"Post and associated comment deleted successfully" 
            })
        }else{
            return res.json(401,{
                message:'you can not delete this Post'
            })
        }

    }catch(err){
        
        return res.json(500,{
            message:"Internal server error"
        })
    }
    
}