
 <a href="javascript:(function(){
                function e(e,t){
                    var n=document.createElement('div');
                    n.id='__READABILITY_APP_FLASH__';
                    n.style.width='100%';
                    n.style.position='fixed';
                    n.style.zIndex=99999;
                    n.style.color='white';
                    n.style.fontSize='18px';
                    n.style.textAlign='center';
                    n.style.padding='20px 0';
                    n.style.fontFamily='\'Open Sans\', Helvetica, Arial, sans-serif';
                    n.innerHTML=t;
                    n.style.background=e===errorTitle.SUCCESS?'green':'red';
                    document.body.insertBefore(n,document.body.childNodes[0]),setTimeout(function()                                       {document.body.removeChild(n)},3500)};
                  var urllocal = document.location.href;
                  
                  var errorTitle = {SUCCESS:'SUCCESS',ERROR:'ERROR'}; 
                
                var t = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
                  t.onreadystatechange=function(){ console.log(t);
                     t.readyState === 4&&(200 === t.status?e(errorTitle.SUCCESS, 'Item has been successfully added'):
                     e(errorTitle.ERROR,'Sorry, something went wrong. '+t.statusText))
                   };
               
                 t.open('POST','https://secret-spire-7828.herokuapp.com/scraper', true);
                 t.setRequestHeader('Content-type','application/x-www-form-urlencoded');
                 
                 t.send('url='+urllocal);
                         
                        })()">
                Test</a>