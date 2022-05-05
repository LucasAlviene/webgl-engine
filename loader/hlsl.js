const loader = function(source){
    if (this.cacheable) this.cacheable();
    let str = `const code = \`${source}\`;\n`;
    
    str += `export default code;`
    return str;
}
module.exports = loader