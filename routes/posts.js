const express = require("express");
const Posts = require("../schemas/posts")
const User = require("../schemas/user");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");


// Posting(정보등록): 클라이언트 html에서 입력한 정보 => DB로 보내기
router.post("/", authMiddleware, async (req, res) => {
    const { user, password, title, content } = req.body

    //postsId: 날짜기준으로 번호 만들기
    const date = new Date()
    let postsId = date.valueOf();

    //빈칸에 대해 입력 요청하기
    if (!user){
        res.status(400).send({errorMessage: '이름을 입력해주세요🙏'});
        return;
    } 

    if (!password){
        res.status(400).send({errorMessage: '"비밀번호를 입력해주세요🙏'});
        return;
    } 

    if (!title){
        res.status(400).send({errorMessage: '제목을 입력해주세요🙏'});
        return;
    } 

    if (!content){
        res.status(400).send({errorMessage: '내용을 입력해주세요🙏'});
        return;
    } 

    if (user,password,title,content){
        await Posts.create({ postsId, user, password, title, content })
        return res.status(200).send({Message: '저장완료🤸'});
    }
});



// Posting detail(상세조회): 클라이언트에 HTML 연결정보 보내기
router.get('/:postsId', (req, res) => {
    const path = require("path")
    res.sendFile(path.join(__dirname + '/../static/detail.html'))
});



// Posting detail(상세조회): DB의 내용가져오기
router.get('/:postsId/detail', async (req, res) => {
    const { postsId } = req.params;
    const existPosts = await Posts.find({ postsId: Number(postsId) });
    res.json(existPosts);
});



// Posting detail(상세조회): 클라이언트에 HTML 연결정보 보내기
router.get('/:postsId/edit', (req, res) => {
    const path = require("path")
    res.sendFile(path.join(__dirname + '/../static/edit.html'))
});



 // Posting: detail > Edit: DB의 내용가져오기
router.get("/:postsId/get", async (req, res) => {
    const { postsId } = req.params;
    const existPosts = await Posts.find({ postsId: Number(postsId) });
    res.json(existPosts);
})



 // Posting: detail > Edit: DB의 내용 수정하기
 router.put("/:postsId/edit",authMiddleware, async (req, res) => {
    const { postsId } = req.params;
    const { password, title, content } = req.body;

    const posts = await Posts.find();
    const postsIds = posts.map((post) => post.postsId);
    const postsPws = posts.map((post) => post.password);
    
    for(let i=0; i< postsIds.length; i++){
        if(postsIds[i] === Number(postsId) && postsPws[i] === password){
            await Posts.updateOne({ postsId: Number(postsId)}, { $set: {title, content} })
            return res.status(200).json({ msg: '수정 완료🤸' });

        } else if (postsIds[i] === Number(postsId) && postsPws[i] != password){ 
            return res.json({ msg: '비밀번호 불일치🚫' });

        } else if (!password){
            return res.json({ msg: "비밀번호를 입력해주세요🙏" })
        }
    }
});


// Posting: detail > Edit: DB의 삭제하기
router.delete("/:postsId",authMiddleware, async (req, res) => {
    const { postsId } = req.params;
    const { password } = req.body;

    const posts = await Posts.find();
    const postsIds = posts.map((post) => post.postsId);
    const postsPws = posts.map((post) => post.password);

    for (let i=0; i<postsIds.length; i++){
        if(postsIds[i] === Number(postsId) && postsPws[i] === password){
            await Posts.deleteOne({ postsId });
            return res.json({ msg: '삭제 완료🤸' });

        } else if (postsIds[i] === Number(postsId) && postsPws[i] != password){  
            return res.json({ msg: '비밀번호 불일치🚫' });

        } else if (!password){
            return res.json({ msg: "비밀번호를 입력해주세요🙏" })
        } 
    }
});


module.exports = router;