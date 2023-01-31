import { useEffect, useState } from "react";
import styles from "./FileViewer.module.scss";

function FileViewer({ zip, selectedPath }) {
    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        if (selectedPath !== null) {
            setFileData(null);
            const loadData = async () => {
                setFileData(await zip.file(selectedPath).async("string"));
            };
            loadData();
        }
    }, [selectedPath]);

    if (fileData === null) {
        return (
            <div className={styles.loading}>
                <em>Loading....</em>
            </div>
        );
    }
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <strong>
                    <code>{selectedPath}</code>
                </strong>
            </div>
            <pre>{fileData}</pre>
        </div>
    );
}

export default FileViewer;
