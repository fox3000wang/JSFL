var debug = true;
var sourceURL = fl.browseForFileURL("open", "选择要拆分的FLA文件");
//var SourceURL = "file:///C:/split/" + name + ".fla"
trace(sourceURL);

var targetUrl = fl.browseForFolderURL("请选择生成swf文件的路径：");
//var targetUrl = "file:///C:/split";
trace(targetUrl);

if(sourceURL && targetUrl)
  split(sourceURL, targetUrl);

/**
 * FLA拆分
 * @source 拆分文件全路径
 * @target 拆分后素材存放路径
 */
function split(source, target){
  var currDom = fl.openDocument(source);

  var count = 0;
  deleteSeleteAll(currDom);
  var itemArray = fl.getDocumentDOM().library.items;//获取库中的元件  
  if(itemArray.length>0){
    for(var i = 0 ;i< itemArray.length;i++){    
      if(itemArray[i].linkageClassName != null){//当前文件中库文件带有导出类的文件
        trace(itemArray[i].linkageClassName);
        var itemClassName = itemArray[i].linkageClassName;//导出类名
        var itemName = itemArray[i].name;//元件名 
        currDom.library.addItemToDocument({x:0, y:0},itemName);//将当前遍历出的item放入到舞台中
        currDom.selectAll();
        currDom.clipCut();
        var dom = fl.createDocument();
        dom.clipPaste();
        //deleteSeleteAll(dom);
        dom.exportSWF(target +"/"+ itemClassName +".swf",true);
        fl.saveDocument(dom, target +"/"+ itemClassName +".fla");
        dom.close(false);
        trace("成功分拆:"+itemName);
        count++;
      }
    }
  }else{
    alert("库中没有元件");
  }

  if(count>0)
    trace("成功分拆文件数量：" + count);
  else 
    trace("库中没有带有导出类的元件");
  currDom.revert();
  fl.getDocumentDOM().close(false);
}


//删除选中的元素
function deleteSeleteAll(dom){
  dom.selectAll();
  if(dom.selection.length>0)
    dom.deleteSelection();
}

//DEBUG
function trace(log){
  if(debug)
    fl.trace(log);
}