const fs=require('fs'),path=require('path');
require('./build.cjs');
const base='/kodomo-education-support/';
function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,ent.name);if(ent.isDirectory())walk(f);else if(/\.(html|js)$/.test(f)){let text=fs.readFileSync(f,'utf8');if(f.endsWith('.html'))text=text.replace(/(href|src)="\/(?!\/)/g,(_,attr)=>attr+'="'+base);else text=text.replaceAll('/assets/',base+'assets/');if(f.endsWith('/app.js'))text=text.replace("return id==='home'?'/':'/'+id+'/'","return id==='home'?'"+base+"':'"+base+"'+id+'/'").replace("'href=\"/concerns/\"'","'href=\""+base+"concerns/\"'").replace("'href=\"/concerns/#'","'href=\""+base+"concerns/#'");fs.writeFileSync(f,text);}}}
walk(path.join(__dirname,'dist'));
fs.writeFileSync(path.join(__dirname,'dist','.nojekyll'),'');
console.log('GitHub Pages path: '+base);
