// Node class/factory
function createNode(data) {
    return {
        data: data,
        left: null,
        right: null,
    };
}

// Tree class/factory
function createTree(array) {
    const root = buildTree(array);
    return {
        root: root,
        insert: function (value) {
            insertNode(this.root, value);
        },
        deleteItem: function (value) {
            this.root = deleteNode(this.root, value);
        },
        find: function (value) {
            return findNode(this.root, value);
        },
        levelOrder: function (callback) {
            return levelOrderTraversal(this.root, callback);
        },
        inOrder: function (callback) {
            return inOrderTraversal(this.root, callback);
        },
        preOrder: function (callback) {
            return preOrderTraversal(this.root, callback);
        },
        postOrder: function (callback) {
            return postOrderTraversal(this.root, callback);
        },
        height: function (node) {
            return getHeight(node);
        },
        depth: function (node) {
            return getDepth(node);
        },
        isBalanced: function () {
            return isTreeBalanced(this.root);
        },
        rebalance: function () {
            const nodes = [];
            inOrderTraversal(this.root, function (node) {
                nodes.push(node.data);
            });
            this.root = buildTree(nodes);
        },
    };
}

// Function to build a balanced binary tree from an array
function buildTree(array) {
    const sortedUniqueArray = Array.from(new Set(array)).sort((a, b) => a - b);

    function buildTreeRecursive(start, end) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const node = createNode(sortedUniqueArray[mid]);

        node.left = buildTreeRecursive(start, mid - 1);
        node.right = buildTreeRecursive(mid + 1, end);

        return node;
    }

    return buildTreeRecursive(0, sortedUniqueArray.length - 1);
}

// Function to insert a value into the tree
function insertNode(node, value) {
    if (!node) {
        return createNode(value);
    }

    if (value < node.data) {
        node.left = insertNode(node.left, value);
    } else if (value > node.data) {
        node.right = insertNode(node.right, value);
    }

    return node;
}

// Function to delete a node from the tree
function deleteNode(node, value) {
    if (!node) {
        return null;
    }

    if (value < node.data) {
        node.left = deleteNode(node.left, value);
    } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
    } else {
        if (!node.left && !node.right) {
            return null;
        }

        if (!node.left) {
            return node.right;
        }

        if (!node.right) {
            return node.left;
        }

        const minRightNode = findMinNode(node.right);
        node.data = minRightNode.data;
        node.right = deleteNode(node.right, minRightNode.data);
    }

    return node;
}

function findMinNode(node) {
    while (node.left) {
        node = node.left;
    }
    return node;
}

// Function to find a node with a given value
function findNode(node, value) {
    if (!node) {
        return null;
    }

    if (value === node.data) {
        return node;
    } else if (value < node.data) {
        return findNode(node.left, value);
    } else {
        return findNode(node.right, value);
    }
}

// Function for level-order traversal
function levelOrderTraversal(node, callback) {
    const queue = [];
    const result = [];

    if (node) {
        queue.push(node);
    }

    while (queue.length > 0) {
        const currentNode = queue.shift();
        result.push(currentNode.data);
        callback && callback(currentNode);

        if (currentNode.left) {
            queue.push(currentNode.left);
        }

        if (currentNode.right) {
            queue.push(currentNode.right);
        }
    }

    return result;
}

// Function for in-order traversal
function inOrderTraversal(node, callback) {
    if (!node) {
        return [];
    }

    const result = [];
    function traverse(node) {
        if (node.left) {
            traverse(node.left);
        }
        result.push(node.data);
        callback && callback(node);
        if (node.right) {
            traverse(node.right);
        }
    }

    traverse(node);
    return result;
}

// Function for pre-order traversal
function preOrderTraversal(node, callback) {
    if (!node) {
        return [];
    }

    const result = [];
    function traverse(node) {
        result.push(node.data);
        callback && callback(node);
        if (node.left) {
            traverse(node.left);
        }
        if (node.right) {
            traverse(node.right);
        }
    }

    traverse(node);
    return result;
}

// Function for post-order traversal
function postOrderTraversal(node, callback) {
    if (!node) {
        return [];
    }

    const result = [];
    function traverse(node) {
        if (node.left) {
            traverse(node.left);
        }
        if (node.right) {
            traverse(node.right);
        }
        result.push(node.data);
        callback && callback(node);
    }

    traverse(node);
    return result;
}

// Function to get the height of a node
function getHeight(node) {
    if (!node) {
        return -1;
    }

    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}

// Function to get the depth of a node
function getDepth(node) {
    let depth = 0;
    while (node) {
        node = node.parent;
        depth++;
    }
    return depth;
}

// Function to check if the tree is balanced
function isTreeBalanced(node) {
    if (!node) {
        return true;
    }

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        isTreeBalanced(node.left) &&
        isTreeBalanced(node.right)
    );
}

// Create a driver script
function driverScript() {
    const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    const tree = createTree(array);

    console.log("Is the tree balanced?", tree.isBalanced());

    console.log("Level order traversal:");
    tree.levelOrder((node) => console.log(node.data));

    console.log("Pre-order traversal:");
    tree.preOrder((node) => console.log(node.data));

    console.log("Post-order traversal:");
    tree.postOrder((node) => console.log(node.data));

    console.log("In-order traversal:");
    tree.inOrder((node) => console.log(node.data));

    console.log("Inserting values > 100");
    tree.insert(200);
    tree.insert(150);
    tree.insert(180);
}
