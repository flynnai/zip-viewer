import styles from "./Tree.module.scss";

function Tree({ zip }) {
    function Entry({ entry }) {
        return (
            <div>
                {entry.forEach((relativePath, entry) =>
                    console.log(relativePath, entry)
                )}
            </div>
        );
    }
    console.log("ZIP", zip.folder(zip.root));
    return (
        <div>
            <Entry entry={zip} />
        </div>
    );
}

export default Tree;
