import { useState } from "react";
import { ReactComponent as Plus } from "../icons/plus.svg";
import { ReactComponent as Download } from "../icons/download.svg";
import { ReactComponent as Cross } from "../icons/cross.svg";
import { ReactComponent as Upload } from "../icons/upload.svg";
import { ReactComponent as Delete } from "../icons/delete.svg";

const EnvVariableBody = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [uploadMode, setUploadMode] = useState(false);
    const [rows, setRows] = useState([]);
    const [addedRows, setAddedRows] = useState([]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
        setUploadMode(false); // Close upload mode when drawer opens
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setUploadMode(false);
    };

    const openUploadMode = () => {
        setUploadMode(true);
    };

    const addRow = () => {
        const newRow = { id: Date.now(), Name: "", Value: "" }; // Generate unique identifier for new row
        setRows([...rows, newRow]);
    };

    const deleteRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleAdd = () => {
        setAddedRows([...addedRows, ...rows]);
        setRows([]); // Clear rows
        closeDrawer(); // Close drawer
    };

    const deleteAddedRow = (id) => {
        setAddedRows(addedRows.filter(row => row.id !== id));
    };

    return (
        <div className="border shadow-md my-4 p-4 rounded-md h-screen bg-white">
            <div className="flex items-center mb-4">
                <h1 className="text-[#595959] text-base font-bold">Environment Variables</h1>
                <div className="ml-auto flex gap-4">
                    <Plus className="cursor-pointer" onClick={toggleDrawer} />
                    <Download />
                </div>
            </div>
            {addedRows.length > 0 ? (
                <div className="mb-4">
                    <h2 className="text-sm text-[#595959] mb-2">Added Environment Variables:</h2>
                    {addedRows.map((row, index) => (
                        <div key={index} className="flex gap-4 mb-2 border border-[#EBEBEB] p-2 rounded-md justify-between w-1/2">
                            <h3 className="text-[#595959]">{row.Name}</h3>
                            <p className="text-[#595959]">{row.Value}</p>
                            <Delete class="cursor-pointer" onClick={() => deleteAddedRow(row.id)} />
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="text-sm text-[#595959]">No environment variable created.</h2>
            )}
            {drawerOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end shadow-lg">
                    <div className="bg-white w-1/2 h-full p-4">
                        <Cross className="ml-auto cursor-pointer mb-4" onClick={closeDrawer} />
                        {uploadMode ? (
                            <div className="border border-[#EBEBEB] p-4 rounded-md">
                                {rows.map((newRow, index) => (
                                    <div key={index} className="flex gap-4 mb-4 items-center">
                                        <h1 className="text-[#595959]">Name</h1>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="border border-gray-300 p-2 rounded-md"
                                            onChange={(e) => {
                                                const newName = e.target.value;
                                                setRows(prevRows =>
                                                    prevRows.map(row => {
                                                        if (row.id === newRow.id) {
                                                            return { ...row, Name: newName };
                                                        }
                                                        return row;
                                                    })
                                                );
                                            }}
                                        />
                                        <h1 className="text-[#595959]">Value</h1>
                                        <input
                                            type="text"
                                            placeholder="Value"
                                            className="border border-gray-300 p-2 rounded-md"
                                            onChange={(e) => {
                                                const newValue = e.target.value;
                                                setRows(prevRows =>
                                                    prevRows.map(row => {
                                                        if (row.id === newRow.id) {
                                                            return { ...row, Value: newValue };
                                                        }
                                                        return row;
                                                    })
                                                );
                                            }}
                                        />
                                        <Delete className="cursor-pointer" onClick={() => deleteRow(newRow.id)} />
                                    </div>
                                ))}
                                <button className="bg-[#6E27D5] text-white text-sm font-bold px-6 py-2 rounded-md" onClick={addRow}>
                                    Add Row
                                </button>
                                <div className="flex justify-end">
                                    <button className="border-2 border-[#333333] text-sm font-bold px-6 py-2 rounded-md mr-2" onClick={closeDrawer}>
                                        Cancel
                                    </button>
                                    <button className="bg-[#6E27D5] text-white text-sm font-bold px-6 py-2 rounded-md" onClick={handleAdd}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="border border-[#EBEBEB] p-4 rounded-md">
                                <div className="border border-dashed border-[#BDBDBD] p-4 rounded-md mb-4 bg-[#F8F8F8] flex justify-center cursor-pointer" onClick={openUploadMode}>
                                    <Upload />
                                    <h1 className="text-[#333333] font-bold text-sm">Click or drag file(s) here to upload</h1>
                                </div>
                                <h1 className="text-[#595959] text-xs mb-4">Upload a .env file. It should not be greater than 5KB.</h1>
                                <div className="flex justify-end">
                                    <button className="border-2 border-[#333333] text-sm font-bold px-6 py-2 rounded-md mr-2" onClick={closeDrawer}>
                                        Cancel
                                    </button>
                                    <button className="bg-[#6E27D5] text-white text-sm font-bold px-6 py-2 rounded-md" onClick={handleAdd}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnvVariableBody;
