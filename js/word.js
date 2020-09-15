const path = require('path');
const fs = require('fs')
const Docxtemplater = require('docxtemplater')
const ImageModule = require('open-docxtemplater-image-module')
const docx = require('docx-templates');
const template = fs.readFileSync(path.join(__dirname, '../word/template/demo2.docx'));
const opts = {
  centered: false,
  getImage: function(tagValue, pathurl) {
    return fs.readFileSync(path.join(__dirname, '../word/'+pathurl+'/' + tagValue));
  },
  getSize: function(img, tagValue, tagName) {
    return [150, 150];
  }
}
const _Image = new ImageModule(opts);
const worker = function (dataProject, callback, fails) {
  const buffer =  docx.createReport({
     template,
     additionalJsContext: {
       Avatar(){
         let svg_data = _Image.options.getImage(dataProject.name+'.png','user');
         const thumbnail = {
          data: fs.readFileSync(path.join(__dirname, '../word/user/'+dataProject.name+'.png')),
          extension: '.png',
        };
        return { width: 6, height: 6, data: svg_data, extension: '.png', thumbnail };
       },
       DISC(){
         let svg_data = _Image.options.getImage(dataProject.name+'.png', 'disc');
         const thumbnail = {
          data: fs.readFileSync(path.join(__dirname, '../word/disc/'+dataProject.name+'.png')),
          extension: '.png',
        };
        return { width: 12, height: 12, data: svg_data, extension: '.png', thumbnail };
       },
       project: dataProject.data,
     },
    cmdDelimiter: '+++',
   });
   buffer.then( res => {
     fs.writeFileSync(path.join(__dirname, '../down/'+dataProject.name+'.docx'), res)
     callback&&callback(dataProject.name);
   }, err => {
     fails(err)
   })
}

module.exports = worker;
