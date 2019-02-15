###  express

node的框架
 1. npm init -y ： 一键初始化
 *文件夹的命名不能用和框架、包(jq，loadash) 重名  不能用中文  不要用数字

 2.npm install express -s   下载express

 3.listen的原理，注意第一个...arg是把参数合成数组，第二个参数是把参数铺平  
    app.listen = function(...arg){//合成一个数组放进来
        require('http').createServer(app).listen(...arg)//展开
    }

 4.express 主要是对req和res的方法进行了封装
    res.append()
    res.attachment()
    res.cookie()
    res.clearCookie()
    res.download()
    res.end()
    res.format()
    res.get()
    res.json()
    res.jsonp()
    res.links()
    res.location()
    res.redirect()
    res.render()
    res.send()
    res.sendFile()
    res.sendStatus()
    res.set()
    res.status()
    res.type()
    res.vary() 

    5. res.sendStatus(404),等于下面2个相加：
       res.send('not found') res.status(404)
    6. app.all 所有的请求  不分get post 等

    7. 中间件  官方文档-->资源-->中间件
      cors中间件(跨域)   npm install cors   

      body-parser中间件(解析post数据) npm install body-parser
      
      >解析formdata
      bodyParser.urlencoded({extended:false})
      >解析json
       bodyParser.json()
    