(function(doc,win) {
    const node = doc.createElement("div");
    const textnode = doc.createTextNode("Test JS");
    node.appendChild(textnode);
    doc.getElementsByTagName("body")[0].appendChild(node);
})(document,window);