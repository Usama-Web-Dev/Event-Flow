import {
  // DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Col, Divider, Row, Tooltip } from "antd";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { deleteApi, getApi } from "../../Services/apiCaller";

import { useEffect } from "react";
import DeleteModel from "../../Components/DeleteModel";

const ViewAdmin = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [adminsData, setAdminsData] = useState([]);
  // const [count, setCount] = useState(1);
  const [counter, setCounter] = useState(0);

  // const [count, setCount] = useState(1);

  // function onDeleteTrigger(param) {
  //   if (param) {
  //     setCount(count + 1);
  //   }
  // }

  function handleDelete(id) {
    const deleteUser = async () => {
      const res = await deleteApi({
        url: `http://localhost:3005/user/${id}`,
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
        url: `http://localhost:3005/user`,
        method: "Get",
      });
      console.log(data.data.items, "123");
      const res = await data.data.items;
      setAdminsData(res);
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
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",

      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("firstname"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",

      sorter: (a, b) => a.lastName.length - b.lastName.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("lasttname"),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",

      ...getColumnSearchProps("email"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      ...getColumnSearchProps("gender"),
      sorter: (a, b) => a.gender.length - b.gender.length,
      sortDirections: ["descend", "ascend"],
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
                <Link to={`/edit-admin/${record.id}`}>
                  <button className="editModel">{<EditOutlined />} </button>
                </Link>
              </Tooltip>
              {/* <DeleteModel onDel={onDeleteTrigger} id={record.id} /> */}
              {/* <DeleteModel
                className="e2e_viewUser_delete"
                id={record.id}
                handleDelete={handleDelete}
              /> */}
              {/* <Tooltip title="Delete" color="red"  id={record.id}
                handleDelete={handleDelete}  >

              <button className="editModel"  >{
                <DeleteOutlined
               
                />
               
                
                } </button>
                 
              </Tooltip> */}

              {/* <DeleteModel onDel={onDeleteTrigger} id={record.id} /> */}
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
                <Title level={2}>View Admin</Title>
              </Divider>
            </Col>
          </Row>

          <Row>
            <Col span={24} className="mt-2">
              <Table columns={columns} dataSource={adminsData} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
  //return;
};

export default ViewAdmin;
