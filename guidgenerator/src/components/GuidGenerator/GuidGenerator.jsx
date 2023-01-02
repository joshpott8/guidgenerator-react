import { useEffect, useState, useRef } from "react";
import SaveForm from "../SaveForm/SaveForm";
import StoredGuids from "../StoredGuids/StoredGuids";

function GuidGenerator() {
    let [currentGuid, setCurrentGuid] = useState(null);
    const localStorageDataKey = "guidGeneratorData";
    let [localStorageData, setLocalStorageData] = useState({ guids: {} });
    let [showSaveModal, setShowSaveModal] = useState(false);



    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(localStorageDataKey));

        if(data)
        setLocalStorageData(data);
    }, [])

    function createNewGuid(event) {
        // Stop page reloading
        event.preventDefault();
        setCurrentGuid(returnRandomGuid());
    }

    function returnRandomGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function copyToClipboard() {
        let div = document.getElementById("generated-guid-div");
        var tempTextArea = document.createElement("textarea");
        tempTextArea.value = div.innerHTML;
        tempTextArea.setAttribute('readonly', '');
        tempTextArea.style.position = 'absolute';
        tempTextArea.style.left = '-9999px';
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        //delete tempTextArea;
        //showToast("GUID Copied!");
    }

    function showSaveGuidForm() {
        setShowSaveModal(true);
    }

    function onSaveGuid(data) {
        setLocalStorageData(data);
        setShowSaveModal(false);
    }

    function onDelete(key) {
        if(localStorageData.guids[key]) {
            let newObj = Object.assign(localStorageData, {});
            delete newObj.guids[key];
            debugger;
            localStorage.setItem(localStorageDataKey, JSON.stringify(newObj));
            setLocalStorageData(newObj);
        }
    }

    return (
        <div className="guid-box">
            <form onSubmit={createNewGuid}>
                <input className="guid-btn-submit btn" type="submit" value="Show me a GUID!" />
                <input disabled={ currentGuid == null}  type="button" value="Save GUID" onClick={showSaveGuidForm} />
            </form>

            {
                currentGuid != null &&
                <div id="generated-guid-div" className="generated-guid copy" onClick={copyToClipboard}>{currentGuid}</div>
                    
            }


            {
                localStorageData.guids &&
                <StoredGuids guids={localStorageData} onDelete={onDelete}></StoredGuids>
            }

            {
                showSaveModal &&
                <SaveForm localStorageDataKey={localStorageDataKey} localStorageData={localStorageData} currentGuid={currentGuid} onSaveGuid={onSaveGuid}></SaveForm>
            }
        </div>
    )
}

export default GuidGenerator;