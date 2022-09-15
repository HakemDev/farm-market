const fs=require('fs');
const http=require('http');
const url=require('url');

/////////////////////////////////////// read files

//read prdocut.json file
const productsInfo=JSON.parse(fs.readFileSync('./data_file/product.json','utf-8'));
//console.log(productsInfo);

//read market.html file
const marketHtml=fs.readFileSync('./templates/market.html','utf-8').toString();

//read market_pat.html file
const produitHtml=fs.readFileSync('./templates/market_pat.html','utf-8').toString();

//read produit.html file
const produitHtmLUnique=fs.readFileSync('./templates/produit.html','utf-8')

/////////////////////////////////////// create functions
const remplaceElem=function(tem,el){
  let output= tem.replace(/{%PRODUCTEMOJI%}/g,el.image);
 
  output= output.replace(/{%PRODUCTNAME%}/g,el.productName);
  output= output.replace(/{%PRODUCTPROTEINE%}/g,el.proteines);
  output= output.replace(/{%PRODUCTCARB%}/g,el.carb);
  output= output.replace(/{%PRODUCTFAT%}/g,el.fat);
  output= output.replace(/{%PRODUCTQUANTITY%}/g,el.quantity);
  output= output.replace(/{%PRODUCTDIRHAM%}/g,+el.price);
  output= output.replace(/{%PRODUCTID%}/g,el.id);  
  output= output.replace(/{%PRODUCTVITAMINE%}/g,el.nutrients);  
  output= output.replace(/{%PRODUCTDESCRI%}/g,el.description);  

  return output;
}

/////////////////////////////////////// create server
const server=http.createServer((req,res)=>{
  const {query,pathname}=url.parse(req.url,true);
  if(pathname==='/' || pathname==='/overview')
    {
          res.writeHead(200,{
            'content-type':'text/html'
          });
          //remplacer les elementes de chaque produit avec leur valeur dans product.json
          const productsInfoTota=productsInfo.map((produit=>{
                          remplaceElem(produitHtml,produit);
                          return remplaceElem(produitHtml,produit);
                                  })).join('');
          //remplacer 
          const marketHtmlFinal=marketHtml.replace('{%PRODUCTSMARKET%}',productsInfoTota);

          res.end(marketHtmlFinal)
    }
  else if(pathname==='/product'){
          res.writeHead(200,{
            'content-type':'text/html'
          });
          console.log('hey');
          const ele=productsInfo[query.id];
          console.log(query.id+"  azazazaz  "+ele)
          const produit=remplaceElem(produitHtmLUnique,ele)
         
          res.end(produit);
  }
  else{
    res.writeHead(200,{
      'content-type':'text/html'
    });
    res.end(`<h1 style="text-align:center;margin-top:20%">Page Not found</h1>`);

  }
})

/////////////////////////////////////// listen to server
server.listen(8000,'127.0.0.1',()=>{
  //console.log('hey');
})