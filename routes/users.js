var express = require('express')
var app = express()
var ObjectId = require('mongodb').ObjectId

// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
	// fetch and sort users collection by id in descending order
	req.db.collection('keys').find().sort({"_id": -1}).toArray(function(err, result) {
		//if (err) return console.log(err)
		if (err) {
			req.flash('error', err)
			res.render('user/list', {
				title: 'User List', 
				data: ''
			})
		} else {
			// render to views/user/list.ejs template file
			res.render('user/list', {
				title: 'User List', 
				data: result
			})
		}
	})
})





// SHOW EDIT USER FORM
app.post('/search', function(req, res, next){
//	var o_id = new ObjectId(req.params.name)

   // var name1 = req.params.name;
    var input = JSON.parse(JSON.stringify(req.body));
    var nameSearch = (input.name_search).trim();

    console.log('name for search: ' + nameSearch);

    req.db.collection('keys').find({"name": nameSearch}).toArray(function(err, result) {
        console.log('result: ' + result);

        if(err) return console.log(err)

        // if user not found
        if (result==null || result=="") {
            req.flash('error', 'User not found with id = ' +nameSearch)
            res.redirect('/users')
        }
        else { // if user found
            // render to views/user/edit.ejs template file
            console.log('else: ' + nameSearch);
            res.render('user/edit', {
                title: 'Edit User',
                //data: rows[0],
                name: result[0].name,
                id: result[0]._id,
                device: result[0].device

            })
        }
    })
})



// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {	
	var o_id = new ObjectId(req.params.id)
	req.db.collection('keys').remove({"_id": o_id}, function(err, result) {
		if (err) {
			req.flash('error', err)
			// redirect to users list page
			res.redirect('/users')
		} else {
			req.flash('success', 'User deleted successfully! id = ' + req.params.id)
			// redirect to users list page
			res.redirect('/users')
		}
	})	
})




module.exports = app
