var request= require("request-promise");

module.exports = app=> {
    app.get('/', (req, res) => {

        if (!req.user){
            res.render('index', {
                user: req.user,
            });
        }
        else
        {
            request({
                method:'GET',
                uri: `https://api.vk.com/method/friends.get?user_id=${req.user.id}&order=random&count=5&fields=first_name,last_name&lang=ru&access_token=${req.user.accessToken}&v=5.80`,
            }).then(response=>{
                res.render('index', {
                    user: req.user,
                    friends: JSON.parse(response)
                });
            }).catch(err=>{})
        }
    });
};