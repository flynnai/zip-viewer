import Entry from "./Entry";
import styles from "./Tree.module.scss";

class DirNode {
    constructor(name) {
        this.name = name;
        this.children = {};
    }

    exists(name) {
        return name in this.children;
    }

    addNode(name, entry) {
        this.children[name] = entry;
    }

    getNode(name) {
        return this.children[name];
    }

    getChildren() {
        return Object.values(this.children);
    }
}

function Tree({ zip }) {
    console.log("ZIP", zip.folder(zip.root));
    const tree = new DirNode("root");

    // create a hierarchical, traversable structure from path list
    zip.forEach((relativePath, entry) => {
        if (entry.dir) {
            relativePath = relativePath.slice(0, -1);
        }
        const splitPath = relativePath.split("/");
        let level = tree;
        splitPath.forEach((subdir, i) => {
            let isLast = i === splitPath.length - 1;
            if (isLast && !entry.dir) {
                level.addNode(subdir, entry);
            } else {
                if (!level.exists(subdir)) {
                    level.addNode(subdir, new DirNode(subdir));
                }
            }
            level = level.getNode(subdir);
        });
    });

    console.log("Tree", tree);

    return (
        <div className={styles.main}>
            {tree.getChildren().map((child) => (
                <Entry node={child} />
            ))}
        </div>
    );
}

export { DirNode };
export default Tree;
