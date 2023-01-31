import { useRef, useState } from "react";
import styles from "./App.module.scss";
import JSZip from "jszip";
import Tree from "./Tree";

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const zipRef = useRef(null);

    const handleFileUpload = async (e) => {
        if (!e.target.files.length) {
            // TODO cleanup other files
            setSelectedFile(null);
            return;
        }
        const file = e.target.files[0];
        zipRef.current = await JSZip.loadAsync(file);

        setSelectedFile(file);
    };

    if (selectedFile) {
        console.log(
            "You uploaded",
            selectedFile.name,
            " last modified at ",
            selectedFile.lastModifiedDate.toISOString(),
            " which is ",
            selectedFile.size,
            " bytes and is of type ",
            selectedFile.type
        );
    }

    console.log(zipRef.current);

    return (
        <div className={styles.main}>
            <input type="file" onChange={handleFileUpload} />
            {zipRef.current && <Tree zip={zipRef.current} />}
        </div>
    );
}

export default App;
