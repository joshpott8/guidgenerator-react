import { useState } from "react";

function SaveForm(props) {
    let onSaveGuid = props.onSaveGuid;
    let currentGuid = props.currentGuid;
    let localStorageDataKey = props.localStorageDataKey;
    let localStorageData = props.localStorageData;
    let [errorText, setErrorText] = useState(null);

    function saveGuid(event) {
        event.preventDefault();
        console.log(event.target.guidName.value);
        var name = event.target.guidName.value;
        if(name != null && name.trim().length > 0) {
            if(localStorageData.guids[name] == null) {
                localStorageData.guids[name] = currentGuid;
                localStorage.setItem(localStorageDataKey, JSON.stringify(localStorageData));
                setErrorText(null);
            }
            else {
                setErrorText('Name already exists');
            }
        }
        else {
            setErrorText('Not enough characters');
        }

        if(!!onSaveGuid && typeof onSaveGuid === "function") {
            onSaveGuid(localStorageData);
        }
    }
    
    return (
        <div className="modal">
            <div className="modal-container">
                <div className="modal-title">Save GUID</div>
                <div className="guid">Enter a name for the GUID.</div>
                <form className="save-form" onSubmit={saveGuid}>
                    <input className="guid-name-input" name="guidName" placeholder="GUID Name" type="text" />

                    {
                        !!errorText &&
                        <div className="error-txt">{errorText}</div>
                    }

                    <input className="guid-btn-submit btn" type="submit" value="Save" />
                </form>
            </div>
        </div>
    )
}

export default SaveForm;