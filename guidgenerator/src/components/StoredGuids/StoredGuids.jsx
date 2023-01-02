function StoredGuids(props) {
    let guids = props.guids;
    let onDelete = props.onDelete;

    let guidsArray = Object.keys(guids.guids);

    function deleteGuid(key) {
        if(!!onDelete && typeof onDelete === "function")
        onDelete(key);
    }

    return (
        <div className="generated-guid-box">
            <div className="stored-guid-box">
                {
                    guidsArray.map((key) => 
                    {
                        let guid = guids.guids[key];
                        return <div key={guid + "_" + key} className={"guid-wrapper stored-guid-item row-" + key}>
                            <div className='stored-guid-name cell'>{key}</div>
                            <div className='stored-guid-val cell copy'>{guid}</div>
                            <div className='del-stored-guid-btn cell' onClick={() => { deleteGuid(key) }}>Delete</div>
                        </div>
                    })
                }
            </div>
        </div> 
    )
}

export default StoredGuids;