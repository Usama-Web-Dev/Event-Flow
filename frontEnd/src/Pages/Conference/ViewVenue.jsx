import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Col, Divider, Row, Tooltip } from "antd";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { deleteApi, getApi } from "../../Services/apiCaller";
import DeleteModel from "../../Components/DeleteModel";

const View = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [venueData, setVenuesData] = useState([]);
    const [counter, setCounter] = useState(0);
    function handleDelete(id) {
        const deleteUser = async () => {
            const res = await deleteApi({
                url: `http://localhost:3005/venue/${id}`,
            });
            if (res) {
                setCounter(counter + 1);
            }
        };
        deleteUser();
    }

    useEffect(() => {
        const View = async () => {
            const { data } = await getApi({
                url: `http://localhost:3005/venue`,
                method: "Get",
            });
            console.log(data.data.items, "123");
            const res = await data.data.items;
            setVenuesData(res);
        };
        View();
    }, [counter]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />

                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: "Type",
            dataIndex: "type",
            key: "type",

            sorter: (a, b) => a.type.length - b.type.length,
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps("type"),
        },
        {
            title: "Platform",
            dataIndex: "platform",
            key: "platform",

            sorter: (a, b) => a.platform.length - b.platform.length,
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps("platform"),
        },
        {
            title: "Meeting Link",
            dataIndex: "meetingLink",
            key: "meetingLink",

            sorter: (a, b) => a.meetingLink.length - b.meetingLink.length,
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps("meetingLink"),
        },
        {
            title: "Facilities",
            dataIndex: "facilities",
            key: "facilities",

            sorter: (a, b) => a.facilities.length - b.facilities.length,
            sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps("facilities"),
        },

        {
            title: "Floor",
            dataIndex: "floor",
            key: "floor",
            // sorter: (a, b) => a.floor.length - b.floor.length,
            // sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps("floor"),
        },
        {
            title: "Capacities",
            dataIndex: "roomCapacity",
            key: "roomCapacity",
            ...getColumnSearchProps("roomCapacity"),
            sorter: (a, b) => a.roomCapacity.length - b.roomCapacity.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Map",
            dataIndex: "mapLink",
            key: "mapLink",
            ...getColumnSearchProps("mapLink"),
            // sorter: (a, b) => a.mapLink.length - b.mapLink.length,
            // sortDirections: ["descend", "ascend"],
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            width: "15%",
            render: (record) => {
                return (
                    <>
                        <Space>
                            <Tooltip title="Edit" color="blue">
                                <Link to={`/edit-venue/${record.id}`}>
                                    <button className="editModel">{<EditOutlined />} </button>
                                </Link>
                            </Tooltip>
                            <DeleteModel id={record.id} handleDelete={handleDelete} />
                        </Space>
                    </>
                );
            },
        },
    ];
    return (
        <>
            <div style={{ backgroundColor: 'white' }}>
                <div className="shadow p-5">
                    <Row>
                        <Col span={24}>
                            <Divider>
                                <Title level={2}> View Venue Information</Title>
                            </Divider>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="mt-2">
                            <Table columns={columns} dataSource={venueData} />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default View;
