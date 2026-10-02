const fs=require('fs');require('./build-pages.cjs');fs.rmSync('docs',{recursive:true,force:true});fs.cpSync('dist','docs',{recursive:true});
