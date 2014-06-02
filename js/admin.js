checkUser();
if(!loggedIn || ['fuma900', 'sergio'].indexOf($.cookie('username')) < 0) {
	logout();
	location.replace('/login');
}
var users = {};

function deleteDoc(id){
	$.parse.delete('Documents/'+id, function(r){
		location.reload();
	});
}

function addDoc(){
	var form = {};
	var userForm = $('#user').val();
	form['name'] = $('#name').val();
	form['file'] = 'https://dl.dropboxusercontent.com/s/'+$('#file').val().slice(26,$('#file').val().length)+'?dl=1';
	form['catalogue'] = ($('#type').val() == 0)?false:true;
	form['user'] = {
		__type: "Pointer",
		className: "_User",
		objectId: $('#user').val()
	};
	form['ACL'] = {};
	form['ACL'][userForm] = { 'read': true };
	form['ACL']['role:admin'] = {'read': true, 'write': true};

	$.parse.post('Documents', form, function(r){
		location.reload();
	});
}

$.parse.get('users', function(u) {
	$.each(u.results, function(k,v){
		users[v.objectId] = v.username;
		$('#user').append('<option value="'+ v.objectId +'">'+ v.username +'</option>');
	});
}).get("Documents", function(r){
	$.each(r.results, function(k,v){
		var user = users[v.user.objectId];
		var filename = v.file.split('/').slice(-1)[0];
		filename = filename.substr(0,filename.length-5);
		var html = '																			\
			<tr>																				\
				<td>'+ v.name +'</td>															\
				<td>'+ $.timeago(v.createdAt) +'</td>											\
				<td><a href="'+ v.file +'">'+ filename +'</a></td>								\
				<td>'+ user +'</td>																\
				<td><a href="#" onClick="deleteDoc(\''+ v.objectId +'\')">Elimina</a></td>		\
			</tr>																				\
		';
		$('#documents-table').append(html);
		console.log(v);
	});
});
