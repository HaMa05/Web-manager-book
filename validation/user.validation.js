// xu ly loi khi sai user nhap thong tin sai
module.exports.postUser = (req, res, next) => {
  let data = req.body;
	// lọc tên sai quy dinh
	if(data.name.length > 30 || /^\s+$/.test(data.name)) {
		res.render('user/addUser.pug', {
			error: "Name only start 'a - z, A - Z, 0 - 9' and < 30 character"
		});
		return;
	}
	// res.locals.success = true;
  next();
}