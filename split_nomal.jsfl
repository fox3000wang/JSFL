var debug = true;
var sourceURL = fl.browseForFileURL("open", "ѡ��Ҫ��ֵ�FLA�ļ�");
//var SourceURL = "file:///C:/split/" + name + ".fla"
trace(sourceURL);

var targetUrl = fl.browseForFolderURL("��ѡ������swf�ļ���·����");
//var targetUrl = "file:///C:/split";
trace(targetUrl);

if(sourceURL && targetUrl)
  split(sourceURL, targetUrl);

/**
 * FLA���
 * @source ����ļ�ȫ·��
 * @target ��ֺ��زĴ��·��
 */
function split(source, target){
  var currDom = fl.openDocument(source);

  var count = 0;
  deleteSeleteAll(currDom);
  var itemArray = fl.getDocumentDOM().library.items;//��ȡ���е�Ԫ��  
  if(itemArray.length>0){
    for(var i = 0 ;i< itemArray.length;i++){    
      if(itemArray[i].linkageClassName != null){//��ǰ�ļ��п��ļ����е�������ļ�
        trace(itemArray[i].linkageClassName);
        var itemClassName = itemArray[i].linkageClassName;//��������
        var itemName = itemArray[i].name;//Ԫ���� 
        currDom.library.addItemToDocument({x:0, y:0},itemName);//����ǰ��������item���뵽��̨��
        currDom.selectAll();
        currDom.clipCut();
        var dom = fl.createDocument();
        dom.clipPaste();
        //deleteSeleteAll(dom);
        dom.exportSWF(target +"/"+ itemClassName +".swf",true);
        fl.saveDocument(dom, target +"/"+ itemClassName +".fla");
        dom.close(false);
        trace("�ɹ��ֲ�:"+itemName);
        count++;
      }
    }
  }else{
    alert("����û��Ԫ��");
  }

  if(count>0)
    trace("�ɹ��ֲ��ļ�������" + count);
  else 
    trace("����û�д��е������Ԫ��");
  currDom.revert();
  fl.getDocumentDOM().close(false);
}


//ɾ��ѡ�е�Ԫ��
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