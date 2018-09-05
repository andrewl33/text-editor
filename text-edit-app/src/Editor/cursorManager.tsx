// https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
// might move this back eventually

export default function(currentNode: Node) {
    const voidNodeTags: string[] = ['AREA', 'BASE', 'BR', 'COL', 'EMBED', 
                                    'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 
                                    'MENUITEM', 'META', 'PARAM', 'SOURCE', 
                                    'TRACK', 'WBR', 'BASEFONT', 'BGSOUND', 
                                    'FRAME', 'ISINDEX', 'SPAN'];
    function contains(arr: string[], htmlNodeName: string): boolean {
        let i = arr.length;
        
        while (i--) {
            if (arr[i] === htmlNodeName) {
                return true;
            }
        }

        return false;
    }

    function canContainText(node: Node): boolean {
        if (node) {
            if (node.nodeType === 1) {
                return !contains(voidNodeTags, node.nodeName);
            }
        }

        return false;
    }
    function validLastChildElement(element: Node): boolean {
        let lastChild = element.lastChild;
        while (lastChild && lastChild.nodeType !== 1) {
            if (lastChild.previousSibling) {
                lastChild = lastChild.previousSibling;
            } else {
                break;
            }
        }
        
        if (lastChild !== null) {
            return canContainText(lastChild);
        } else {
            return false;
        }
    }

    function getLastChildElement(element: Node): Node {
        let lastChild = element.lastChild;
        while (lastChild && lastChild.nodeType !== 1) {
            if (lastChild.previousSibling) {
                lastChild = lastChild.previousSibling;
            } else {
                break;
            }
        }
        return lastChild || new Node();
    }

    function setEndOfContenteditable(contentEditableElement: Node): void {
        while (validLastChildElement(contentEditableElement)) {
            contentEditableElement = getLastChildElement(contentEditableElement);
        }

        let range : Range;
        let selection: Selection;
        if (document.createRange) {    
            range = document.createRange();
            range.selectNodeContents(contentEditableElement);
            range.collapse(false);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    setEndOfContenteditable(currentNode);
}