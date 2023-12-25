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
  const [conferencesData, setConferencesData] = useState([]);
  const [counter, setCounter] = useState(0);
  function handleDelete(id) {
    const deleteUser = async () => {
      const res = await deleteApi({
        url: `http://localhost:3005/conference/${id}`,
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
        url: `http://localhost:3005/conference`,
        method: "Get",
      });
      console.log(data.data.items, "123");
      const res = await data.data.items;
      setConferencesData(res);
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
      </div >
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
      title: "Conference Type",
      dataIndex: "type",
      key: "type",

      ...getColumnSearchProps("type"),
      sorter: (a, b) => a.type.length - b.type.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Conference Title",
      dataIndex: "title",
      key: "title",

      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",

      ...getColumnSearchProps("description"),
      // sorter: (a, b) => a.description.length - b.description.length,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
      // sorter: (a, b) => a.date.length - b.date.length,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      ...getColumnSearchProps("startTime"),
      // sorter: (a, b) => a.startTime.length - b.startTime.length,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "End time",
      dataIndex: "endTime",
      key: "endTime",
      ...getColumnSearchProps("endTime"),
      // sorter: (a, b) => a.endTime.length - b.endTime.length,
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
                <Link to={`/edit/${record.id}`}>
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
                <Title level={2}> View Conference Information</Title>
              </Divider>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="mt-2">
              <Table columns={columns} dataSource={conferencesData} />
            </Col>
          </Row>

        </div>
      </div>
    </>
  );
};
export default View;