import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { deleteApi } from "../Services/apiCaller";

import { Notifications } from "./Notifications";

function DeleteModel({ id, handleDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleDelete(id);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip title="Delete" color="red" onClick={showModal}>
        <button className="editModel">
          <DeleteOutlined />
        </button>
      </Tooltip>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Huziafa is delted the row</p>
      </Modal>
    </>
  );
}
// handleDelete(id);handleClose();
export default DeleteModel;

// function DeleteModel(props) {

//     const id= props.id
// const [modal2Open, setModal2Open] = useState(false);
//     const onDelete = async () =>{
//       try{
//         const responce = await deleteApi({ url: `http://localhost:3005/user/${id}`})
//         props.onDel(true)
//         Notifications("Deleted Successfully", "success", "top-right");
//         setModal2Open(false)
//       }catch (err){
//         if(!err?.responce){
//           Notifications("No Server Responce", "error", "top-right");
//           setModal2Open(false)
//         } else if(err.responce?.status === 409){
//           Notifications("Name Already Exist", "error", "top-right");
//         }else{
//           Notifications("Failed", "error", "top-right");
//         }
//       }
//     }
//     return (
//       <div>
//         <Tooltip title="Delete" color="red">
//         <button className="danger deleteModel" onClick={() => setModal2Open(true)}>
//         <DeleteOutlined />
//         </button>
//         </Tooltip>
//         <Modal
//           title="Are You Sure? You want to delete this survey."
//           centered
//           open={modal2Open}
//           onOk={ onDelete }
//           onCancel={() => setModal2Open(false)}
//         >
//           <p>Survey Will Be Deleted.</p>
//           <p>This survey will no longer be available</p>
//         </Modal>
//       </div>
//     )
// }

// export default DeleteModel
