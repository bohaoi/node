//@login & register
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profiles = require("../../models/Profile");

//$route GET api/profiles/test
//@desc 返回请求的json数据
//@access public 
router.get("/test",(req,res) => {
    res.json({msg:'profiles works'})
});


//$route GET api/profiles/add
//@desc 创建信息接口
//@access private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res) => {
    const profileFields = {};


    if(req.body.type) 
        profileFields.type = req.body.type;
    if(req.body.describe) 
        profileFields.describe = req.body.describe;
    if(req.body.income) 
        profileFields.income = req.body.income;
    if(req.body.expend) 
        profileFields.expend = req.body.expend;
    if(req.body.cash) 
        profileFields.cash = req.body.cash;
    if(req.body.remark) 
        profileFields.remark = req.body.remark;

    new Profile(profileFields).save()
                              .then(profile => {
                                  res.json(profile);
                              });

});

//$route GET api/profiles
//@desc 获取所有信息
//@access private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profiles.find()
            .then(profile => {
                if(!profile){
                    return res.status(404).json("没有任何内容");
                }

                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
})

//$route GET api/profiles/:id
//@desc 获取单个信息
//@access private
router.get("/:id",passport.authenticate("jwt",{session:false}),
    (req,res) => {
        Profiles.findOne({_id:req.params.id})
            .then(profile => {
                if(!profile){
                    return res.status(404).json("没有内容");
                }

                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
});


//$route GET api/profiles/edit
//@desc 编辑信息接口
//@access private

router.post(
    "/edit/:id",
    passport.authenticate("jwt",{session:false}),
    (req,res) => {
   
    const profileFields = {};

    
    if(req.body.type) 
        profileFields.type = req.body.type;
    if(req.body.describe) 
        profileFields.describe = req.body.describe;
    if(req.body.income) 
        profileFields.income = req.body.income;
    if(req.body.expend) 
        profileFields.expend = req.body.expend;
    if(req.body.cash) 
        profileFields.cash = req.body.cash;
    if(req.body.remark) 
        profileFields.remark = req.body.remark;
       

       Profiles.findOneAndUpdate(
           {_id:req.params.id},
           {$set:profileFields},
           {new:true})
           .then(profiles => {
               res.json(profiles)
           });
});

//$route GET api/profiles/delete/:id
//@desc 删除信息接口
//@access private

router.delete(
    "/delete/:id",
    passport.authenticate("jwt",{session:false}),
    (req,res) => {
        Profiles.findOneAndRemove(
            {_id:req.params.id})
            .then(profile => {
                profile.save().then(profile => 
                    res.json(profile));
                })
                .catch(err => res.status(404).json("删除失败！"));
});

module.exports = router;