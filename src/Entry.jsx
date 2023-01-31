import styles from "./Entry.module.scss";
import { DirNode } from "./Tree";
import { joinClasses } from "./utils";
import { ReactComponent as ChevronIcon } from "./chevron-right-icon.svg";
import { useState } from "react";

function Entry({ node, handleFileClick }) {
    const [isExpanded, setIsExpanded] = useState(false);
    if (node instanceof DirNode) {
        return (
            <div
                className={joinClasses(
                    styles.entryWrapper,
                    styles.folder,
                    !isExpanded && styles.hidden
                )}
            >
                <div
                    onClick={() => setIsExpanded((e) => !e)}
                    className={styles.label}
                >
                    <ChevronIcon className={joinClasses(styles.chevron)} />{" "}
                    {node.name}
                </div>
                <div className={styles.contents}>
                    {node.getChildren().map((child) => (
                        <Entry
                            node={child}
                            handleFileClick={handleFileClick}
                            key={child.name}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        let subDirs = node.name.split("/");
        let filename = subDirs[subDirs.length - 1];
        return (
            <div
                className={joinClasses(styles.entryWrapper, styles.file)}
                onClick={() => handleFileClick(node.name)}
            >
                {filename}
            </div>
        );
    }
}

export default Entry;
