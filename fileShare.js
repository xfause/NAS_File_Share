'use strict'

function File(props){
	this.type = props.type;
	this.name =  props.name;
	this.desc = props.desc;
	this.magnet = props.magnet;
	this.author = 0;
}

function createFile(props){
	return new File(props);
}

var fileShare = function(){
	LocalContractStorage.defineMapProperty(this, "namequery", null);
	LocalContractStorage.defineMapProperty(this, "typequery", null);

fileShare.prototype = {
	init: function(){
	},

	Add: function(name, type, desc,magnet){
		var props = {};
		props.name = name;
		props.type = type;
		props.desc = desc;
		props.magnet = magnet;

		var newfile = createFile(props);
		newfile.author = Blockchain.transaction.from;

		var nq = this.namequery.get(props.name);
		var tq = this.typequery.get(props.type);

		if(!nq){
			nq = [];
		}
		if(!tq){
			tq = [];
		}
		nq.push(newfile);
		tq.push(newfile);

		this.namequery.put(props.name, nq);
		this.typequery.put(props.type, tq);
		return "success";
	},

	NameQuery: function(name){
		name = name.trim();
		if(name === ""){
			throw new Error("empty name");
		}
		var nq = this.namequery.get(name);
		return nq;
	},

	AnimaQuery: function(){
		var tq = this.typequery.get('anima');
		return tq;
	},

	MovieQuery: function(){
		var tq = this.typequery.get('movie');
		return tq;
	},

	PlayQuery: function(){
		var tq = this.typequery.get('play');
		return tq;
	},
};
module.exports = fileShare;
//n1hUvxLwRVuYY9EenUZGj9QVmyL3HgpysWu