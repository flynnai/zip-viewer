import { useRef, useState } from "react";
import styles from "./App.module.scss";
import JSZip from "jszip";
import Tree from "./Tree";
import FileViewer from "./FileViewer";

function App() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const zipRef = useRef(null);
    const [selectedFilePath, setSelectedFilePath] = useState(null);

    const handleFileUpload = async (e) => {
        if (!e.target.files.length) {
            // TODO cleanup other files
            setUploadedFile(null);
            return;
        }
        const file = e.target.files[0];
        zipRef.current = await JSZip.loadAsync(file);

        setUploadedFile(file);
    };

    // if (selectedFile) {
    //     console.log(
    //         "You uploaded",
    //         selectedFile.name,
    //         " last modified at ",
    //         selectedFile.lastModifiedDate.toISOString(),
    //         " which is ",
    //         selectedFile.size,
    //         " bytes and is of type ",
    //         selectedFile.type
    //     );
    // }

    console.log(zipRef.current);
    console.log("Selected file", selectedFilePath);

    return (
        <div className={styles.main}>
            <input type="file" onChange={handleFileUpload} />
            {zipRef.current && (
                <div className={styles.explorerWrapper}>
                    <Tree
                        zip={zipRef.current}
                        setSelectedFilePath={setSelectedFilePath}
                    />
                    <FileViewer
                        zip={zipRef.current}
                        selectedPath={selectedFilePath}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
