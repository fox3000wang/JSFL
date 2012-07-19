main();

function main(){
  var paths = getAllFiles("file:///C:/JSFL/");
  for each (var path in paths){
    fl.trace(path);
  } 
}


//递归得到文件夹内所有as文件
function getAllFiles(folder){
  var list = getFiles(folder);
  var i = 0;
  for each (var file in list){
    list[i] = folder + "/" + file;
    i++;
  }
  var folders = getFolders(folder);
  for each (var childFolder in folders){
    list = list.concat(getAllFiles(folder + "/" + childFolder));
  }
  return list;
}

function getFiles(folder){
  return FLfile.listFolder(folder+"/*.*","files");
  //return FLfile.listFolder(folder+"/*.fla","files");
}

function getFolders(folder){
  return FLfile.listFolder(folder+"/*","directories");
}